import os
import django
from decimal import Decimal

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from api.models import Category, Product, ExportCountry

def update_database():
    print("Starting data update...")
    
    # 1. Delete all existing countries
    ExportCountry.objects.all().delete()
    
    # 2. Create only the specified export countries
    countries = [
        ("United Arab Emirates (UAE)", "AE", "🇦🇪", "Primary Arab hub for GCC distribution. Shipping point from Nashik Hub.", 1),
        ("Saudi Arabia", "SA", "🇸🇦", "Major Arab market. Direct sea route supply from Nashik Hub, India.", 2),
        ("United Kingdom (UK)", "GB", "🇬🇧", "European hub for distribution to UK and surrounding nations.", 3),
        ("Germany", "DE", "🇩🇪", "European distribution center for wider Europe reach.", 4),
        ("Russia", "RU", "🇷🇺", "Major trading partner. Cold chain logistics from Nashik Hub to Moscow.", 5),
    ]
    
    for name, code, flag, desc, order in countries:
        ExportCountry.objects.create(
            name=name, country_code=code, flag_emoji=flag, description=desc, order=order, active=True
        )
    print(f"✓ Created {len(countries)} export countries: UAE, Saudi Arabia, UK, Germany, Russia")
    
    # 3. Delete all products first to start fresh
    Product.objects.all().delete()
    
    # 4. Get or create the Fresh Vegetables category
    cat_veg, _ = Category.objects.get_or_create(
        name="Fresh Vegetables",
        defaults={
            "description": "Freshly sourced, premium quality export-grade Indian vegetables harvested from Nashik Hub.",
            "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600"
        }
    )
    
    # Get or create Fresh Fruits category
    cat_fruit, _ = Category.objects.get_or_create(
        name="Fresh Fruits",
        defaults={
            "description": "Juicy, handpicked fresh tropical and seasonal Indian fruits from Nashik Hub.",
            "image_url": "https://images.unsplash.com/photo-1610832958506-ee56336191d1?auto=format&fit=crop&q=80&w=600"
        }
    )
    
    # 5. Create only the specified products: Onion, Banana, Green Chilly, Kale (Karle)
    
    # Onion
    p_onion = Product.objects.create(
        category=cat_veg,
        name="Fresh Red Onion",
        description="Premium export quality Nashik Red Onions. Graded, sorted, and packed. Known for excellent shelf life and perfect for Arab and European markets.",
        origin="Nashik, Maharashtra, India",
        quality_grade="A-Grade (35mm to 55mm+ size)",
        moq="15 Metric Tons (1x20ft Reefer Container)",
        packaging_type="25kg / 50kg Red Mesh Bags",
        shelf_life="45 to 60 days under controlled ventilation",
        export_availability=True,
        base_price_inr=Decimal('32000.00'),
        price_unit="Metric Ton",
        primary_image_url="https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&q=80&w=600"
    )
    
    # Banana
    p_banana = Product.objects.create(
        category=cat_fruit,
        name="Fresh Cavendish Banana",
        description="Golden yellow, premium grade Cavendish bananas from Nashik region. Shipped fresh to UAE, Saudi Arabia, Europe, and Russia. Perfect ripeness at delivery.",
        origin="Nashik & Jalgaon, Maharashtra, India",
        quality_grade="Premium Export Grade (Grade A, 18-20cm)",
        moq="12 Metric Tons (1x20ft Reefer Container)",
        packaging_type="13kg Cardboard Boxes / Plastic Crates",
        shelf_life="10 to 14 days in temperature-controlled shipping (13-15°C)",
        export_availability=True,
        base_price_inr=Decimal('45000.00'),
        price_unit="Metric Ton",
        primary_image_url="https://images.unsplash.com/photo-1603073163297-8cc5c6aa4d15?auto=format&fit=crop&q=80&w=600"
    )
    
    # Green Chilly
    p_green_chilly = Product.objects.create(
        category=cat_veg,
        name="Fresh Green Chilly",
        description="Fresh, vibrant green chillies from Nashik Hub. Premium quality, handpicked. Exported to Arab countries, Europe, and Russia for culinary and spice industries.",
        origin="Nashik & Aurangabad, Maharashtra, India",
        quality_grade="Premium Export (Grade A, 5-8cm length)",
        moq="8 Metric Tons",
        packaging_type="10kg / 20kg Plastic Crates with ventilation",
        shelf_life="7 to 10 days in temperature-controlled storage (8-10°C)",
        export_availability=True,
        base_price_inr=Decimal('55000.00'),
        price_unit="Metric Ton",
        primary_image_url="https://images.unsplash.com/photo-1585518419759-53a0c0b20e9c?auto=format&fit=crop&q=80&w=600"
    )
    
    # Bitter Gourd (Karle)
    p_bitter_gourd = Product.objects.create(
        category=cat_veg,
        name="Fresh Bitter Gourd (Karle)",
        description="Premium export quality fresh Bitter Gourd (also known as Bitter Melon or Karle) sourced directly from farmers in the Nashik region. Rich in nutrients, carefully sorted, and packed to maintain freshness during long transit to Gulf and European markets.",
        origin="Nashik, Maharashtra, India",
        quality_grade="Premium Export Quality (Sorted & Graded)",
        moq="5 Metric Tons",
        packaging_type="5kg / 10kg Corrugated Boxes or Perforated Crates",
        shelf_life="15 to 20 days in temperature-controlled shipping (8-10°C)",
        export_availability=True,
        base_price_inr=Decimal('40000.00'),
        price_unit="Metric Ton",
        primary_image_url="https://images.unsplash.com/photo-1582515073490-39981397c445?auto=format&fit=crop&q=80&w=600"
    )
    
    print(f"✓ Created 4 products: Fresh Red Onion, Banana, Green Chilly, Bitter Gourd")
    print("✓ All products sourced from Nashik Hub, India")
    print("✓ Export destinations: UAE, Saudi Arabia, UK, Germany, Russia")
    print("\nDatabase update completed successfully!")
    print("\nSummary:")
    print("- Products: Onion, Banana, Green Chilly, Bitter Gourd")
    print("- Origin: Nashik Hub, India")
    print("- Export Destinations: Europe (UK, Germany), Arab Countries (UAE, Saudi Arabia), Russia")

if __name__ == '__main__':
    update_database()
