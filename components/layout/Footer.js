import Link from "next/link";
import styles from "./layout.module.css";
import Image from "next/image";
import footerImage from "@/public/duet.svg"
import footerTel from "@/public/contact.svg"
import footerMail from "@/public/mail.svg"
import footerLocation from "@/public/location.svg"
import footerFB from "@/public/facebook.svg"
import footerInst from "@/public/instagram.svg"
import footerWhatsup from "@/public/whatsup.svg"
import footerTg from "@/public/tg.svg"




export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerSize}>
        <div className={styles.footerIcon}>
          <Image src={footerImage}
            width={0}
            height={0}
            className={styles.footerImages} />
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


          <div className={styles.footerContactUsIcons_text}>
            <div className={styles.footerContactUsIcons_text_size}>

              <Image
                src={footerTel}
                width={0}
                height={0}
                className={styles.footerImageIcons}
              />

              <p className={styles.footerTextStyle}>098 604406</p>
            </div>

            <div className={styles.footerContactUsIcons_text_size}>

              <Image
                src={footerMail}
                width={0}
                height={0}
                className={styles.footerImageIcons}
              />
              <p className={styles.footerTextStyle}>duet.coffee@gmail.com</p>
            </div>
            <div className={styles.footerContactUsIcons_text_size}>
              <Image
                src={footerLocation}
                width={0}
                height={0}
                className={styles.footerImageIcons}
              />
              <p className={styles.footerTextStyle}>Հաղթանակ թաղամաս, 1 <br/> <span className={styles.footerSpan}> փողոց 48 շինություն</span></p>
            </div>
          </div>
        </div>

        <div className={styles.footerFollowCont}>
          <h1 className={styles.footerFollowMe}>Հետևեք մեզ</h1>
          <div className={styles.footerFollowIcons}>
          <a href="#">
            <Image
            src={footerFB}
            />
          </a>
          <a href="#">
            <Image
            src={footerInst}
            />
          </a>
          <a href="#">
            <Image
            src={footerWhatsup}/>
          </a>
          <a href="#">
            <Image
            src={footerTg}
            />
          </a>
          </div>
        </div>


      </div>


      <p>© {new Date().getFullYear()} By ArmCoding - © 2024 All Rights Reserved.</p>
    </footer>
  );
}