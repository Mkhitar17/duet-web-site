import { useState, useRef } from "react";
import styles from "./index.module.css";
import Image from "next/image";
import ProducItem from "@/components/producItem";
import ProducItemMobile from "@/components/producItemMobile";
import dexc from "@/public/products/dexc.png";
import kat from "@/public/products/kat.png";
import limon from "@/public/products/limon-shish.png";
import sevDuet from "@/public/products/sevduet.png";



export default function ProducTionSection() {

    const [activeTab, setActiveTab] = useState(0);

    const tabData = [
        {
            name: "Սուրճ",
            items: [
                "https://i.imgur.com/D1mwBlM.png",
                "https://i.imgur.com/pkLpCwl.png",
                "https://i.imgur.com/kxF5fq3.png",
                "https://i.imgur.com/wfjyMnX.png",
                "https://i.imgur.com/wfjyMnX.png",
                "https://i.imgur.com/wfjyMnX.png"
            ],
        },
        {
            name: "Թեյ",
            items: [
                "https://i.imgur.com/h3rqtzD.png",
                "https://i.imgur.com/h3rqtzD.png",
                "https://i.imgur.com/h3rqtzD.png",
                "https://i.imgur.com/h3rqtzD.png",
                "https://i.imgur.com/TVJY3Yf.png",
                "https://i.imgur.com/TVJY3Yf.png"
            ],
        },
        {
            name: "Կաթնային սուրճ",
            items: [
                "https://i.imgur.com/DZXG0FV.png",
                "https://i.imgur.com/kxF5fq3.png",
                "https://i.imgur.com/pkLpCwl.png",
                "https://i.imgur.com/DZXG0FV.png",
                "https://i.imgur.com/8DOu99a.png",
                "https://i.imgur.com/h3rqtzD.png"
            ],
        },
    ];


    const activeItems = tabData[activeTab].items;
    return (
        <div className={styles.Container}>
            <div className={styles.ContentContainer}>
                <div className={styles.ProductionTabsContainer}>
                    <div className={styles.Tabs}>
                        {tabData.map((tab, index) => (
                            <div
                                key={index}
                                className={`${styles.tab} ${activeTab === index ? styles.activeTab : ""
                                    }`}
                                onClick={() => setActiveTab(index)}
                            >
                                <span>{tab.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.ProductsContainer}>
                    {activeItems.map((image, index) => (
                        <div key={index} >
                            <ProducItem image={image} />
                        </div>
                    ))}
                </div>

                <div className={styles.ProductsContainerMobile}>
                    {activeItems.map((image, index) => (
                        <div key={index} >
                            <ProducItemMobile image={image} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
