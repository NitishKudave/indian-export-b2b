from django.db import models
from django.utils.text import slugify

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='categories/', blank=True, null=True)
    image_url = models.URLField(blank=True, null=True, help_text="Fallback external image URL")

    class Meta:
        verbose_name_plural = "Categories"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Product(models.Model):
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    slug = models.SlugField(max_length=180, unique=True, blank=True)
    description = models.TextField()
    origin = models.CharField(max_length=100, default="India")
    quality_grade = models.CharField(max_length=50, default="A Grade (Premium Export Quality)")
    moq = models.CharField(max_length=100, help_text="Minimum Order Quantity, e.g. 10 Metric Tons")
    packaging_type = models.CharField(max_length=150, help_text="e.g. Corrugated Boxes, Mesh Bags, Vacuum Sealed")
    shelf_life = models.CharField(max_length=100, help_text="e.g. 3 Months at 5°C")
    export_availability = models.BooleanField(default=True)
    
    # Pricing info
    base_price_inr = models.DecimalField(max_length=15, max_digits=12, decimal_places=2, help_text="Base price in INR per unit")
    price_unit = models.CharField(max_length=30, default="Metric Ton", help_text="e.g. kg, Metric Ton, Box")
    
    # Images
    primary_image = models.ImageField(upload_to='products/', blank=True, null=True)
    primary_image_url = models.URLField(blank=True, null=True, help_text="Fallback external primary image URL")
    
    # SEO
    meta_title = models.CharField(max_length=150, blank=True, null=True)
    meta_description = models.TextField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        if not self.meta_title:
            self.meta_title = f"{self.name} Exporter India - Orbinexglobal"
        if not self.meta_description:
            self.meta_description = self.description[:155] if len(self.description) > 155 else self.description
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='additional_images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='products/additional/', blank=True, null=True)
    image_url = models.URLField(blank=True, null=True, help_text="Fallback external URL")

    def __str__(self):
        return f"Image for {self.product.name}"

class Inquiry(models.Model):
    STATUS_CHOICES = [
        ('new', 'New/Unread'),
        ('contacted', 'Contacted/In Progress'),
        ('completed', 'Completed/Closed'),
        ('spam', 'Spam/Junk'),
    ]
    
    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=30)
    company = models.CharField(max_length=150, blank=True, null=True)
    message = models.TextField()
    
    # Inquiry specifications
    target_product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)
    quantity = models.CharField(max_length=100, blank=True, null=True, help_text="e.g. 20 Metric Tons")
    shipping_terms = models.CharField(max_length=50, blank=True, null=True, help_text="e.g. FOB, CIF, CNF")
    destination_port = models.CharField(max_length=100, blank=True, null=True)
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    created_at = models.DateTimeField(auto_now_add=True)
    ip_address = models.GenericIPAddressField(blank=True, null=True)

    class Meta:
        verbose_name_plural = "Inquiries"
        ordering = ['-created_at']

    def __str__(self):
        product_name = self.target_product.name if self.target_product else "General Inquiry"
        return f"Inquiry from {self.full_name} ({product_name}) - {self.created_at.strftime('%Y-%m-%d')}"

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=250, unique=True, blank=True)
    content = models.TextField()
    author = models.CharField(max_length=100, default="Orbinexglobal Team")
    banner_image = models.ImageField(upload_to='blogs/', blank=True, null=True)
    banner_image_url = models.URLField(blank=True, null=True, help_text="Fallback external URL")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # SEO
    seo_title = models.CharField(max_length=150, blank=True, null=True)
    seo_description = models.TextField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        if not self.seo_title:
            self.seo_title = self.title[:150]
        if not self.seo_description:
            self.seo_description = self.content[:155]
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class ExportCountry(models.Model):
    name = models.CharField(max_length=100)
    country_code = models.CharField(max_length=5, help_text="e.g. US, AE, GB")
    flag_emoji = models.CharField(max_length=10, help_text="e.g. 🇺🇸")
    description = models.TextField(blank=True, null=True)
    active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)

    class Meta:
        verbose_name_plural = "Export Countries"
        ordering = ['order', 'name']

    def __str__(self):
        return self.name

class Certification(models.Model):
    name = models.CharField(max_length=150)
    logo = models.ImageField(upload_to='certifications/', blank=True, null=True)
    logo_url = models.URLField(blank=True, null=True, help_text="Fallback external URL")
    description = models.TextField(blank=True, null=True)
    certificate_authority = models.CharField(max_length=150, blank=True, null=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order', 'name']

    def __str__(self):
        return self.name

class Testimonial(models.Model):
    author_name = models.CharField(max_length=100)
    company = models.CharField(max_length=150)
    role = models.CharField(max_length=100, default="Importer")
    review = models.TextField()
    rating = models.IntegerField(default=5, help_text="Rating between 1 and 5")
    profile_image = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    profile_image_url = models.URLField(blank=True, null=True, help_text="Fallback external URL")
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return f"{self.author_name} ({self.company})"

class HomepageBanner(models.Model):
    title = models.CharField(max_length=150)
    subtitle = models.CharField(max_length=250, blank=True, null=True)
    image = models.ImageField(upload_to='banners/', blank=True, null=True)
    image_url = models.URLField(blank=True, null=True, help_text="Fallback external URL")
    link = models.CharField(max_length=100, default="/products")
    active = models.BooleanField(default=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return self.title
