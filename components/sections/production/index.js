import { useState, useRef } from "react";
import Link from "next/link";
import styles from "./index.module.css";
import Image from "next/image";
import ProducItem from "@/components/producItem";

import dexc from "@/public/products/dexc.png";
import kapuyt from "@/public/products/kapuyt.png";
import kat from "@/public/products/kat.png";
import limon from "@/public/products/limon-shish.png";
import sevDuet from "@/public/products/sevduet.png";
import prev from "@/public/prev.svg";
import next from "@/public/NextIcon.svg";


import SectionHeadline from "@/components/sectionHeadline";

export default function ProducTionSection() {
    const imagesArray = [sevDuet, dexc, kapuyt, kat, limon, kat, kat, kat, kat, kat, kat];
    const gridRef = useRef(null);

    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <div className={styles.Container}>
            {/* <div className={styles.ProducItemTitleSlider}>
                <h1 className={styles.ProducItemTitle}>Արտադրանք</h1>
                <div className={styles.ProducItemIcons}>
                        <Image src={prev} alt="Prev" width={0} height={0} />
                        <Image src={next} alt="Next" width={0} height={0} />
                </div>
            </div> */}

            <SectionHeadline
                title="Արտադրանք"
                gridRef={gridRef}
                scrollAmount={300}
                customStyles={{
                    paddingRight: "77px",
                    paddingLeft: "64px",
                }}
            />

            <div className={styles.ProductsSlider} ref={gridRef}>
                {imagesArray.map((image, index) => (
                    <div key={index} >
                        <ProducItem image={image}  />
                        <div className={styles.testKlor}></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
