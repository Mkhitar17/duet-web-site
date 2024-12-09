import { useRef, useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import SectionHeadline from "@/components/sectionHeadline";
import PartnerItem from "@/components/partnerItem";
import styles from "./index.module.css";
import DuetLogo from "@/public/duetLogo.svg";

export default function PartnersSection() {
    const gridRef = useRef(null);
    const array = new Array(17).fill(DuetLogo);
    const [paddingLeft, setPaddingLeft] = useState("71px");
    const partners = useSelector((state) => state.publicData.data?.pageData?.partners || []);

    const partnersArray = useMemo(() => {
        return partners.map((partner, index) => ({
            id: index,
            logo: partner,
        }));
    }, [partners]);

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
                {partnersArray.map((partner) => (
                    <PartnerItem key={partner.id} logo={partner.logo} />
                ))}
            </div>
        </div>
    );
}
