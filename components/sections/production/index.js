import { useState, useRef } from "react";
import styles from "./index.module.css";
import ProducItem from "@/components/producItem";
import dexc from "@/public/products/dexc.png";
import kapuyt from "@/public/products/kapuyt.png";
import kat from "@/public/products/kat.png";
import limon from "@/public/products/limon-shish.png";
import sevDuet from "@/public/products/sevduet.png";
import SectionHeadline from "@/components/sectionHeadline";

export default function ProducTionSection() {
    // const imagesArray = [sevDuet, dexc, kapuyt, kat, limon, kat, kat, kat, kat, kat, kat];
    const imagesArray = [
        "https://i.imgur.com/D1mwBlM.png",
        "https://i.imgur.com/pkLpCwl.png",
        "https://i.imgur.com/kxF5fq3.png",
        "https://i.imgur.com/wfjyMnX.png",
        "https://i.imgur.com/DZXG0FV.png",
        "https://i.imgur.com/pkLpCwl.png",
        "https://i.imgur.com/8DOu99a.png",
        "https://i.imgur.com/TVJY3Yf.png",
        "https://i.imgur.com/h3rqtzD.png",
    ];


    const gridRef = useRef(null);

    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div className={styles.Container}>
            <SectionHeadline
                title="Արտադրանք"
                gridRef={gridRef}
                scrollAmount={300}
                customStyles={{
                    paddingRight: "71px",
                    paddingLeft: "71px",
                }}
            />
            <div className={styles.ProductsSlider} ref={gridRef}>
                {imagesArray.map((image, index) => (
                    <ProducItem key={index} image={image} />
                ))}
            </div>
        </div>
    );
}
