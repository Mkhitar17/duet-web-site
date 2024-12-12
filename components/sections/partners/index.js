import { useRef, useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import SectionHeadline from "@/components/sectionHeadline";
import PartnerItem from "@/components/partnerItem";
import styles from "./index.module.css";

const LOCALIZED_TITLES = {
    arm: "Գործընկերներ",
    ru: "Партнеры",
    en: "Partners",
};

export default function PartnersSection() {
    const gridRef = useRef(null);
    const containerRef = useRef(null);
    const [paddingLeft, setPaddingLeft] = useState("71px");
    const partners = useSelector((state) => state.publicData.data?.pageData?.partners || []);
    const locale = useSelector((state) => state.language.locale);

    const partnersArray = useMemo(() => {
        return partners.map((partner, index) => ({
            id: index,
            logo: partner,
        }));
    }, [partners]);

    const title = useMemo(() => LOCALIZED_TITLES[locale] || LOCALIZED_TITLES.arm, [locale]);

    useEffect(() => {
        const updatePadding = () => {
            if (window.innerWidth < 900) {
                setPaddingLeft("16px");
            } else {
                setPaddingLeft("71px");
            }
        };

        updatePadding();

        window.addEventListener("resize", updatePadding);

        return () => window.removeEventListener("resize", updatePadding);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.Active);
                    } else {
                        entry.target.classList.remove(styles.Active);
                    }
                });
            },
            { threshold: 0.1 }
        );
    
        const elements = containerRef.current?.querySelectorAll(`.${styles.Animated}`);
        elements?.forEach((el) => observer.observe(el));
    
        return () => {
            elements?.forEach((el) => observer.unobserve(el));
        };
    }, []);
    

    return (
        <div className={styles.Container} ref={containerRef}>
            <SectionHeadline
                title={title}
                gridRef={gridRef}
                scrollAmount={300}
                customStyles={{ paddingLeft }}
            />
            <div className={styles.PartnersGrid} ref={gridRef}>
                {partnersArray.map((partner) => (
                    <PartnerItem key={partner.id} logo={partner.logo} className={styles.Animated} />
                ))}
            </div>
        </div>
    );
}