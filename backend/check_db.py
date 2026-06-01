import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from api.models import Product

products = Product.objects.filter(name__icontains="Test Upload")
print("Found products count:", products.count())
for p in products:
    print(f"Product Name: {p.name}")
    print(f"Slug: {p.slug}")
    print(f"Primary Image: {p.primary_image}")
    print(f"Primary Image URL: {p.primary_image_url}")
