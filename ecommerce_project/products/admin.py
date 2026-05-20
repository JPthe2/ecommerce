from django.contrib import admin
from django.utils.html import format_html
from .models import Category, Product

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'icon', 'product_count', 'created_at')
    search_fields = ('name',)

    def product_count(self, obj):
        count = obj.products.count()
        return format_html('<span style="background:#e74c3c;color:white;padding:2px 8px;border-radius:10px;font-weight:600;">{}</span>', count)
    product_count.short_description = 'Products'

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price_display', 'stock_display', 'badge', 'featured')
    list_filter = ('category', 'badge', 'featured')
    search_fields = ('name', 'description')
    list_editable = ('featured', 'badge')
    ordering = ('category', 'name')

    def price_display(self, obj):
        return format_html('<strong style="color:#e74c3c;">${}</strong>', obj.price)
    price_display.short_description = 'Price'

    def stock_display(self, obj):
        color = '#27ae60' if obj.stock > 10 else '#f39c12' if obj.stock > 0 else '#e74c3c'
        return format_html('<span style="color:{};">{} units</span>', color, obj.stock)
    stock_display.short_description = 'Stock'
