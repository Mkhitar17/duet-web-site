import { useState, useRef } from "react";
import styles from "./index.module.css";
import Image from "next/image";
import ProducItem from "@/components/producItem";
import SectionHeadline from "@/components/sectionHeadline";
import limon from "@/public/products/limon-shish.png";
import materialImage from "@/public/materialImage.png";
import Button from "@/components/buttons/PrimaryButton";
import OrderModal from "@/components/orderModal"


export default function Material() {

    const [activeTab, setActiveTab] = useState(0);
    const activeItems = [limon, limon, limon, limon, limon];

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
                        <span>
                            «DUET COMPANY»-ն հիմնադրվել է 2007 թվականին:
                            Ընկերությունը զբաղվում է սառը սուրճի, սառը թեյի
                            արտադրությամբ եւ իրացմամբ: «DUET» ապրանքանիշի հիմնադիրը
                            մի քանի տարի ուսումնասիրել է շուկայի պահանջները, նախասիրությունները
                            և մշակել է զարգացման բանաձև, որը տվել է սպասվելիք արդյունք:
                            «DUET»-ի արտադրանքը շուրջ տասնմեկ տարի է,
                            ինչ գոյություն ունի սառը սուրճի, սառը թեյի
                            արտադրության շուկայում և չունի իր նմանատիպը:
                        </span>

                        <Button
                            text="Պատվիրել հիմա"
                            onClick={handleClick}
                            customStyles={{ maxWidth: "255px" }}
                        />
                    </div>

                    <div className={styles.ImageContainer}>
                        <Image
                            src={materialImage}
                            width={0}
                            height={0}
                            className={styles.Image}
                            alt="image"
                        />
                    </div>
                </div>
                <div className={styles.ProductsContainer}>
                    {activeItems.map((image, index) => (
                        <div key={index} >
                            <ProducItem image={image} />
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
