import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import Image from "next/image";
import Link from "next/link";

const LOCALIZED_TEXT = {
  arm: {
    seeMore: "Տեսնել ավելին",
    sizeUnit: "մլ",
  },
  ru: {
    seeMore: "Подробнее",
    sizeUnit: "мл",
  },
  en: {
    seeMore: "See More",
    sizeUnit: "ml",
  },
};

export default function ProductItem({ image, id, size, product, locale }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef(null);
  const isSVG = typeof image === "string" && image.startsWith("<svg");
  const router = useRouter();

  useEffect(() => {

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, []);

  const handleClick = () => {
    setIsHovered(!isHovered);
  };

  return (
    <div
      className={`${styles.Container} ${isVisible ? styles.Visible : ""}`} // Добавляем класс анимации
      ref={itemRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className={styles.ProductImageContainer}>
        <div
          className={`${styles.CircleBackground} ${isHovered ? styles.ShowCircle : ""
            }`}
        />
        <div
          className={`${styles.DefaultCircle} ${isHovered ? styles.HoveredCircle : ""
            }`}
        />
        {isSVG ? (
          <div
            className={`${styles.SVGContainer} ${isHovered ? styles.HoveredImage : ""
              }`}
            dangerouslySetInnerHTML={{ __html: image }}
          />
        ) : (
          <Image
            loading="lazy"
            src={image}
            alt="Product Image"
            width={1000}
            height={1000}
            className={`${styles.ProductImage} ${isHovered ? styles.HoveredImage : ""}`}
            unoptimized
          />
        )}
      </div>

      {isHovered && (
        <div className={styles.HoverContent}>
          <span className={styles.HoverText}>
            {size.match(/\d+/)
              ? `${size.match(/\d+/)[0]}${LOCALIZED_TEXT[locale]?.sizeUnit ||
              LOCALIZED_TEXT.arm.sizeUnit
              }`
              : ""}
          </span>
          <Link href={`/product/${id}`} className={styles.HoverButton}>
            {LOCALIZED_TEXT[locale]?.seeMore || LOCALIZED_TEXT.arm.seeMore}
          </Link>
        </div>
      )}
    </div>
  );
}
