import styles from "./index.module.css";
import Image from "next/image";


export default function PartnerItem({ logo }) {
  const isSVG = typeof logo === "string" && logo.trim().startsWith("<svg");

  return (
    <div className={styles.Container}>
      <div className={styles.ProductImageContainer}>
        {isSVG ? (
          <div
            className={styles.SVGContainer}
            dangerouslySetInnerHTML={{ __html: logo }}
          />
        ) : (
          <div className={styles.ImageContainer}>
            <Image
            loading="lazy"
              src={logo}
              alt="Partner Logo"
              width={0}
              height={0}
              className={styles.PartnerLogo}
              unoptimized
            />
          </div>
        )}
      </div>
    </div>
  );
}