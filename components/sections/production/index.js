import { useState, useRef, useEffect } from "react";
import styles from "./index.module.css";
import ProducItem from "@/components/producItem";
import SectionHeadline from "@/components/sectionHeadline";

export default function ProducTionSection() {
    // const imagesArray = [sevDuet, dexc, kapuyt, kat, limon, kat, kat, kat, kat, kat, kat];
    const [paddingLeft, setPaddingLeft] = useState("71px");
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

    
    useEffect(() => {
        const updatePadding = () => {
          if (window.innerWidth < 1440) {
            setPaddingLeft("16px");
          } else {
            setPaddingLeft("71px");
          }
        };
    
        updatePadding();
        window.addEventListener("resize", updatePadding);
        return () => window.removeEventListener("resize", updatePadding);
      }, []);


    return (
        <div className={styles.Container}>
            <SectionHeadline
                title="Արտադրանք"
                gridRef={gridRef}
                scrollAmount={300}
                customStyles={{paddingLeft}}
                    
                
            />
            <div className={styles.ProductsSlider} ref={gridRef}>
                {imagesArray.map((image, index) => (
                    <ProducItem key={index} image={image} />
                ))}
            </div>
        </div>
    );
}
