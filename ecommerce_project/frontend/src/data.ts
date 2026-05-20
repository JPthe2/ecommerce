import type { HeroProduct } from './types'

export const HERO_PRODUCTS: Record<string, HeroProduct> = {
  airpods: {
    id: 'airpods',
    label: 'AirPods',
    title: 'Spatial Audio',
    description: 'Immersive sound with dynamic head tracking. Adaptive EQ automatically tunes music to the shape of your ear for a rich listening experience.',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=600&hei=600&fmt=png-alpha&.v=1660803972366',
    colors: {
      gradient: 'from-blue-600 to-indigo-900',
      glow: 'bg-blue-500',
      ring: 'border-l-blue-500/50',
    },
    stats: { connectionStatus: 'Connected', batteryLevel: 82 },
    features: [
      { label: 'Latency', value: 12, icon: 'Zap' },
      { label: 'Sync Rate', value: 98, icon: 'Wifi' },
    ],
  },
  phone: {
    id: 'phone',
    label: 'iPhone',
    title: 'Pro Camera',
    description: 'A17 Pro chip with 6-core GPU. 48MP main camera with 5x optical zoom. Titanium design. USB-C with USB 3 speeds — pro power at your fingertips.',
    image: '/static/iphone-hero.png',
    colors: {
      gradient: 'from-emerald-600 to-teal-900',
      glow: 'bg-emerald-500',
      ring: 'border-r-emerald-500/50',
    },
    stats: { connectionStatus: '5G Connected', batteryLevel: 74 },
    features: [
      { label: 'A17 Pro', value: 94, icon: 'Bluetooth' },
      { label: 'Display', value: 88, icon: 'Music' },
    ],
  },
}
