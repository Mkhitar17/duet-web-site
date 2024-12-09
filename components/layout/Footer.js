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
          <div className={styles.usefulHeadline}>
            <Link href='/' className={styles.linkTitle}>Օգտակար հղումներ</Link>
          </div>
          <div className={styles.footerLinksContainer}>
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
                alt="tel"
              />

              <p className={styles.footerTextStyle}>098 604406</p>
            </div>

            <div className={styles.footerContactUsIcons_text_size}>

              <Image
                src={footerMail}
                width={0}
                height={0}
                className={styles.footerImageIcons}
                alt="Mail"
              />
              <p className={styles.footerTextStyle}>duet.coffee@gmail.com</p>
            </div>
            <div className={styles.footerContactUsIcons_text_size}>
              <Image
                src={footerLocation}
                width={0}
                height={0}
                className={styles.footerImageIcons}
                alt="location"
              />
              <p className={styles.footerTextStyle}>Հաղթանակ թաղամաս, 1 <br/> <span className={styles.footerSpan}> փողոց 48 շինություն</span></p>
            </div>
          </div>
        </div>

        <div className={styles.footerFollowContent}>
          <h1 className={styles.footerFollowMe}>Հետևեք մեզ</h1>
          <div className={styles.footerFollowIcons}>
          <a href="https://www.facebook.com/dueticecoffee?locale=ru_RU"
          target="_blank">
            <Image
            src={footerFB}
            alt="facebook"
            />
          </a>
          <a href="https://www.instagram.com/duet_company/profilecard/?igsh=ancxeGx1Ymg0ZjJy" 
          target="_blank">
            <Image
            src={footerInst}
            alt="instagram"
            />
          </a>
          <a href="#">
            <Image
            src={footerWhatsup}
            alt="whatsapp"
            />
            
          </a>
          <a href="#">
            <Image
            src={footerTg}
            alt="telegram"
            />
          </a>
          </div>
        </div>


      </div>


      <p className={styles.footerArmCoding}>© {new Date().getFullYear()} By ArmCoding - © 2024 All Rights Reserved.</p>
    </footer>
  );
}