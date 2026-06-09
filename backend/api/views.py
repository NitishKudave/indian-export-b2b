import json
import time
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.conf import settings
from django.contrib.auth.models import User
from django.core.cache import cache
from django.db.models import Count
from django.utils import timezone
from datetime import timedelta

from .models import (
    Category, Product, ProductImage, Inquiry, 
    BlogPost, ExportCountry, Certification, Testimonial, HomepageBanner, GalleryImage
)
from .serializers import (
    serialize_category, serialize_product, serialize_inquiry, 
    serialize_blog, serialize_country, serialize_certification, 
    serialize_testimonial, serialize_banner, serialize_gallery
)
from .utils import generate_jwt, verify_jwt

# Helper decorator for Admin Authentication using Custom JWT
def admin_required(view_func):
    def _wrapped_view(request, *args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return JsonResponse({'detail': 'Authentication credentials were not provided.'}, status=401)
            
        token = auth_header.split(' ')[1]
        payload = verify_jwt(token, settings.SECRET_KEY)
        if not payload:
            return JsonResponse({'detail': 'Given token is invalid or expired.'}, status=401)
            
        user_id = payload.get('user_id')
        try:
            user = User.objects.get(id=user_id, is_staff=True)
            request.user = user
        except User.DoesNotExist:
            return JsonResponse({'detail': 'User is not an administrator.'}, status=403)
            
        return view_func(request, *args, **kwargs)
    return _wrapped_view

# Custom IP-based rate limiting helper
def is_rate_limited(ip_address, limit=5, period=60):
    cache_key = f"throttle_inquiry_{ip_address}"
    requests = cache.get(cache_key, [])
    now = time.time()
    
    # Filter requests in the current window
    requests = [r for r in requests if now - r < period]
    
    if len(requests) >= limit:
        return True
        
    requests.append(now)
    cache.set(cache_key, requests, period)
    return False

# API ROOT - lists available endpoints
def api_root(request):
    return JsonResponse({
        'message': 'Orbinexglobal API',
        'version': '1.0',
        'endpoints': {
            'auth': {
                'login': '/api/token/',
                'verify': '/api/admin/verify/',
            },
            'catalog': {
                'categories': '/api/categories/',
                'products': '/api/products/',
            },
            'content': {
                'blogs': '/api/blogs/',
                'banners': '/api/banners/',
                'testimonials': '/api/testimonials/',
                'certifications': '/api/certifications/',
                'countries': '/api/countries/',
                'gallery': '/api/gallery/',
            },
            'inquiries': '/api/inquiries/',
            'admin_stats': '/api/admin/stats/',
        }
    })

# AUTHENTICATION ENDPOINT
@csrf_exempt
def login_view(request):
    if request.method != 'POST':
        return JsonResponse({'detail': 'Method not allowed'}, status=405)
        
    # Get client IP for security lockout
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
        
    cache_key = f"login_failures_{ip}"
    failures = cache.get(cache_key, [])
    now = time.time()
    
    # Filter failures in the last 5 minutes (300 seconds)
    failures = [f for f in failures if now - f < 300]
    
    if len(failures) >= 5:
        # Lockout triggered!
        return JsonResponse({'detail': 'Security Lockout: Too many failed login attempts. Please wait 5 minutes.'}, status=429)

    try:
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
    except Exception:
        return JsonResponse({'detail': 'Invalid body'}, status=400)
        
    user = authenticate(username=username, password=password)
    if user is not None and user.is_staff:
        # Successful login: clear failure cache
        cache.delete(cache_key)
        
        # Generate JWT
        payload = {
            'user_id': user.id,
            'username': user.username,
            'is_staff': user.is_staff
        }
        token = generate_jwt(payload, settings.SECRET_KEY, expiry_seconds=86400) # 1 day
        return JsonResponse({
            'access': token,
            'username': user.username,
            'is_staff': user.is_staff
        })
    else:
        # Failed login: record failure
        failures.append(now)
        cache.set(cache_key, failures, 300)
        return JsonResponse({'detail': 'Invalid credentials. Attempt recorded.'}, status=401)

# ADMIN TOKEN VERIFICATION ENDPOINT
@admin_required
def admin_verify(request):
    """Verify admin token validity"""
    if request.method != 'GET':
        return JsonResponse({'detail': 'Method not allowed'}, status=405)
    
    return JsonResponse({
        'valid': True,
        'username': request.user.username,
        'is_staff': request.user.is_staff
    })

# CATEGORY VIEW
@csrf_exempt
def category_list(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        return JsonResponse([serialize_category(c) for c in categories], safe=False)
        
    elif request.method == 'POST':
        # Admin required
        @admin_required
        def handle_post(req):
            try:
                # Support both JSON and multipart/form-data (for image upload)
                if req.content_type and req.content_type.startswith('multipart/form-data'):
                    data = req.POST
                    image_file = req.FILES.get('image')
                else:
                    data = json.loads(req.body)
                    image_file = None

                c = Category.objects.create(
                    name=data['name'],
                    description=data.get('description', ''),
                    image_url=data.get('image_url', '')
                )
                if image_file:
                    c.image = image_file
                    c.image_url = ''  # Clear URL when a file is uploaded
                    c.save()
                return JsonResponse(serialize_category(c), status=201)
            except Exception as e:
                return JsonResponse({'detail': str(e)}, status=400)
        return handle_post(request)

@csrf_exempt
def category_detail(request, slug):
    try:
        category = Category.objects.get(slug=slug)
    except Category.DoesNotExist:
        return JsonResponse({'detail': 'Not found'}, status=404)
        
    if request.method == 'GET':
        return JsonResponse(serialize_category(category))
        
    elif request.method == 'POST' or request.method in ['PUT', 'PATCH']:
        @admin_required
        def handle_put(req):
            try:
                # Support both JSON and multipart/form-data (for image upload)
                if req.content_type and (req.content_type.startswith('multipart/form-data') or req.method == 'POST'):
                    data = req.POST
                    image_file = req.FILES.get('image')
                else:
                    data = json.loads(req.body)
                    image_file = None

                category.name = data.get('name', category.name)
                category.description = data.get('description', category.description)

                # Only update image_url from form if no file is uploaded
                if image_file:
                    category.image = image_file
                    category.image_url = ''  # Clear URL fallback
                elif 'image_url' in data:
                    category.image_url = data.get('image_url')

                category.save()
                return JsonResponse(serialize_category(category))
            except Exception as e:
                return JsonResponse({'detail': str(e)}, status=400)
        return handle_put(request)
        
    elif request.method == 'DELETE':
        @admin_required
        def handle_delete(req):
            category.delete()
            return JsonResponse({}, status=204)
        return handle_delete(request)

# PRODUCT VIEW
@csrf_exempt
def product_list(request):
    if request.method == 'GET':
        products = Product.objects.all().select_related('category').prefetch_related('additional_images')
        
        # Filtering
        category_slug = request.GET.get('category')
        search_query = request.GET.get('search')
        
        if category_slug:
            products = products.filter(category__slug=category_slug)
        if search_query:
            products = products.filter(name__icontains=search_query) | products.filter(description__icontains=search_query)
            
        return JsonResponse([serialize_product(p) for p in products], safe=False)
        
    elif request.method == 'POST':
        @admin_required
        def handle_post(req):
            try:
                # Support both application/json and multipart/form-data
                if req.content_type.startswith('multipart/form-data'):
                    data = req.POST
                    primary_image = req.FILES.get('primary_image')
                else:
                    data = json.loads(req.body)
                    primary_image = None

                category_id = data.get('category')
                if not category_id:
                    return JsonResponse({'detail': 'Category is required'}, status=400)
                category = Category.objects.get(id=category_id)
                
                base_price = data.get('base_price_inr')
                if base_price is None or base_price == '':
                    return JsonResponse({'detail': 'base_price_inr is required'}, status=400)

                p = Product.objects.create(
                    category=category,
                    name=data.get('name', ''),
                    description=data.get('description', ''),
                    origin=data.get('origin', 'India'),
                    quality_grade=data.get('quality_grade', 'A Grade'),
                    moq=data.get('moq', ''),
                    packaging_type=data.get('packaging_type', ''),
                    shelf_life=data.get('shelf_life', ''),
                    export_availability=str(data.get('export_availability', 'True')).lower() in ['true', '1'],
                    base_price_inr=base_price,
                    price_unit=data.get('price_unit', 'Metric Ton'),
                    primary_image_url=data.get('primary_image_url', ''),
                    primary_image=primary_image
                )
                
                # Additional images URLs
                add_images = data.get('additional_images', [])
                if isinstance(add_images, str):
                    try:
                        add_images = json.loads(add_images)
                    except ValueError:
                        add_images = [url.strip() for url in add_images.split(',') if url.strip()]
                        
                for url in add_images:
                    ProductImage.objects.create(product=p, image_url=url)
                    
                return JsonResponse(serialize_product(p), status=201)
            except Exception as e:
                return JsonResponse({'detail': str(e)}, status=400)
        return handle_post(request)

@csrf_exempt
def product_detail(request, slug):
    try:
        product = Product.objects.get(slug=slug)
    except Product.DoesNotExist:
        return JsonResponse({'detail': 'Not found'}, status=404)
        
    if request.method == 'GET':
        return JsonResponse(serialize_product(product))
        
    elif request.method == 'POST' or request.method in ['PUT', 'PATCH']:
        @admin_required
        def handle_put(req):
            try:
                # Support both json and multipart
                if req.content_type.startswith('multipart/form-data') or req.method == 'POST':
                    data = req.POST
                    primary_image = req.FILES.get('primary_image')
                else:
                    data = json.loads(req.body)
                    primary_image = None

                if 'category' in data and data['category']:
                    product.category = Category.objects.get(id=data['category'])
                
                product.name = data.get('name', product.name)
                product.description = data.get('description', product.description)
                product.origin = data.get('origin', product.origin)
                product.quality_grade = data.get('quality_grade', product.quality_grade)
                product.moq = data.get('moq', product.moq)
                product.packaging_type = data.get('packaging_type', product.packaging_type)
                product.shelf_life = data.get('shelf_life', product.shelf_life)
                
                if 'export_availability' in data:
                    product.export_availability = str(data.get('export_availability')).lower() in ['true', '1']
                
                if 'base_price_inr' in data:
                    product.base_price_inr = data.get('base_price_inr')
                if 'price_unit' in data:
                    product.price_unit = data.get('price_unit')
                
                # Image URL
                if 'primary_image_url' in data:
                    product.primary_image_url = data.get('primary_image_url')
                    
                # Uploaded Image
                if primary_image:
                    product.primary_image = primary_image
                    product.primary_image_url = ''  # Clear URL fallback to prioritize file
                    
                product.save()
                
                # Update additional images
                if 'additional_images' in data:
                    add_images = data['additional_images']
                    if isinstance(add_images, str):
                        try:
                            add_images = json.loads(add_images)
                        except ValueError:
                            add_images = [url.strip() for url in add_images.split(',') if url.strip()]
                            
                    product.additional_images.all().delete()
                    for url in add_images:
                        ProductImage.objects.create(product=product, image_url=url)
                        
                return JsonResponse(serialize_product(product))
            except Exception as e:
                return JsonResponse({'detail': str(e)}, status=400)
        return handle_put(request)
        
    elif request.method == 'DELETE':
        @admin_required
        def handle_delete(req):
            product.delete()
            return JsonResponse({}, status=204)
        return handle_delete(request)

# INQUIRY VIEW
@csrf_exempt
def inquiry_list(request):
    if request.method == 'GET':
        @admin_required
        def handle_get(req):
            inquiries = Inquiry.objects.all().select_related('target_product')
            return JsonResponse([serialize_inquiry(i) for i in inquiries], safe=False)
        return handle_get(request)
        
    elif request.method == 'POST':
        # Grab client IP
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        ip = x_forwarded_for.split(',')[0] if x_forwarded_for else request.META.get('REMOTE_ADDR')
        
        # Rate limit to 5 inquiry posts per IP per minute
        if is_rate_limited(ip, limit=5, period=60):
            return JsonResponse({'detail': 'Too many requests. Please try again later.'}, status=429)
            
        try:
            data = json.loads(request.body)
            target_product = None
            if 'target_product' in data and data['target_product']:
                target_product = Product.objects.get(id=data['target_product'])
                
            inquiry = Inquiry.objects.create(
                full_name=data['full_name'],
                email=data['email'],
                phone=data['phone'],
                company=data.get('company', ''),
                message=data['message'],
                target_product=target_product,
                quantity=data.get('quantity', ''),
                shipping_terms=data.get('shipping_terms', ''),
                destination_port=data.get('destination_port', ''),
                ip_address=ip
            )
            
            # Send Email Notification Asynchronously
            if settings.ADMIN_EMAIL:
                subject = f"New B2B Inquiry: {inquiry.company or inquiry.full_name}"
                product_name = target_product.name if target_product else 'General Request'
                body = f"New Inquiry Received from Orbinexglobal Website\n\nName: {inquiry.full_name}\nEmail: {inquiry.email}\nPhone: {inquiry.phone}\nCompany: {inquiry.company}\n\nTarget Product: {product_name}\nQuantity: {inquiry.quantity}\nShipping Terms: {inquiry.shipping_terms}\nDestination Port: {inquiry.destination_port}\n\nMessage:\n{inquiry.message}"
                
                def send_email_async():
                    try:
                        from django.core.mail import send_mail
                        print(f"Async: Attempting to send email to {settings.ADMIN_EMAIL} from {settings.DEFAULT_FROM_EMAIL}")
                        send_mail(
                            subject, 
                            body, 
                            settings.DEFAULT_FROM_EMAIL, 
                            [settings.ADMIN_EMAIL], 
                            fail_silently=False
                        )
                        print("Async: Email sent successfully!")
                    except Exception as e:
                        print(f"CRITICAL ERROR: Async email sending failed: {str(e)}")
                
                import threading
                threading.Thread(target=send_email_async).start()

            return JsonResponse(serialize_inquiry(inquiry), status=201)
        except Exception as e:
            return JsonResponse({'detail': str(e)}, status=400)

@csrf_exempt
@admin_required
def inquiry_detail(request, pk):
    try:
        inquiry = Inquiry.objects.get(pk=pk)
    except Inquiry.DoesNotExist:
        return JsonResponse({'detail': 'Not found'}, status=404)
        
    if request.method == 'GET':
        return JsonResponse(serialize_inquiry(inquiry))
        
    elif request.method in ['PUT', 'PATCH']:
        try:
            data = json.loads(request.body)
            inquiry.status = data.get('status', inquiry.status)
            inquiry.save()
            return JsonResponse(serialize_inquiry(inquiry))
        except Exception as e:
            return JsonResponse({'detail': str(e)}, status=400)
            
    elif request.method == 'DELETE':
        inquiry.delete()
        return JsonResponse({}, status=204)

# BLOG VIEWS
@csrf_exempt
def blog_list(request):
    if request.method == 'GET':
        blogs = BlogPost.objects.all()
        return JsonResponse([serialize_blog(b) for b in blogs], safe=False)
        
    elif request.method == 'POST':
        @admin_required
        def handle_post(req):
            try:
                data = json.loads(req.body)
                blog = BlogPost.objects.create(
                    title=data['title'],
                    content=data['content'],
                    author=data.get('author', 'Orbinexglobal Team'),
                    banner_image_url=data.get('banner_image_url', '')
                )
                return JsonResponse(serialize_blog(blog), status=201)
            except Exception as e:
                return JsonResponse({'detail': str(e)}, status=400)
        return handle_post(request)

@csrf_exempt
def blog_detail(request, slug):
    try:
        blog = BlogPost.objects.get(slug=slug)
    except BlogPost.DoesNotExist:
        return JsonResponse({'detail': 'Not found'}, status=404)
        
    if request.method == 'GET':
        return JsonResponse(serialize_blog(blog))
        
    elif request.method in ['PUT', 'PATCH']:
        @admin_required
        def handle_put(req):
            try:
                data = json.loads(req.body)
                blog.title = data.get('title', blog.title)
                blog.content = data.get('content', blog.content)
                blog.author = data.get('author', blog.author)
                blog.banner_image_url = data.get('banner_image_url', blog.banner_image_url)
                blog.save()
                return JsonResponse(serialize_blog(blog))
            except Exception as e:
                return JsonResponse({'detail': str(e)}, status=400)
        return handle_put(request)
        
    elif request.method == 'DELETE':
        @admin_required
        def handle_delete(req):
            blog.delete()
            return JsonResponse({}, status=204)
        return handle_delete(request)

# COUNTRIES, CERTIFICATIONS, TESTIMONIALS, BANNERS VIEWS
@csrf_exempt
@csrf_exempt
def country_list(request):
    if request.method == 'GET':
        countries = ExportCountry.objects.all()
        return JsonResponse([serialize_country(c) for c in countries], safe=False)
        
    elif request.method == 'POST':
        @admin_required
        def handle_post(req):
            try:
                data = json.loads(req.body)
                c = ExportCountry.objects.create(
                    name=data['name'],
                    country_code=data['country_code'],
                    flag_emoji=data['flag_emoji'],
                    description=data.get('description', ''),
                    active=data.get('active', True),
                    order=data.get('order', 0)
                )
                return JsonResponse(serialize_country(c), status=201)
            except Exception as e:
                return JsonResponse({'detail': str(e)}, status=400)
        return handle_post(request)

@csrf_exempt
def country_detail(request, pk):
    try:
        country = ExportCountry.objects.get(pk=pk)
    except ExportCountry.DoesNotExist:
        return JsonResponse({'detail': 'Not found'}, status=404)
        
    if request.method == 'GET':
        return JsonResponse(serialize_country(country))
        
    elif request.method in ['PUT', 'PATCH']:
        @admin_required
        def handle_put(req):
            try:
                data = json.loads(req.body)
                country.name = data.get('name', country.name)
                country.country_code = data.get('country_code', country.country_code)
                country.flag_emoji = data.get('flag_emoji', country.flag_emoji)
                country.description = data.get('description', country.description)
                country.active = data.get('active', country.active)
                country.order = data.get('order', country.order)
                country.save()
                return JsonResponse(serialize_country(country))
            except Exception as e:
                return JsonResponse({'detail': str(e)}, status=400)
        return handle_put(request)
        
    elif request.method == 'DELETE':
        @admin_required
        def handle_delete(req):
            country.delete()
            return JsonResponse({}, status=204)
        return handle_delete(request)

@csrf_exempt
def certification_list(request):
    if request.method == 'GET':
        certs = Certification.objects.all()
        return JsonResponse([serialize_certification(c) for c in certs], safe=False)
        
    elif request.method == 'POST':
        @admin_required
        def handle_post(req):
            try:
                data = json.loads(req.body)
                c = Certification.objects.create(
                    name=data['name'],
                    logo_url=data.get('logo_url', ''),
                    description=data.get('description', ''),
                    certificate_authority=data.get('certificate_authority', ''),
                    display_order=data.get('display_order', 0)
                )
                return JsonResponse(serialize_certification(c), status=201)
            except Exception as e:
                return JsonResponse({'detail': str(e)}, status=400)
        return handle_post(request)

@csrf_exempt
def certification_detail(request, pk):
    try:
        cert = Certification.objects.get(pk=pk)
    except Certification.DoesNotExist:
        return JsonResponse({'detail': 'Not found'}, status=404)
        
    if request.method == 'GET':
        return JsonResponse(serialize_certification(cert))
        
    elif request.method in ['PUT', 'PATCH']:
        @admin_required
        def handle_put(req):
            try:
                data = json.loads(req.body)
                cert.name = data.get('name', cert.name)
                cert.logo_url = data.get('logo_url', cert.logo_url)
                cert.description = data.get('description', cert.description)
                cert.certificate_authority = data.get('certificate_authority', cert.certificate_authority)
                cert.display_order = data.get('display_order', cert.display_order)
                cert.save()
                return JsonResponse(serialize_certification(cert))
            except Exception as e:
                return JsonResponse({'detail': str(e)}, status=400)
        return handle_put(request)
        
    elif request.method == 'DELETE':
        @admin_required
        def handle_delete(req):
            cert.delete()
            return JsonResponse({}, status=204)
        return handle_delete(request)

@csrf_exempt
def testimonial_list(request):
    if request.method == 'GET':
        tests = Testimonial.objects.all()
        return JsonResponse([serialize_testimonial(t) for t in tests], safe=False)
        
    elif request.method == 'POST':
        @admin_required
        def handle_post(req):
            try:
                data = json.loads(req.body)
                t = Testimonial.objects.create(
                    author_name=data['author_name'],
                    company=data['company'],
                    role=data.get('role', 'Importer'),
                    review=data['review'],
                    rating=data.get('rating', 5),
                    profile_image_url=data.get('profile_image_url', ''),
                    display_order=data.get('display_order', 0)
                )
                return JsonResponse(serialize_testimonial(t), status=201)
            except Exception as e:
                return JsonResponse({'detail': str(e)}, status=400)
        return handle_post(request)

@csrf_exempt
def testimonial_detail(request, pk):
    try:
        test = Testimonial.objects.get(pk=pk)
    except Testimonial.DoesNotExist:
        return JsonResponse({'detail': 'Not found'}, status=404)
        
    if request.method == 'GET':
        return JsonResponse(serialize_testimonial(test))
        
    elif request.method in ['PUT', 'PATCH']:
        @admin_required
        def handle_put(req):
            try:
                data = json.loads(req.body)
                test.author_name = data.get('author_name', test.author_name)
                test.company = data.get('company', test.company)
                test.role = data.get('role', test.role)
                test.review = data.get('review', test.review)
                test.rating = data.get('rating', test.rating)
                test.profile_image_url = data.get('profile_image_url', test.profile_image_url)
                test.display_order = data.get('display_order', test.display_order)
                test.save()
                return JsonResponse(serialize_testimonial(test))
            except Exception as e:
                return JsonResponse({'detail': str(e)}, status=400)
        return handle_put(request)
        
    elif request.method == 'DELETE':
        @admin_required
        def handle_delete(req):
            test.delete()
            return JsonResponse({}, status=204)
        return handle_delete(request)

@csrf_exempt
def banner_list(request):
    if request.method == 'GET':
        banners = HomepageBanner.objects.all()
        return JsonResponse([serialize_banner(b) for b in banners], safe=False)
        
    elif request.method == 'POST':
        @admin_required
        def handle_post(req):
            try:
                # Support both json and multipart
                if req.content_type and req.content_type.startswith('multipart/form-data'):
                    data = req.POST
                    image_file = req.FILES.get('image')
                else:
                    data = json.loads(req.body)
                    image_file = None

                # For FormData, booleans come as strings
                is_active = data.get('active', True)
                if isinstance(is_active, str):
                    is_active = is_active.lower() == 'true'

                b = HomepageBanner.objects.create(
                    title=data['title'],
                    subtitle=data.get('subtitle', ''),
                    image_url=data.get('image_url', ''),
                    link=data.get('link', ''),
                    active=is_active,
                    display_order=data.get('display_order', 0)
                )
                if image_file:
                    b.image = image_file
                    b.image_url = ''
                    b.save()
                return JsonResponse(serialize_banner(b), status=201)
            except Exception as e:
                return JsonResponse({'detail': str(e)}, status=400)
        return handle_post(request)

@csrf_exempt
def banner_detail(request, pk):
    try:
        banner = HomepageBanner.objects.get(pk=pk)
    except HomepageBanner.DoesNotExist:
        return JsonResponse({'detail': 'Not found'}, status=404)
        
    if request.method == 'GET':
        return JsonResponse(serialize_banner(banner))
        
    elif request.method in ['PUT', 'PATCH'] or request.method == 'POST':
        @admin_required
        def handle_put(req):
            try:
                if req.content_type and req.content_type.startswith('multipart/form-data'):
                    data = req.POST
                    image_file = req.FILES.get('image')
                else:
                    data = json.loads(req.body)
                    image_file = None

                banner.title = data.get('title', banner.title)
                banner.subtitle = data.get('subtitle', banner.subtitle)
                banner.link = data.get('link', banner.link)
                banner.display_order = data.get('display_order', banner.display_order)
                
                if 'active' in data:
                    is_active = data.get('active')
                    if isinstance(is_active, str):
                        is_active = is_active.lower() == 'true'
                    banner.active = is_active

                if image_file:
                    banner.image = image_file
                    banner.image_url = ''
                elif 'image_url' in data:
                    banner.image_url = data.get('image_url')

                banner.save()
                return JsonResponse(serialize_banner(banner))
            except Exception as e:
                return JsonResponse({'detail': str(e)}, status=400)
        return handle_put(request)
        
    elif request.method == 'DELETE':
        @admin_required
        def handle_delete(req):
            banner.delete()
            return JsonResponse({}, status=204)
        return handle_delete(request)

@csrf_exempt
def gallery_list(request):
    if request.method == 'GET':
        gallery = GalleryImage.objects.all()
        return JsonResponse([serialize_gallery(g) for g in gallery], safe=False)
        
    elif request.method == 'POST':
        @admin_required
        def handle_post(req):
            try:
                # Support both json and multipart
                if req.content_type and req.content_type.startswith('multipart/form-data'):
                    data = req.POST
                    image_file = req.FILES.get('image')
                else:
                    data = json.loads(req.body)
                    image_file = None

                g = GalleryImage.objects.create(
                    title=data['title'],
                    category=data.get('category', ''),
                    description=data.get('description', ''),
                    image_url=data.get('image_url', ''),
                    display_order=data.get('display_order', 0)
                )
                if image_file:
                    g.image = image_file
                    g.image_url = ''
                    g.save()
                return JsonResponse(serialize_gallery(g), status=201)
            except Exception as e:
                return JsonResponse({'detail': str(e)}, status=400)
        return handle_post(request)

@csrf_exempt
def gallery_detail(request, pk):
    try:
        gallery = GalleryImage.objects.get(pk=pk)
    except GalleryImage.DoesNotExist:
        return JsonResponse({'detail': 'Not found'}, status=404)
        
    if request.method == 'GET':
        return JsonResponse(serialize_gallery(gallery))
        
    elif request.method in ['PUT', 'PATCH'] or (request.method == 'POST'):
        @admin_required
        def handle_put(req):
            try:
                # Support both json and multipart
                if req.content_type and req.content_type.startswith('multipart/form-data'):
                    data = req.POST
                    image_file = req.FILES.get('image')
                else:
                    data = json.loads(req.body)
                    image_file = None

                gallery.title = data.get('title', gallery.title)
                gallery.category = data.get('category', gallery.category)
                gallery.description = data.get('description', gallery.description)
                gallery.display_order = data.get('display_order', gallery.display_order)
                
                if image_file:
                    gallery.image = image_file
                    gallery.image_url = ''
                elif 'image_url' in data:
                    gallery.image_url = data.get('image_url')
                    
                gallery.save()
                return JsonResponse(serialize_gallery(gallery))
            except Exception as e:
                return JsonResponse({'detail': str(e)}, status=400)
        return handle_put(request)
        
    elif request.method == 'DELETE':
        @admin_required
        def handle_delete(req):
            gallery.delete()
            return JsonResponse({}, status=204)
        return handle_delete(request)

# ADMIN STATS ENDPOINT
@csrf_exempt
@admin_required
def admin_stats(request):
    if request.method == 'GET':
        total_inquiries = Inquiry.objects.count()
        new_inquiries = Inquiry.objects.filter(status='new').count()
        total_products = Product.objects.count()
        total_blogs = BlogPost.objects.count()
        
        last_week = timezone.now() - timedelta(days=7)
        inquiries_last_week = Inquiry.objects.filter(created_at__gte=last_week).count()
        
        categories_stats = Category.objects.annotate(product_count=Count('products')).values('name', 'product_count')
        
        inquiries_by_status_query = Inquiry.objects.values('status').annotate(count=Count('id'))
        inquiries_by_status = {item['status']: item['count'] for item in inquiries_by_status_query}
        
        recent_inquiries = Inquiry.objects.all().select_related('target_product')[:5]
        
        return JsonResponse({
            'total_inquiries': total_inquiries,
            'new_inquiries': new_inquiries,
            'total_products': total_products,
            'total_blogs': total_blogs,
            'inquiries_last_week': inquiries_last_week,
            'categories_distribution': list(categories_stats),
            'inquiries_by_status': inquiries_by_status,
            'recent_inquiries': [serialize_inquiry(i) for i in recent_inquiries]
        })

