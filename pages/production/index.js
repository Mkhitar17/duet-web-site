import { useState, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import styles from "./index.module.css";
import ProductItem from "@/components/productItem";
import ProducItemMobile from "@/components/producItemMobile";

const LOCALIZED_TABS = {
    arm: [
      { name: "Սուրճ" },
      { name: "Թեյ" },
      { name: "Կաթնային սուրճ" },
    ],
    ru: [
      { name: "Кофе" },
      { name: "Чай" },
      { name: "Кофе с молоком" },
    ],
    en: [
      { name: "Coffee" },
      { name: "Tea" },
      { name: "Milk Coffee" },
    ],
  };

export default function ProducTionSection() {

    const [activeTab, setActiveTab] = useState(0);
    const productionData = useSelector((state) => state.publicData.data?.pageData?.production);
    const locale = useSelector((state) => state.language.locale);

   const tabData = useMemo(() => {
    const localizedTabs = LOCALIZED_TABS[locale] || LOCALIZED_TABS.arm;

    if (!productionData) return [];

    return [
      {
        name: localizedTabs[0].name,
        items: productionData.coffee
          ? productionData.coffee.map((item) => ({
              image: item.image,
              id: item._id,
              size: item.size,
            }))
          : [],
      },
      {
        name: localizedTabs[1].name,
        items: productionData.tea
          ? productionData.tea.map((item) => ({
              image: item.image,
              id: item._id,
              size: item.size,
            }))
          : [],
      },
      {
        name: localizedTabs[2].name,
        items: productionData.milkCoffee
          ? productionData.milkCoffee.map((item) => ({
              image: item.image,
              id: item._id,
              size: item.size,
            }))
          : [],
      },
    ];
  }, [productionData, locale]);


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
                        <div key={index} >
                            <ProductItem locale={locale} image={product.image} id={product.id} size={product.size} />
                        </div>
                    ))}
                </div>

                <div className={styles.ProductsContainerMobile}>
                    {activeItems.map((product, index) => (
                        <div key={index} className={styles.ProductWrapper} >
                            <ProducItemMobile locale={locale} image={product.image} id={product.id} size={product.size} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
