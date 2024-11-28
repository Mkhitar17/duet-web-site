import Link from "next/link";
import styles from "./index.module.css";
import Image from "next/image";
import ProducItem from "@/components/producItem";

// import dexc from "@/public/products/dexc.png";
// import kapuyt from "@/public/products/kapuyt.png";
// import kat from "@/public/products/kat.png";
// import limon from "@/public/products/limon-shish.png";
import sevDuet from "@/public/products/sevduet.png";
import prev from '@/public/prev.svg'
import next from '@/public/NextIcon.svg'





export default function ProducTionSection() {

    const imagesArray = [sevDuet]


    return (
        <div className={styles.Container}>
            <div className={styles.ProducItemTitleSlider}>
                <h1 className={styles.ProducItemTitle}>Արտադրանք</h1>
                <div className={styles.ProducItemIcons}>
                    <Image
                        src={prev}
                        width={0}
                        height={0}

                    />
                    <Image
                        src={next}
                        width={0}
                        height={0}
                    />

                </div>
            </div>            <div className={styles.ProductsSlider}>
                {imagesArray.map((image, index) => (
                    <div key={index} >

                        <ProducItem image={image} className={styles.sectionItem}
                        />
                        <div className={styles.testKlor}></div>
                    </div>
                ))}
            </div>
        </div>
    );
}