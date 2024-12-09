import { useState, useRef, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import styles from "./index.module.css";
import ProductItem from "@/components/productItem";
import SectionHeadline from "@/components/sectionHeadline";

export default function ProducTionSection() {
  const gridRef = useRef(null);
  const productionData = useSelector((state) => state.publicData.data?.pageData?.production);
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
      if (window.innerWidth < 1440) {
        setPaddingLeft("16px");
      } else {
        setPaddingLeft("71px");
      }
    };

    updatePadding();
    window.addEventListener("resize", updatePadding);
    return () => window.removeEventListener("resize", updatePadding);
  }, []);


  return (
    <div className={styles.Container}>
      <SectionHeadline
        title="Արտադրանք"
        gridRef={gridRef}
        scrollAmount={300}
        customStyles={{ paddingLeft }}


      />
      <div className={styles.ProductsSlider} ref={gridRef}>
         {productsArray.length > 0 ? (
          productsArray.map((product, index) => (
            <ProductItem
              key={index}
              image={product.image}
              id={product.id}
              size={product.size}
              product={true}
            />
          ))
        ) : (
          <div className={styles.NoData}>No products available</div>
        )}
      </div>
    </div>
  );
}
