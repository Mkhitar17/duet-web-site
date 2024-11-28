import Link from "next/link";
import styles from "./layout.module.css";
import Image from "next/image";
import DuetLogo from "@/public/duet.svg"
import ArmFlag from '@/public/armFlag.svg'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerSize}>
        <Image
          src={DuetLogo}
          width={0}
          height={0}
          className={styles.DuetLogo}
        />
        <nav className={styles.nav}>
          <Link href="/" className={styles.link}>Մեր մասին</Link>
          <Link href="/about" className={styles.link}>Արտադրանք</Link>
          <Link href="/contact" className={styles.link}>Հումք</Link>
          <Link href="/contact" className={styles.link}>Կապ մեզ հետ</Link>

          <Image
            src={ArmFlag}
            width={0}
            height={0}
            className={styles.ArmLogo}
          />
          
        </nav>
      </div>
    </header>
  );
}