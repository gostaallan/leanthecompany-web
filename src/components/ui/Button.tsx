'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'

const buttonVariants = cva(
  // Two things here are load-bearing and easy to reintroduce by habit:
  //
  // 1. NO `border-none`. Tailwind's preflight sets `border-style: solid` on
  //    every element; `border` sets width only. `border-none` sets
  //    `border-style: none`, which nothing competes with, so it wins
  //    uncontested and no bordered variant paints a border at all.
  // 2. Accent colours use the BARE token name — `amber`, not `amber-DEFAULT`.
  //    Tailwind flattens a `DEFAULT` key to the bare name, so `bg-amber-DEFAULT`
  //    matches no utility and emits no CSS. It fails silently: the class sits
  //    in the markup and the button simply has no background.
  'inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold rounded tracking-wide transition-all duration-150 whitespace-nowrap cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:      'bg-amber text-white hover:bg-amber-light active:scale-[0.98]',
        outline:      'bg-transparent text-ink border border-ink hover:bg-ink hover:text-white active:scale-[0.98]',
        ghost:        'bg-transparent text-amber border border-amber hover:bg-amber hover:text-white active:scale-[0.98]',
        teal:         'bg-teal text-white hover:bg-teal-light active:scale-[0.98]',
        outlineLight: 'bg-transparent text-white border border-white/25 hover:border-white/60 hover:bg-white/10 active:scale-[0.98]',
        // Visually matches the form inputs (smoke bg + ink/20 border) in idle state,
        // turns amber on hover/active to "confirm" the click.
        softCta:      'bg-smoke text-ink border border-ink/20 hover:bg-amber hover:text-white hover:border-amber active:scale-[0.98]',
      },
      size: {
        sm:   'px-4 py-2 text-xs',
        md:   'px-6 py-3 text-sm',
        lg:   'px-8 py-4 text-base',
        full: 'px-6 py-3 text-sm w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size:    'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref as React.Ref<HTMLButtonElement>}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
