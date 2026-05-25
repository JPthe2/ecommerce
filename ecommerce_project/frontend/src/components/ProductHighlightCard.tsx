import * as React from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '../lib/utils'

interface ProductHighlightCardProps {
  className?: string
  categoryIcon: React.ReactNode
  category: string
  title: string
  description: string
  imageSrc: string
  imageAlt: string
}

export const ProductHighlightCard = React.forwardRef<HTMLDivElement, ProductHighlightCardProps>(
  ({ className, categoryIcon, category, title, description, imageSrc, imageAlt }, ref) => {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const handleMouseMove = ({ clientX, clientY, currentTarget }: React.MouseEvent) => {
      const { left, top } = currentTarget.getBoundingClientRect()
      mouseX.set(clientX - left)
      mouseY.set(clientY - top)
    }

    const rotateX = useTransform(mouseY, [0, 350], [10, -10])
    const rotateY = useTransform(mouseX, [0, 350], [-10, 10])

    const springConfig = { stiffness: 300, damping: 20 }
    const springRotateX = useSpring(rotateX, springConfig)
    const springRotateY = useSpring(rotateY, springConfig)

    const glowX = useTransform(mouseX, [0, 350], [0, 100])
    const glowY = useTransform(mouseY, [0, 350], [0, 100])
    const glowOpacity = useTransform(mouseX, [0, 350], [0, 0.5])

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          mouseX.set(0)
          mouseY.set(0)
        }}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: 'preserve-3d',
        }}
        className={cn(
          'relative h-[350px] w-[350px] rounded-2xl bg-white border border-[#e8e8ed] transition-all duration-300 hover:border-[#0071e3]',
          className,
        )}
      >
        <div style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }} className="absolute inset-4 rounded-xl bg-[#fafafa] border border-[#e8e8ed]">

          <motion.div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0"
            style={{
              opacity: glowOpacity,
              background: `radial-gradient(80px at ${glowX}% ${glowY}%, rgba(0, 113, 227, 0.15), transparent 40%)`,
            }}
          />

          <div className="relative z-10 flex h-full flex-col justify-between p-6">
            <div className="flex items-center space-x-2 text-[#86868b]">
              {categoryIcon}
              <span className="text-sm font-medium">{category}</span>
            </div>

            <div className="text-[#1d1d1f]">
              <h2 className="text-4xl font-bold tracking-tight" style={{letterSpacing:'-0.02em'}}>{title}</h2>
              <p className="mt-2 max-w-[60%] text-xs text-[#86868b]">
                {description}
              </p>
            </div>
          </div>

          <motion.img
            src={imageSrc}
            alt={imageAlt}
            style={{ transform: 'translateZ(50px)', mixBlendMode: 'multiply', background: 'transparent' }}
            whileHover={{ scale: 1.1, y: -20, x: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="absolute -right-12 -bottom-12 h-56 w-56 object-contain"
          />
        </div>
      </motion.div>
    )
  },
)

ProductHighlightCard.displayName = 'ProductHighlightCard'
