import Link from "next/link";
import styles from "./index.module.css";
import Image from "next/image";


export default function ProducItem({ image }) {

  return (
    <div className={styles.Container}>
      <div className={styles.ProductImageContainer}>
        <Image
          src={image} 
          alt="bannerimage"
          width={0} 
          height={0} 
          className={styles.ProductImage}
        />
      </div>
    </div>
  );
}