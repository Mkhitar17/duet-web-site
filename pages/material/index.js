import { useState, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import styles from "./index.module.css";
import Image from "next/image";
import ProducItem from "@/components/productItem";
import ProducItemMobile from "@/components/producItemMobile";
import SectionHeadline from "@/components/sectionHeadline";
import limon from "@/public/products/limon-shish.png";
import materialImage from "@/public/materialImage.png";
import Button from "@/components/buttons/PrimaryButton";
import OrderModal from "@/components/orderModal"


export default function Material() {

    const [activeTab, setActiveTab] = useState(0);
    const activeItems = [limon, limon, limon, limon, limon];
    const materialData = useSelector((state) => state.publicData.data?.pageData?.material);

    const materialItems = useMemo(() => {
        return materialData?.materialItems || [];
    }, [materialData]);

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
                    title="Հումք"
                    showIcons={false}
                />
                <div className={styles.SectionContainer}>
                    <div className={styles.TextContainer}>
                        <span>{materialData?.text || "Տվյալները հասանելի չեն"}</span>
                        <Button
                            text="Պատվիրել հիմա"
                            onClick={handleClick}
                            customStyles={{ maxWidth: "255px" }}
                        />
                    </div>

                    <div className={styles.ImageContainer}>
                        {materialData?.materialImage && (
                            <Image
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
                    {materialItems.map((image, index) => (
                        <div key={index}>
                            <ProducItem image={image} product={false} />
                        </div>
                    ))}
                </div>
                <div className={styles.ProductsContainerMobile}>
                    {materialItems.map((image, index) => (
                        <div key={index}>
                            <ProducItemMobile image={image} product={false}/>
                        </div>
                    ))}
                </div>
            </div>
            {isModalOpen && (
                <OrderModal onClose={closeModal} />
            )}
        </div>
    );
}
