from .models import (
    Category, Product, ProductImage, Inquiry, 
    BlogPost, ExportCountry, Certification, Testimonial, HomepageBanner
)
import os

def get_absolute_media_url(url_or_file):
    if not url_or_file:
        return ""
    url = url_or_file.url if hasattr(url_or_file, 'url') and url_or_file else url_or_file
    if not url:
        return ""
    if url.startswith('/'):
        backend_url = os.environ.get('BACKEND_URL') or os.environ.get('RENDER_EXTERNAL_URL') or 'http://localhost:8000'
        backend_url = backend_url.rstrip('/')
        return backend_url + url
    return url

def serialize_category(category):
    if not category:
        return None
    return {
        'id': category.id,
        'name': category.name,
        'slug': category.slug,
        'description': category.description,
        'image_url': get_absolute_media_url(category.image if category.image else category.image_url)
    }

def serialize_product(product):
    if not product:
        return None
    return {
        'id': product.id,
        'name': product.name,
        'slug': product.slug,
        'description': product.description,
        'category': product.category.id,
        'category_name': product.category.name,
        'origin': product.origin,
        'quality_grade': product.quality_grade,
        'moq': product.moq,
        'packaging_type': product.packaging_type,
        'shelf_life': product.shelf_life,
        'export_availability': product.export_availability,
        'base_price_inr': float(product.base_price_inr),
        'price_unit': product.price_unit,
        'primary_image_url': get_absolute_media_url(product.primary_image if product.primary_image else product.primary_image_url),
        'additional_images': [get_absolute_media_url(img.image if img.image else img.image_url) for img in product.additional_images.all()],
        'meta_title': product.meta_title,
        'meta_description': product.meta_description,
    }

def serialize_inquiry(inquiry):
    if not inquiry:
        return None
    return {
        'id': inquiry.id,
        'full_name': inquiry.full_name,
        'email': inquiry.email,
        'phone': inquiry.phone,
        'company': inquiry.company,
        'message': inquiry.message,
        'target_product': inquiry.target_product.id if inquiry.target_product else None,
        'product_name': inquiry.target_product.name if inquiry.target_product else "General",
        'quantity': inquiry.quantity,
        'shipping_terms': inquiry.shipping_terms,
        'destination_port': inquiry.destination_port,
        'status': inquiry.status,
        'created_at': inquiry.created_at.isoformat()
    }

def serialize_blog(blog):
    if not blog:
        return None
    return {
        'id': blog.id,
        'title': blog.title,
        'slug': blog.slug,
        'content': blog.content,
        'author': blog.author,
        'banner_image_url': get_absolute_media_url(blog.banner_image if blog.banner_image else blog.banner_image_url),
        'created_at': blog.created_at.isoformat(),
        'updated_at': blog.updated_at.isoformat(),
        'seo_title': blog.seo_title,
        'seo_description': blog.seo_description
    }

def serialize_country(country):
    if not country:
        return None
    return {
        'id': country.id,
        'name': country.name,
        'country_code': country.country_code,
        'flag_emoji': country.flag_emoji,
        'description': country.description,
        'active': country.active,
        'order': country.order
    }

def serialize_certification(cert):
    if not cert:
        return None
    return {
        'id': cert.id,
        'name': cert.name,
        'logo_url': get_absolute_media_url(cert.logo if cert.logo else cert.logo_url),
        'description': cert.description,
        'certificate_authority': cert.certificate_authority,
        'display_order': cert.display_order
    }

def serialize_testimonial(test):
    if not test:
        return None
    return {
        'id': test.id,
        'author_name': test.author_name,
        'company': test.company,
        'role': test.role,
        'review': test.review,
        'rating': test.rating,
        'profile_image_url': get_absolute_media_url(test.profile_image if test.profile_image else test.profile_image_url),
        'display_order': test.display_order
    }

def serialize_banner(banner):
    if not banner:
        return None
    return {
        'id': banner.id,
        'title': banner.title,
        'subtitle': banner.subtitle,
        'image_url': get_absolute_media_url(banner.image if banner.image else banner.image_url),
        'link': banner.link,
        'active': banner.active,
        'display_order': banner.display_order
    }
