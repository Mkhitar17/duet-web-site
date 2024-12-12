import { useMemo, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import Image from "next/image";
import Button from "@/components/buttons/PrimaryButton";
import SectionHeadline from "@/components/sectionHeadline";

const LOCALIZED_TEXT = {
    arm: {
        title: "Մեր մասին",
        button: "Տեսնել ավելին",
        noData: "Տվյալները հասանելի չեն",
    },
    ru: {
        title: "О нас",
        button: "Подробнее",
        noData: "Данные недоступны",
    },
    en: {
        title: "About Us",
        button: "See More",
        noData: "Data is unavailable",
    },
};

export default function About() {
    const pageData = useSelector((state) => state.publicData.data);
    const locale = useSelector((state) => state.language.locale);
    const router = useRouter();
    const containerRef = useRef(null);

    const { title, button, noData } = useMemo(() => LOCALIZED_TEXT[locale] || LOCALIZED_TEXT.arm, [locale]);

    const handleClick = () => {
        router.push("/about");
    };

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
            <SectionHeadline title={title} showIcons={false} />
            <div className={`${styles.ContentContainer} ${styles.Animated}`}>
                <div className={`${styles.TextContainer} ${styles.Animated}`}>
                    <span>
                        {pageData?.pageData?.about?.section1?.texts?.[locale] || noData}
                    </span>
                    <Button
                        text={button}
                        onClick={handleClick}
                        customStyles={{ maxWidth: "255px" }}
                    />
                </div>
                <div className={`${styles.ImageContainer} ${styles.Animated}`}>
                    {pageData?.pageData?.about?.section1?.image ? (
                        <Image
                            src={pageData.pageData.about.section1.image}
                            width={1000}
                            height={1000}
                            className={styles.AboutImage}
                            alt={title}
                        />
                    ) : (
                        <span className={styles.NoImage}>{noData}</span>
                    )}
                </div>
            </div>
        </div>
    );
}