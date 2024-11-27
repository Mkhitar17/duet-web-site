import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Banner from '@/components/banner'
import Production from '@/components/sections/production'



export default function HomePage() {
  return (
     <div className={styles.HomeContainer}>
        <Banner/>
        <Production/>
     </div>
  )
}
