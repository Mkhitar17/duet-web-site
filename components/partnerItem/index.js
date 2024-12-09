import styles from "./index.module.css";
import Image from "next/image";


export default function ProducItem({ logo }) {

  return (
    <div className={styles.Container}>
      <div className={styles.ProductImageContainer}>
        <Image
          src={logo} 
          alt="bannerimage"
          width={0} 
          height={0} 
          className={styles.PartnerLogo}
        />
      </div>
    </div>
  );
}