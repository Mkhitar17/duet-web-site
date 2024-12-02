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
    const imagesArray = [sevDuet, dexc, kapuyt, kat, limon, kat, kat, kat, kat, kat, kat];
    const gridRef = useRef(null);

    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div className={styles.Container}>
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
                    <div
                        key={index}
                        onMouseEnter={() => setHoveredIndex(index)} 
                        onMouseLeave={() => setHoveredIndex(null)} 
                    >
                        <ProducItem image={image} className={styles.testImg} />
                        <div
                            className={`${styles.testKlor} ${hoveredIndex === index ? styles.animateKlor : ""
                                }`}
                        ></div>
                        {hoveredIndex === index && (
                            <div className={styles.hoverContent}>
                                <p className={styles.testText}>200մլ</p>
                                <button className={styles.buttonTest}>Տեսնել ավելին</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
