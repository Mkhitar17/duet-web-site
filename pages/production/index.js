import { useState, useRef } from "react";
import styles from "./index.module.css";
import Image from "next/image";
import ProducItem from "@/components/producItem";
import dexc from "@/public/products/dexc.png";
import kat from "@/public/products/kat.png";
import limon from "@/public/products/limon-shish.png";
import sevDuet from "@/public/products/sevduet.png";



export default function ProducTionSection() {

    const [activeTab, setActiveTab] = useState(0);

    const tabData = [
        {
            name: "Սուրճ",
            items: [dexc, dexc, dexc, dexc, dexc, dexc],
        },
        {
            name: "Թեյ",
            items: [kat, limon, limon, limon, limon, limon],
        },
        {
            name: "Կաթնային սուրճ",
            items: [sevDuet, sevDuet, sevDuet, sevDuet, sevDuet, sevDuet],
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
            </div>
        </div>
    );
}
