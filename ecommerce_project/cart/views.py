from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from products.models import Product

def cart_add(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    cart = request.session.get('cart', {})
    product_key = str(product_id)
    if product_key in cart:
        cart[product_key] += 1
    else:
        cart[product_key] = 1
    request.session['cart'] = cart
    messages.success(request, f"{product.name} ajouté au panier.")
    return redirect(request.META.get('HTTP_REFERER', 'product_list'))

def cart_remove(request, product_id):
    cart = request.session.get('cart', {})
    product_key = str(product_id)
    if product_key in cart:
        del cart[product_key]
        request.session['cart'] = cart
        messages.success(request, "Produit retiré du panier.")
    return redirect('cart_detail')

def cart_update(request, product_id):
    if request.method == 'POST':
        quantity = int(request.POST.get('quantity', 1))
        cart = request.session.get('cart', {})
        product_key = str(product_id)
        if quantity > 0:
            cart[product_key] = quantity
        else:
            cart.pop(product_key, None)
        request.session['cart'] = cart
        messages.success(request, "Panier mis à jour.")
    return redirect('cart_detail')

def cart_detail(request):
    cart = request.session.get('cart', {})
    products = Product.objects.filter(id__in=[int(k) for k in cart.keys()])
    cart_items = []
    total = 0
    for product in products:
        quantity = cart[str(product.id)]
        subtotal = product.price * quantity
        total += subtotal
        cart_items.append({
            'product': product,
            'quantity': quantity,
            'subtotal': subtotal,
        })
    return render(request, 'cart/cart_detail.html', {
        'cart_items': cart_items,
        'total': total,
    })
