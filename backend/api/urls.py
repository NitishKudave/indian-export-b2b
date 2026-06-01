from django.urls import path
from . import views

urlpatterns = [
    # API Root
    path('', views.api_root, name='api-root'),

    # Auth
    path('token/', views.login_view, name='login'),
    path('admin/verify/', views.admin_verify, name='admin-verify'),
    
    # Dashboard Stats
    path('admin/stats/', views.admin_stats, name='admin-stats'),
    
    # Categories
    path('categories/', views.category_list, name='category-list'),
    path('categories/<slug:slug>/', views.category_detail, name='category-detail'),
    
    # Products
    path('products/', views.product_list, name='product-list'),
    path('products/<slug:slug>/', views.product_detail, name='product-detail'),
    
    # Inquiries
    path('inquiries/', views.inquiry_list, name='inquiry-list'),
    path('inquiries/<int:pk>/', views.inquiry_detail, name='inquiry-detail'),
    
    # Blogs
    path('blogs/', views.blog_list, name='blog-list'),
    path('blogs/<slug:slug>/', views.blog_detail, name='blog-detail'),
    
    # Utilities & Home Catalog items
    path('countries/', views.country_list, name='country-list'),
    path('countries/<int:pk>/', views.country_detail, name='country-detail'),
    
    path('certifications/', views.certification_list, name='certification-list'),
    path('certifications/<int:pk>/', views.certification_detail, name='certification-detail'),
    
    path('testimonials/', views.testimonial_list, name='testimonial-list'),
    path('testimonials/<int:pk>/', views.testimonial_detail, name='testimonial-detail'),
    
    path('banners/', views.banner_list, name='banner-list'),
    path('banners/<int:pk>/', views.banner_detail, name='banner-detail'),
]
