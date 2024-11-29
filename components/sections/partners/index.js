import Link from "next/link";
import styles from "./index.module.css";
import Image from "next/image";
// import ProducItem from "@/components/producItem";

// import dexc from "@/public/products/dexc.png";
// import kapuyt from "@/public/products/kapuyt.png";
// import kat from "@/public/products/kat.png";
// import limon from "@/public/products/limon-shish.png";
// import sevDuet from "@/public/products/sevduet.png";
import prev from '@/public/prev.svg'
import next from '@/public/NextIcon.svg'
import DuetLogo from "@/public/duetLogo.svg"





export default function PartnersSection() {



    return (
        <div className={styles.Container}>
            <div className={styles.partnersSize}>
            <div className={styles.ProducItemTitleSlider}>
                <h1 className={styles.ProducItemTitle}>Գործընկերներ</h1>
                <div className={styles.ProducItemIcons}>
                        <Image src={prev} alt="Prev" width={0} height={0} />
                        <Image src={next} alt="Next" width={0} height={0} />
                </div>
            </div>
            <div className={styles.PartnersImage}>
            <Image
          src={DuetLogo}
          width={0}
          height={0}
          className={styles.duetLogo}
        />            </div>
            </div>
        </div>
    );
}