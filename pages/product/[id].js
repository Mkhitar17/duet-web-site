import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";
import { fetchProductById } from "@/redux/slices/publicDataSlice";
import styles from "./index.module.css";

const LOCALIZED_TEXTS = {
  arm: {
    notFound: "Տվյալները հասանելի չեն",
  },
  ru: {
    notFound: "Данные недоступны",
  },
  en: {
    notFound: "Data is unavailable",
  },
};


const ProductionItemPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { product, productLoading, productError } = useSelector((state) => state.publicData);
  const locale = useSelector((state) => state.language.locale);

  const localizedTexts = useMemo(() => LOCALIZED_TEXTS[locale] || LOCALIZED_TEXTS.arm, [locale]);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  if (productLoading) return <div className={styles.Loading}>Loading...</div>;
  if (productError) return <div className={styles.Error}>{productError}</div>;
  if (!product) return <div className={styles.Error}>{localizedTexts.notFound}</div>;

  return (
    <div className={styles.Container}>
      <div className={styles.ContentContainer}>
        <div className={styles.ImageContainer}>
          <div className={styles.DefaultCircle} />
          <Image
            src={product.image}
            alt={product.name?.[locale] || "Product"}
            width={1000}
            height={1000}
            className={styles.ProductImage}
          />
        </div>

        <div className={styles.TextContainer}>
          <div className={styles.HeadlineContainer}>
            <span className={styles.ProductName}>{product.name?.[locale] || localizedTexts.notFound}</span>
            <span className={styles.ProductSize}>{product.size}</span>
          </div>

          <div className={styles.DescriptionContainer}>
            <span>{product.description?.[locale] || localizedTexts.notFound}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionItemPage;
