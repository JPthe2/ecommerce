from products.models import Category, Product
c1, _ = Category.objects.get_or_create(name="Électronique", description="Appareils électroniques")
c2, _ = Category.objects.get_or_create(name="Vêtements", description="Mode et accessoires")
Product.objects.get_or_create(name="Laptop HP", description="Ordinateur portable performant", price=4999.99, stock=10, category=c1)
Product.objects.get_or_create(name="Smartphone Samsung", description="Téléphone Android haut de gamme", price=2499.00, stock=25, category=c1)
Product.objects.get_or_create(name="T-shirt Nike", description="T-shirt sport confortable", price=199.00, stock=50, category=c2)
