import { useRef } from "react";
import SectionHeadline from "@/components/sectionHeadline";
import PartnerItem from "@/components/partnerItem";
import styles from "./index.module.css";
import DuetLogo from "@/public/duetLogo.svg";

export default function PartnersSection() {
    const gridRef = useRef(null);
    const array = new Array(17).fill(DuetLogo);

    return (
        <div className={styles.Container}>
            <SectionHeadline
                title="Գործընկերներ"
                gridRef={gridRef}
                scrollAmount={300} 
                customStyles={{
                    // paddingRight: "77px",
                    // paddingLeft: "64px",
                }}
            />
            <div className={styles.PartnersGrid} ref={gridRef}>
                {array.map((logo, index) => (
                    <PartnerItem key={index} logo={logo} />
                ))}
            </div>
        </div>
    );
}
