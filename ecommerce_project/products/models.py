from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    icon = models.CharField(max_length=50, blank=True, default='🔧')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categories"

class Product(models.Model):
    BADGE_CHOICES = [
        ('', 'None'),
        ('new', 'New'),
        ('sale', 'Sale'),
        ('hot', 'Hot'),
        ('featured', 'Featured'),
    ]
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    original_price = models.DecimalField(max_digits=10, decimal_places=2,
                                          null=True, blank=True)
    stock = models.PositiveIntegerField()
    image = models.ImageField(upload_to='products/images', blank=True, null=True)
    image_url = models.URLField(blank=True, default='')
    category = models.ForeignKey(Category, on_delete=models.CASCADE,
                                  related_name='products')
    created_at = models.DateTimeField(auto_now_add=True)
    featured = models.BooleanField(default=False)
    badge = models.CharField(max_length=20, choices=BADGE_CHOICES,
                              blank=True, default='')

    def __str__(self):
        return self.name

    @property
    def discount_percentage(self):
        if self.original_price and self.original_price > self.price:
            discount = ((self.original_price - self.price) /
                       self.original_price) * 100
            return round(discount)
        return None
