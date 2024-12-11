import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Banner from '@/components/banner'
import Production from '@/components/sections/production'
import Partners from '@/components/sections/partners'
import AboutUs from '@/components/sections/aboutUs'
import ContactSection from '@/components/sections/contactSection'



export default function HomePage() {
  return (
    <div className={styles.HomeContainer}>
      <Banner />
      <Production />
      <AboutUs />
      <Partners />
      <ContactSection />
    </div>
  )
}
