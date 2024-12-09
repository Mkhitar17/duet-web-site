import { useSelector } from "react-redux";
import styles from "./index.module.css";
import SectionHeadline from "@/components/sectionHeadline";

import Image from "next/image";



export default function ProducTionSection() {
    const pageData = useSelector((state) => state.publicData.data);

    const section1 = pageData?.pageData.about?.section1;
    const section2 = pageData?.pageData.about?.section2;
    const smallImages = pageData?.pageData.about?.section2?.smallImages || [];

    return (
        <div className={styles.Container}>
            <div className={styles.ContentContainer}>
                <SectionHeadline
                    title="Մեր մասին"
                    showIcons={false}
                />
                <div className={styles.InfoSectionsCopntainer}>
                    <div className={styles.SectionContainer}>
                        <div className={styles.TextContainer}>
                            <span>{section1?.text || "Տվյալները հասանելի չեն"}</span>
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
                                {section2?.image && (
                                    <Image
                                        src={section2.image}
                                        width={1000}
                                        height={1000}
                                        className={styles.Image}
                                        alt="Section 2 Image"
                                    />
                                )}
                            </div>
                            <div className={styles.SmallImagesContainer}>
                                {smallImages.length > 0 ? (
                                    smallImages.map((image, index) => (
                                        <div className={styles.smallImageContainer} key={index}>
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
                                    <span>Տվյալները հասանելի չեն</span>
                                )}

                            </div>
                        </div>
                        <div className={styles.TextContainer2}>
                            <span>{section2?.text || "Տվյալները հասանելի չեն"}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
