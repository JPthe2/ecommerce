export type ProductId = 'airpods' | 'phone'

export interface FeatureMetric {
  label: string
  value: number
  icon: string
}

export interface HeroProduct {
  id: ProductId
  label: string
  title: string
  description: string
  image: string
  colors: { gradient: string; glow: string; ring: string }
  stats: { connectionStatus: string; batteryLevel: number }
  features: FeatureMetric[]
}
