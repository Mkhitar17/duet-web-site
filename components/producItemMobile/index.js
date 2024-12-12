import styles from "./index.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react"; 
import { useRouter } from "next/router";



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


export default function ProducItemMobile({ image, id, size, locale }) {
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();
    const isSVG = typeof image === "string" && image.startsWith("<svg");

    const handleClick = () => {
        setIsHovered(!isHovered)
    };
    return (
        <div
            className={styles.Container}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick} 
        >
            <div className={styles.ProductImageContainer}>
            <div className={`${styles.CircleBackground} ${isHovered ? styles.ShowCircle : ""}`} />
            <div className={`${styles.DefaultCircle} ${isHovered ? styles.HoveredCircle : ""}` }/>
                
                {isSVG ? (
                    <div
                        className={`${styles.SVGContainer} `}
                        dangerouslySetInnerHTML={{ __html: image }}
                    />
                ) : (
                    <Image
                        src={image}
                        alt="Product Image"
                        width={1000}
                        height={1000}
                        className={`${styles.ProductImage} ${isHovered ? styles.HoveredImage : ""}`}
                    />
                )}
            </div>

            {isHovered && (
                <div className={styles.HoverContent}>
                    <span className={styles.HoverText}>
                    {size.match(/\d+/) ? `${size.match(/\d+/)[0]}${LOCALIZED_TEXT[locale]?.sizeUnit || LOCALIZED_TEXT.arm.sizeUnit}` : ""}
                    </span>
                    <Link href={`/product/${id}`} className={styles.HoverButton}>
                    {LOCALIZED_TEXT[locale]?.seeMore || LOCALIZED_TEXT.arm.seeMore}
                    </Link>
                </div>
            )}
        </div>
    );
}

