import React, { ReactNode } from 'react'
import { SmoothScroll } from '@/components/SmoothScroll'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { client } from '@/lib/sanity'
import { siteSettingsQuery } from '@/lib/queries'

interface LayoutProps {
  children: ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const settings = await client.fetch(siteSettingsQuery, {}, { cache: "no-store" });

  return (
    <>
      <SmoothScroll />
      <Header settings={settings} />
      {children}
      <Footer settings={settings} />
    </>
  )
}

export default Layout