import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import styles from "./index.module.css";
import SectionHeadline from "@/components/sectionHeadline";
import Image from "next/image";

const LOCALIZED_TEXTS = {
    arm: {
        title: "Մեր մասին",
        noData: "Տվյալները հասանելի չեն",
    },
    ru: {
        title: "О нас",
        noData: "Данные недоступны",
    },
    en: {
        title: "About Us",
        noData: "Data is unavailable",
    },
};

export default function ProducTionSection() {
    const pageData = useSelector((state) => state.publicData.data);
    const locale = useSelector((state) => state.language.locale);

    const section1 = pageData?.pageData.about?.section1;
    const section2 = pageData?.pageData.about?.section2;
    const smallImages = pageData?.pageData.about?.section2?.smallImages || [];

    const [largeImage, setLargeImage] = useState(section2?.image); 

    const localizedTexts = useMemo(() => LOCALIZED_TEXTS[locale] || LOCALIZED_TEXTS.arm, [locale]);

    const handleImageClick = (image) => {
        setLargeImage(image); 
    };

    return (
        <div className={styles.Container}>
            <div className={styles.ContentContainer}>
                <SectionHeadline title={localizedTexts.title} showIcons={false} />
                <div className={styles.InfoSectionsContainer}>
                    <div className={styles.SectionContainer}>
                        <div className={styles.TextContainer}>
                            <span>{section1?.texts?.[locale] || localizedTexts.noData}</span>
                        </div>
                        <div className={styles.ImageContainer}>
                            {section1?.image && (
                                <Image
                                    src={section1.image}
                                    width={1000}
                                    height={1000}
                                    className={styles.Image}
                                    alt="Section 1 Image"
                                />
                            )}
                        </div>
                    </div>

                    <div className={styles.SectionContainer2}>
                        <div className={styles.ImagesContent}>
                            <div className={styles.ImageContainer}>
                                {largeImage && (
                                    <Image
                                        src={largeImage} 
                                        width={1000}
                                        height={1000}
                                        className={styles.Image}
                                        alt="Large Image"
                                    />
                                )}
                            </div>
                            <div className={styles.SmallImagesContainer}>
                                {smallImages.length > 0 ? (
                                    smallImages.map((image, index) => (
                                        <div
                                            className={styles.smallImageContainer}
                                            key={index}
                                            onClick={() => handleImageClick(image)} 
                                        >
                                            <Image
                                                src={image}
                                                width={200}
                                                height={200}
                                                className={styles.SmallImage}
                                                alt={`Small Image ${index + 1}`}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <span>{localizedTexts.noData}</span>
                                )}
                            </div>
                        </div>
                        <div className={styles.TextContainer2}>
                            <span>{section2?.texts?.[locale] || localizedTexts.noData}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
