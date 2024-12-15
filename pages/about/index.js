import { useSelector } from "react-redux";
import { useMemo, useState, useEffect } from "react";
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
    const section1 = useMemo(() => pageData?.pageData.about?.section1, [pageData]);
    const section2 = useMemo(() => pageData?.pageData.about?.section2, [pageData]);
    const initialLargeImage = useMemo(() => section2?.image || "", [section2]);
    const initialSmallImages = useMemo(() => section2?.smallImages || [], [section2]);

    const [largeImage, setLargeImage] = useState(initialLargeImage);
    const [smallImages, setSmallImages] = useState(initialSmallImages);


    useEffect(() => {
        if (section2?.image) {
            setLargeImage(section2.image);
        }
        if (section2?.smallImages) {
            setSmallImages(section2.smallImages);
        }
    }, [section2]);

    const localizedTexts = useMemo(() => LOCALIZED_TEXTS[locale] || LOCALIZED_TEXTS.arm, [locale]);

    const handleImageClick = (clickedImage, index) => {
        setLargeImage(clickedImage);
        setSmallImages((prevImages) => {
            const newImages = [...prevImages];
            newImages[index] = largeImage;
            return newImages;
        });
    };

    const renderedLargeImage = useMemo(() => largeImage, [largeImage, section2]);
    const renderedSmallImages = useMemo(() => smallImages, [smallImages, section2]);

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
                                    loading="lazy"
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
                                {renderedLargeImage && (
                                    <Image
                                        loading="lazy"
                                        key={renderedLargeImage}
                                        src={renderedLargeImage}
                                        width={1000}
                                        height={1000}
                                        className={styles.Image}
                                        alt="Large Image"
                                    />
                                )}
                            </div>
                            <div className={styles.SmallImagesContainer}>
                                {renderedSmallImages.length > 0 ? (
                                    renderedSmallImages.map((image, index) => (
                                        <div
                                            className={styles.smallImageContainer}
                                            key={index}
                                            onClick={() => handleImageClick(image, index)}
                                        >
                                            <Image
                                                loading="lazy"
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
