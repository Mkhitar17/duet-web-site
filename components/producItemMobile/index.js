import styles from "./index.module.css";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

export default function ProducItemMobile({ image, id, size, product }) {
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();
    const isSVG = typeof image === "string" && image.startsWith("<svg");

    const handleClick = () => {
        if (product) {
            router.push(`/product/${id}`);
        }
    };
    return (
        <div
            className={styles.Container}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick} 
        >
            <div className={styles.ProductImageContainer}>
                <div className={styles.DefaultCircle} />
                
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
                        className={`${styles.ProductImage}`}
                    />
                )}
            </div>
        </div>
    );
}

