import { useState, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import styles from "./index.module.css";
import ProductItem from "@/components/productItem";
import ProducItemMobile from "@/components/producItemMobile";

export default function ProducTionSection() {

    const [activeTab, setActiveTab] = useState(0);
    const productionData = useSelector((state) => state.publicData.data?.pageData?.production);
    const tabData = useMemo(() => {
        if (!productionData) return [];

        return [
            {
                name: "Սուրճ",
                items: productionData.coffee
                    ? productionData.coffee.map((item) => ({
                        image: item.image,
                        id: item._id,
                        size: item.size,
                    }))
                    : [],
            },
            {
                name: "Թեյ",
                items: productionData.tea
                    ? productionData.tea.map((item) => ({
                        image: item.image,
                        id: item._id,
                        size: item.size,
                    }))
                    : [],
            },
            {
                name: "Կաթնային սուրճ",
                items: productionData.milkCoffee
                    ? productionData.milkCoffee.map((item) => ({
                        image: item.image,
                        id: item._id,
                        size: item.size,
                    }))
                    : [],
            },
        ];
    }, [productionData]);


    const activeItems = tabData?.[activeTab]?.items || [];
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
                    {activeItems.map((product, index) => (
                        <div key={index}>
                            <ProductItem image={product.image} id={product.id} size={product.size} product={true} />
                        </div>
                    ))}
                </div>

                <div className={styles.ProductsContainerMobile}>
                    {activeItems.map((product, index) => (
                        <div key={index} >
                            <ProducItemMobile image={product.image} id={product.id} size={product.size} product={true} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
