import { Headphones, Smartphone, Laptop, Gamepad2 } from 'lucide-react'
import { ProductHighlightCard } from './ProductHighlightCard'

const highlightProducts = [
  {
    id: 1,
    categoryIcon: <Headphones size={20} />,
    category: 'Headphones',
    title: 'AirPods Pro',
    description: 'Active Noise Cancellation with Transparency mode.',
    imageSrc: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=600&hei=600&fmt=png-alpha&.v=1660803972366',
    imageAlt: 'AirPods Pro',
  },
  {
    id: 2,
    categoryIcon: <Smartphone size={20} />,
    category: 'Smartphones',
    title: 'iPhone 15 Pro',
    description: 'A17 Pro chip. 48MP camera system. Titanium design.',
    imageSrc: '/static/iphone-15-pro.png',
    imageAlt: 'iPhone 15 Pro Max',
  },
  {
    id: 3,
    categoryIcon: <Laptop size={20} />,
    category: 'Laptops',
    title: 'MacBook Pro',
    description: 'M3 Max chip. Up to 22 hours of battery life.',
    imageSrc: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-m3-max-pro-spaceblack-select-202310?wid=600&hei=600&fmt=png-alpha&.v=1697242158327',
    imageAlt: 'MacBook Pro',
  },
  {
    id: 4,
    categoryIcon: <Gamepad2 size={20} />,
    category: 'Gaming',
    title: 'PS5 Console',
    description: 'Lightning-fast SSD. Ray tracing. 4K gaming.',
    imageSrc: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&h=600&fit=crop',
    imageAlt: 'PS5',
  },
]

export default function FeaturedShowcase() {
  return (
    <section className="py-20 bg-[#f5f5f7]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1d1d1f]" style={{letterSpacing:'-0.02em'}}>
            Premium <span className="text-[#0071e3]">Picks</span>
          </h2>
          <p className="mt-2 text-[#86868b] text-sm">
            Handpicked top electronics — the best of the best
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {highlightProducts.map((product) => (
            <ProductHighlightCard
              key={product.id}
              categoryIcon={product.categoryIcon}
              category={product.category}
              title={product.title}
              description={product.description}
              imageSrc={product.imageSrc}
              imageAlt={product.imageAlt}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
