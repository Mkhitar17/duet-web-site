/* eslint-disable react/jsx-no-target-blank */

import Link from "next/link";
import styles from "./layout.module.css";

import { useSelector } from "react-redux";
import { useMemo } from "react";

import Image from "next/image";
import footerImage from "@/public/logo.svg"
import footerTel from "@/public/contact.svg"
import footerMail from "@/public/mail.svg"
import footerLocation from "@/public/location.svg"
import footerFB from "@/public/facebook.svg"
import footerInst from "@/public/instagram.svg"
import footerWhatsup from "@/public/whatsup.svg"
import footerTg from "@/public/tg.svg"



const LOCALIZED_TEXTS = {
  arm: {
    usefulLinks: "Օգտակար հղումներ",
    about: "Մեր մասին",
    production: "Արտադրանք",
    material: "Հումք",
    contact: "Կապ մեզ հետ",
    followUs: "Հետևեք մեզ",
  },
  ru: {
    usefulLinks: "Полезные ссылки",
    about: "О нас",
    production: "Продукция",
    material: "Сырье",
    contact: "Свяжитесь с нами",
    followUs: "Следите за нами",
  },
  en: {
    usefulLinks: "Useful Links",
    about: "About Us",
    production: "Production",
    material: "Material",
    contact: "Contact Us",
    followUs: "Follow Us",
  },
};


export default function Footer() {
  const locale = useSelector((state) => state.language.locale);
  const localizedTexts = useMemo(() => LOCALIZED_TEXTS[locale] || LOCALIZED_TEXTS.arm, [locale]);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerSize}>
        <div className={styles.footerIcon}>
          <Image src={footerImage}
          loading="lazy"
            width={0}
            height={0}
            className={styles.footerImages} />
            
        </div>

        <div className={styles.footerLinks}>
          <div className={styles.usefulHeadline}>
            <Link href='/' className={styles.linkTitle}>
              {localizedTexts.usefulLinks}
            </Link>
          </div>
          <div className={styles.footerLinksContainer}>
            <Link href="/" className={styles.links}>{localizedTexts.about}</Link>
            <Link href="/about" className={styles.links}>{localizedTexts.production}</Link>
            <Link href="/contact" className={styles.links}>{localizedTexts.material}</Link>
            <Link href="/contact" className={styles.links}>{localizedTexts.contact}</Link>
          </div>

        </div>

        <div className={styles.footerContactUs}>
          <h1 className={styles.footerContactUsTitle}>
            {localizedTexts.contact}
          </h1>


          <div className={styles.footerContactUsIcons_text}>
            <div className={styles.footerContactUsIcons_text_size}>

              <Image
              loading="lazy"
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
              loading="lazy"
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
              loading="lazy"
                src={footerLocation}
                width={0}
                height={0}
                className={styles.footerImageIcons}
                alt="location"
              />
              <p className={styles.footerTextStyle}>Հաղթանակ թաղամաս, 1 <br /> <span className={styles.footerSpan}> փողոց 48 շինություն</span></p>
            </div>
          </div>
        </div>

        <div className={styles.footerFollowContent}>
          <h1 className={styles.footerFollowMe}>{localizedTexts.followUs}</h1>
          <div className={styles.footerFollowIcons}>
            <a href="https://www.facebook.com/dueticecoffee?locale=ru_RU"
              target="_blank">
              <Image
              loading="lazy"
                src={footerFB}
                alt="facebook"
              />
            </a>
            <a href="https://www.instagram.com/duet_company/profilecard/?igsh=ancxeGx1Ymg0ZjJy"
              target="_blank">
              <Image
              loading="lazy"
                src={footerInst}
                alt="instagram"
              />
            </a>
            <a href="#">
              <Image
              loading="lazy"
                src={footerWhatsup}
                alt="whatsapp"
              />

            </a>
            <a href="#">
              <Image
              loading="lazy"
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