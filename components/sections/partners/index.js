import { useRef, useEffect, useState } from "react";
import SectionHeadline from "@/components/sectionHeadline";
import PartnerItem from "@/components/partnerItem";
import styles from "./index.module.css";
import DuetLogo from "@/public/duetLogo.svg";

export default function PartnersSection() {
    const gridRef = useRef(null);
    const array = new Array(17).fill(DuetLogo);
    const [paddingLeft, setPaddingLeft] = useState("71px");

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
                title="Գործընկերներ"
                gridRef={gridRef}
                scrollAmount={300}
                customStyles={{ paddingLeft }}
            />
            <div className={styles.PartnersGrid} ref={gridRef}>
                {array.map((logo, index) => (
                    <PartnerItem key={index} logo={logo} />
                ))}
            </div>
        </div>
    );
}
