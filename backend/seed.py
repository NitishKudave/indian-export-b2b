import os
import django
from decimal import Decimal

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth.models import User
from api.models import (
    Category, Product, ExportCountry, Certification, 
    Testimonial, HomepageBanner, ProductImage, BlogPost
)

def seed_database():
    print("Starting database seeding...")
    
    # 1. Create Superuser if it doesn't exist
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@orbinexglobal.com', 'admin123')
        print("Admin superuser created: admin / admin123")
    else:
        print("Admin user already exists")

    # Clear existing data to avoid duplicates
    Category.objects.all().delete()
    Product.objects.all().delete()
    ExportCountry.objects.all().delete()
    Certification.objects.all().delete()
    Testimonial.objects.all().delete()
    HomepageBanner.objects.all().delete()
    print("Cleared old records...")

    # 2. Create Categories
    cat_veg = Category.objects.create(
        name="Fresh Vegetables",
        description="Freshly sourced, premium quality export-grade Indian vegetables harvested from Nashik Hub.",
        image_url="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600"
    )
    cat_fruit = Category.objects.create(
        name="Fresh Fruits",
        description="Juicy, handpicked fresh tropical and seasonal Indian fruits from Nashik Hub.",
        image_url="https://images.unsplash.com/photo-1610832958506-ee56336191d1?auto=format&fit=crop&q=80&w=600"
    )
    print("Categories created...")

    # 3. Create Products - Only the specified 4 products
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
    
    print("Products created (4 products from Nashik Hub: Onion, Banana, Green Chilly, Bitter Gourd)...")

    # 4. Create Export Countries
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
    print("Export countries created (Europe, Arab, Russia)...")

    # 5. Create Certifications
    certs = [
        ("APEDA", "Agricultural & Processed Food Products Export Development Authority of India.", "Government Ministry registry certifying compliance of agri exports.", 1),
        ("FSSAI", "Food Safety and Standards Authority of India License.", "Certifies food processing quality and hygienic standards.", 2),
        ("ISO 22000:2018", "Food Safety Management System Certification.", "Global ISO standard for risk assessment and safety protocols.", 3),
        ("HACCP", "Hazard Analysis Critical Control Point.", "Systematic preventive approach to food safety biological hazards.", 4),
        ("HALAL Certified", "Adherence to Islamic dietary guidelines.", "Enables seamless trading in Middle Eastern and Muslim-majority countries.", 5)
    ]
    for name, desc, authority, order in certs:
        Certification.objects.create(
            name=name, description=desc, certificate_authority=authority, display_order=order,
            logo_url="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=150"
        )
    print("Certifications created...")

    # 6. Create Testimonials - Updated for current products
    testimonials = [
        ("Farhan Al-Mansoori", "Amana Fresh Trading LLC, Dubai", "Managing Director", 
         "Orbinexglobal has been our primary supplier of Red Onions and Bananas from Nashik Hub for 2 years. The quality consistency and cold-chain timing are highly commendable.", 5, 1),
        ("Sarah Jenkins", "Global Foods Ltd, London", "Senior Procurement Specialist", 
         "Fresh vegetables like Green Chilly and Kale arrive in perfect condition. Outstanding customer service and clear communication throughout the shipping customs process.", 5, 2),
        ("Igor Petrov", "Moscow Fresh Import Co.", "Operations Manager", 
         "We buy fresh produce from Nashik Hub regularly. Excellent logistics coordination, competitive pricing, and reliable supply of Onion, Banana, and leafy greens. Highly recommended.", 5, 3)
    ]
    for author, company, role, review, rating, order in testimonials:
        Testimonial.objects.create(
            author_name=author, company=company, role=role, review=review, rating=rating, display_order=order,
            profile_image_url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
        )
    print("Testimonials created...")

    # 7. Create Homepage Banners
    banners = [
        ("Premium Nashik Hub Produce Exporter", "Sourcing directly from Nashik, shipping to Europe, Arab Countries & Russia. Premium Fresh Fruits, Vegetables, and Greens.", "/products", True, 1),
        ("Global Export Reach", "Shipping weekly to UAE, Saudi Arabia, UK, Germany, and Russia with full phytosanitary clearance.", "/countries", True, 2)
    ]
    for title, subtitle, link, active, order in banners:
        HomepageBanner.objects.create(
            title=title, subtitle=subtitle, link=link, active=active, display_order=order,
            image_url="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=1200"
        )
    print("Banners created...")
    
    # 8. Create Blogs
    blogs = [
        ("Fresh Onion Export from Nashik Hub to Arab Countries", 
         "Nashik is India's premier onion producing region. Our cold-chain logistics ensure fresh, graded red onions reach Dubai, Saudi Arabia, and other Arab nations within optimal storage windows. Here we break down customs duty frameworks and quality standards...", 
         "Vikram Singh (Managing Director)"),
        ("Exporting Fresh Bananas & Bitter Gourd to Europe & Russia", 
         "Premium Cavendish bananas and nutrient-rich Bitter Gourd (Karle) from Nashik have growing demand in European and Russian markets. Our specialized reefer containers and temperature control logistics maintain peak freshness for 10-14 days of transit. In this blog, we review cold chain best practices...", 
         "Rajesh Sharma (Logistics Head)")
    ]
    for title, content, author in blogs:
        BlogPost.objects.create(
            title=title, content=content, author=author,
            banner_image_url="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600"
        )
    print("Blogs created...")
    
    print("\n=== Database seeding completed successfully! ===")
    print("Products: Fresh Red Onion, Banana, Green Chilly, Bitter Gourd (Karle)")
    print("Origin: Nashik Hub, India")
    print("Export Destinations: UAE, Saudi Arabia, UK, Germany, Russia")

if __name__ == '__main__':
    seed_database()
