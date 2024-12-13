import { useState, useRef, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import styles from "./index.module.css";
import ProductItem from "@/components/productItem";
import SectionHeadline from "@/components/sectionHeadline";

const LOCALIZED_TEXT = {
  arm: {
    title: "Արտադրանք",
    noProducts: "Ապրանքներ չկան",
  },
  ru: {
    title: "Продукция",
    noProducts: "Товары отсутствуют",
  },
  en: {
    title: "Products",
    noProducts: "No products available",
  },
};

export default function ProducTionSection() {
  const gridRef = useRef(null);
  const productionData = useSelector((state) => state.publicData.data?.pageData?.production);
  const locale = useSelector((state) => state.language.locale);
  const [paddingLeft, setPaddingLeft] = useState("71px");

  const productsArray = useMemo(() => {
    if (!productionData) return [];

    return [
      ...(productionData.coffee || []).map((item) => ({
        image: item.image,
        id: item._id,
        size: item.size,
      })),
      ...(productionData.tea || []).map((item) => ({
        image: item.image,
        id: item._id,
        size: item.size,
      })),
      ...(productionData.milkCoffee || []).map((item) => ({
        image: item.image,
        id: item._id,
        size: item.size,
      })),
    ];
  }, [productionData]);

  useEffect(() => {
    const updatePadding = () => {
      if (window.innerWidth < 900) {
        setPaddingLeft("16px");
      } else {
        setPaddingLeft("71px");
      }
    };

    updatePadding();
    window.addEventListener("resize", updatePadding);
    return () => window.removeEventListener("resize", updatePadding);
  }, []);

  // Анимация при скролле
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.Active);
          } else {
            entry.target.classList.remove(styles.Active);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = gridRef.current?.querySelectorAll(`.${styles.Animated}`);
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className={styles.Container}>
      <SectionHeadline
        title={LOCALIZED_TEXT[locale]?.title || LOCALIZED_TEXT.arm.title}
        gridRef={gridRef}
        scrollAmount={300}
        customStyles={{ paddingLeft }}
      />
      <div className={styles.ProductsSlider} ref={gridRef}>
        {productsArray.length > 0 ? (
          productsArray.map((product, index) => (
            <div className={`${styles.Animated} ${styles.ProductItem}`} key={index}>
              <ProductItem
                image={product.image}
                id={product.id}
                size={product.size}
                locale={locale}
              />
            </div>
          ))
        ) : (
          <div className={styles.NoData}>
            {LOCALIZED_TEXT[locale]?.noProducts || LOCALIZED_TEXT.arm.noProducts}
          </div>
        )}
      </div>
    </div>
  );
}
