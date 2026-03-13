import React, { ReactNode } from 'react'
import { SmoothScroll } from '@/components/SmoothScroll'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

// Fix 1: Use the correct TypeScript interface/type for props
interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    // Fix 2: Wrap children in a Fragment <> or a semantic tag like <main>
    <>
            <SmoothScroll />
            <Header />
      {children}
      <Footer />
    </>
  )
}

export default Layout