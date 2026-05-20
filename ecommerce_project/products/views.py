from django.shortcuts import render, get_object_or_404
from django.db.models import Q
from .models import Product, Category

def product_list(request):
    products = Product.objects.all().select_related('category')
    categories = Category.objects.all()
    featured_products = products.filter(featured=True)[:4]
    hero_product = products.filter(
        category__name='Headphones').first()

    search_query = request.GET.get('q', '')
    category_filter = request.GET.get('category', '')
    sort_by = request.GET.get('sort', '')

    if search_query:
        products = products.filter(
            Q(name__icontains=search_query) |
            Q(description__icontains=search_query) |
            Q(category__name__icontains=search_query)
        )

    if category_filter:
        products = products.filter(category__name=category_filter)

    if sort_by == 'price_asc':
        products = products.order_by('price')
    elif sort_by == 'price_desc':
        products = products.order_by('-price')
    elif sort_by == 'newest':
        products = products.order_by('-created_at')

    context = {
        'products': products,
        'categories': categories,
        'featured_products': featured_products,
        'hero_product': hero_product,
        'search_query': search_query,
        'category_filter': category_filter,
        'sort_by': sort_by,
        'total_products': products.count(),
    }
    return render(request, 'product_list.html', context)

def product_detail(request, id):
    product = get_object_or_404(Product, id=id)
    related_products = Product.objects.filter(
        category=product.category
    ).exclude(id=id)[:4]
    context = {
        'product': product,
        'related_products': related_products,
    }
    return render(request, 'product_detail.html', context)

def category_list(request):
    categories = Category.objects.all()
    for cat in categories:
        cat.product_count = cat.products.count()
        cat.sample_products = cat.products.all()[:3]
    return render(request, 'category_list.html', {'categories': categories})

def category_detail(request, id):
    category = get_object_or_404(Category, id=id)
    products = category.products.all()
    sort_by = request.GET.get('sort', '')
    if sort_by == 'price_asc':
        products = products.order_by('price')
    elif sort_by == 'price_desc':
        products = products.order_by('-price')
    return render(request, 'category_detail.html', {
        'category': category,
        'products': products,
        'sort_by': sort_by,
    })
