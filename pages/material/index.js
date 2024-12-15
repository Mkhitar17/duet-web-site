import { useState, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import styles from "./index.module.css";
import Image from "next/image";
import ProductItem from "@/components/productItem";
import ProducItemMobile from "@/components/producItemMobile";
import SectionHeadline from "@/components/sectionHeadline";
import Button from "@/components/buttons/PrimaryButton";
import OrderModal from "@/components/orderModal"


const LOCALIZED_TEXT = {
    arm: {
        title: "Հումք",
        buttonText: "Պատվիրել հիմա",
        noData: "Տվյալները հասանելի չեն",
    },
    ru: {
        title: "Сырье",
        buttonText: "Заказать сейчас",
        noData: "Данные недоступны",
    },
    en: {
        title: "Material",
        buttonText: "Order Now",
        noData: "Data not available",
    },
};

export default function Material() {

    const materialData = useSelector((state) => state.publicData.data?.pageData?.material);
    const locale = useSelector((state) => state.language.locale);
    const materialItems = useMemo(() => materialData?.materialItems || [], [materialData]);


    const localizedText = useMemo(() => LOCALIZED_TEXT[locale] || LOCALIZED_TEXT.arm, [locale]);

    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles.Container}>
            <div className={styles.ContentContainer}>
                <SectionHeadline
                    title={localizedText.title}
                    showIcons={false}
                />
                <div className={styles.SectionContainer}>
                    <div className={styles.TextContainer}>
                        <span>{materialData?.texts?.[locale] || localizedText.noData}</span>
                        <Button
                            text={localizedText.buttonText}
                            onClick={handleClick}
                            customStyles={{ maxWidth: "255px" }}
                        />
                    </div>

                    <div className={styles.ImageContainer}>
                        {materialData?.materialImage && (
                            <Image
                                loading="lazy"
                                src={materialData.materialImage}
                                width={1000}
                                height={1000}
                                className={styles.Image}
                                alt="Material Image"
                            />
                        )}
                    </div>
                </div>
                <div className={styles.ProductsContainer}>
                    {materialItems.map((item, index) => (
                        <div key={index}>
                            <ProductItem locale={locale} image={item.image} id={item._id} size={item.size} />

                        </div>
                    ))}
                </div>
                <div className={styles.ProductsContainerMobile}>
                    {materialItems.map((item, index) => (
                        <div key={index} className={styles.ProductWrapper} >
                            <ProducItemMobile locale={locale} image={item.image} id={item._id} size={item.size} />
                        </div>
                    ))}
                </div>
            </div>
            {isModalOpen && (
                <OrderModal onClose={closeModal} locale={locale} />
            )}
        </div>
    );
}
