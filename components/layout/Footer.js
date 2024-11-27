import Link from "next/link";
import styles from "./layout.module.css";
import Image  from "next/image";
import footerImage from "@/public/duet.svg"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerSize}>
        <div className={styles.footerIcon}>
          <Image src={footerImage} width={0} height={0} className={styles.footerImages}></Image>
        </div>

        <div className={styles.footerLinks}>
          <ul className={styles.ul}>
            <Link href='/' className={styles.linkTitle}>Օգտակար հղումներ</Link>
          </ul>
          <div className={styles.footerLinksSize}>
            <Link href="/" className={styles.links}>Մեր մասին</Link>
            <Link href="/about" className={styles.links}>Արտադրանք</Link>
            <Link href="/contact" className={styles.links}>Հումք</Link>
            <Link href="/contact" className={styles.links}>Կապ մեզ հետ</Link>
          </div>

        </div>

        <div className={styles.footerContactUs}>
          <h1 className={styles.footerContactUsTitle}>
          Կապ մեզ հետ
          </h1>

          <div className={styles.footerContactUsIcons_text}></div>
        </div>


      </div>


      <p>© {new Date().getFullYear()} By ArmCoding - © 2024 All Rights Reserved.</p>
    </footer>
  );
}