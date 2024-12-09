import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";
import { fetchProductById } from "@/redux/slices/publicDataSlice";
import styles from "./index.module.css";

const ProductionItemPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { product, productLoading, productError } = useSelector(
    (state) => state.publicData
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  if (productLoading) return <div className={styles.Loading}>Loading...</div>;
  if (productError) return <div className={styles.Error}>{productError}</div>;
  if (!product) return <div className={styles.Error}>Item not found</div>;

  return (
    <div className={styles.Container}>
      <div className={styles.ImageContainer}>
        <div className={styles.DefaultCircle} />
        <Image
          src={product.image}
          alt="Product"
          width={325}
          height={410}
          className={styles.productImage}
        />
      </div>

      <div className={styles.TextContainer}>
        <div className={styles.HeadlineContainer}>
          <span>{product.name}</span>
          <span>{product.size}</span>
        </div>

        <div className={styles.DescriptionContainer}>
          <span>
            {product.description}
          </span>

        </div>
      </div>

    </div>
  );
};

export default ProductionItemPage;
