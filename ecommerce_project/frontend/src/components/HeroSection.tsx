import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Battery,
  Sliders,
  ChevronRight,
  Zap,
  Bluetooth,
  Wifi,
  Music,
} from 'lucide-react'
import type { ProductId, HeroProduct } from '../types'
import { HERO_PRODUCTS } from '../data'

const spring = { type: 'spring' as const, stiffness: 100, damping: 30 }
const springFast = { type: 'spring' as const, stiffness: 260, damping: 25 }

const ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  },
  item: {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: {
      opacity: 1, y: 0, filter: 'blur(0px)', transition: spring,
    },
    exit: { opacity: 0, y: -10, filter: 'blur(5px)' },
  },
  image: (isFirst: boolean) => ({
    initial: {
      opacity: 0, scale: 1.5, filter: 'blur(15px)',
      rotate: isFirst ? -30 : 30, x: isFirst ? -80 : 80,
    },
    animate: {
      opacity: 1, scale: 1, filter: 'blur(0px)', rotate: 0, x: 0,
      transition: springFast,
    },
    exit: {
      opacity: 0, scale: 0.6, filter: 'blur(20px)',
      transition: { duration: 0.25 },
    },
  }),
}

const iconMap: Record<string, React.ElementType> = {
  Zap, Bluetooth, Wifi, Music,
}

function BackgroundGradient({ isFirst }: { isFirst: boolean }) {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <motion.div
        animate={{
          background: isFirst
            ? 'radial-gradient(circle at 0% 50%, rgba(0, 113, 227, 0.12), transparent 50%)'
            : 'radial-gradient(circle at 100% 50%, rgba(0, 113, 227, 0.12), transparent 50%)',
        }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      />
    </div>
  )
}

function ProductVisual({ data, isFirst }: { data: HeroProduct; isFirst: boolean }) {
  return (
    <motion.div layout="position" className="relative group shrink-0">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className={`absolute inset-[-20%] rounded-full border border-dashed border-transparent ${data.colors.ring}`}
      />
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute inset-0 rounded-full bg-gradient-to-br ${data.colors.gradient} blur-2xl opacity-40`}
      />
      <div className="relative h-80 w-80 md:h-[450px] md:w-[450px] rounded-full shadow-2xl flex items-center justify-center overflow-hidden bg-transparent">
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          className="relative z-10 w-full h-full flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={data.id}
              src={data.image}
              alt={data.title}
              variants={ANIMATIONS.image(isFirst)}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full h-full object-contain p-4"
              draggable={false}
            />
          </AnimatePresence>
        </motion.div>
      </div>
      <motion.div
        layout="position"
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
      >
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.08em] text-[#86868b] bg-[#1d1d1f]/80 px-4 py-2 rounded-full backdrop-blur border border-[#2d2d2f]">
          <span className={`h-1.5 w-1.5 rounded-full ${data.colors.glow} animate-pulse`} />
          {data.stats.connectionStatus}
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProductDetails({ data, isFirst }: { data: HeroProduct; isFirst: boolean }) {
  const alignClass = isFirst ? 'items-start text-left' : 'items-end text-right'
  const flexDirClass = isFirst ? 'flex-row' : 'flex-row-reverse'
  const barColorClass = isFirst ? 'left-0 bg-[#0071e3]' : 'right-0 bg-[#0071e3]'

  return (
    <motion.div
      variants={ANIMATIONS.container}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`flex flex-col ${alignClass}`}
    >
      <motion.h2 variants={ANIMATIONS.item} className="text-sm font-medium uppercase tracking-[0.1em] text-[#86868b] mb-2">
        {data.label} {isFirst ? 'Pro' : '15 Pro Max'}
      </motion.h2>
      <motion.h1 variants={ANIMATIONS.item} className="text-4xl md:text-5xl font-bold tracking-tight mb-3 text-[#f5f5f7]" style={{letterSpacing:'-0.02em'}}>
        {data.title}
      </motion.h1>
      <motion.p variants={ANIMATIONS.item} className={`text-[#86868b] mb-10 max-w-sm leading-relaxed font-light ${isFirst ? 'mr-auto' : 'ml-auto'}`} style={{lineHeight:'1.6'}}>
        {data.description}
      </motion.p>

      <motion.div variants={ANIMATIONS.item} className="w-full space-y-6 bg-[#1d1d1f]/60 p-6 rounded-2xl border border-[#2d2d2f]">
        {data.features.map((feature, idx) => {
          const IconComp = iconMap[feature.icon as keyof typeof iconMap]
          return (
            <div key={feature.label} className="group">
              <div className={`flex items-center justify-between mb-3 text-sm ${flexDirClass}`}>
                <div className={`flex items-center gap-2 ${feature.value > 50 ? 'text-zinc-200' : 'text-zinc-400'}`}>
                  {IconComp && <IconComp size={16} />}
                  <span>{feature.label}</span>
                </div>
                <span className="font-mono text-xs text-zinc-500">{feature.value}%</span>
              </div>
              <div className="relative h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${feature.value}%` }}
                  transition={{ duration: 1, delay: 0.4 + idx * 0.15 }}
                  className={`absolute top-0 bottom-0 ${barColorClass} opacity-80`}
                />
              </div>
            </div>
          )
        })}
        <div className={`pt-4 flex ${isFirst ? 'justify-start' : 'justify-end'}`}>
          <button type="button" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-white transition-colors group">
            <Sliders size={14} /> View Specs
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>

      <motion.div variants={ANIMATIONS.item} className={`mt-6 flex items-center gap-3 text-zinc-500 ${flexDirClass}`}>
        <Battery size={16} />
        <span className="text-sm font-medium">{data.stats.batteryLevel}% Charge</span>
      </motion.div>
    </motion.div>
  )
}

function Switcher({
  activeId,
  onToggle,
}: {
  activeId: ProductId
  onToggle: (id: ProductId) => void
}) {
  const options = Object.values(HERO_PRODUCTS).map(p => ({ id: p.id, label: p.label }))

  return (
    <div className="fixed bottom-12 inset-x-0 flex justify-center z-50 pointer-events-none">
      <motion.div layout className="pointer-events-auto flex items-center gap-1 p-1.5 rounded-full bg-[#1d1d1f]/80 backdrop-blur-2xl border border-[#2d2d2f]">
        {options.map((opt) => (
          <motion.button
            key={opt.id}
            onClick={() => onToggle(opt.id as ProductId)}
            whileTap={{ scale: 0.96 }}
            className="relative w-24 h-12 rounded-full flex items-center justify-center text-sm font-medium focus:outline-none"
          >
            {activeId === opt.id && (
              <motion.div
                layoutId="island-surface"
                className="absolute inset-0 rounded-full bg-[#0071e3]/20"
                transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              />
            )}
            <span className={`relative z-10 transition-colors duration-300 ${activeId === opt.id ? 'text-[#f5f5f7]' : 'text-[#86868b] hover:text-[#f5f5f7]'}`}>
              {opt.label}
            </span>
            {activeId === opt.id && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -bottom-1 h-1 w-6 rounded-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            )}
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}

export default function HeroSection() {
  const [activeId, setActiveId] = useState<ProductId>('airpods')
  const currentData = HERO_PRODUCTS[activeId]
  const isFirst = activeId === 'airpods'

  return (
    <div className="relative min-h-screen w-full bg-[#1d1d1f] text-[#f5f5f7] overflow-hidden selection:bg-[#0071e3]/20 flex flex-col items-center justify-center">
      <BackgroundGradient isFirst={isFirst} />
      <main className="relative z-10 w-full px-6 py-8 flex flex-col justify-center max-w-7xl mx-auto">
        <motion.div
          layout
          transition={{ type: 'spring', bounce: 0, duration: 0.9 }}
          className={`flex flex-col md:flex-row items-center justify-center gap-12 md:gap-32 lg:gap-48 w-full ${
            isFirst ? 'md:flex-row' : 'md:flex-row-reverse'
          }`}
        >
          <ProductVisual data={currentData} isFirst={isFirst} />
          <motion.div layout="position" className="w-full max-w-md">
            <AnimatePresence mode="wait">
              <ProductDetails key={activeId} data={currentData} isFirst={isFirst} />
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </main>
      <Switcher activeId={activeId} onToggle={setActiveId} />
    </div>
  )
}
