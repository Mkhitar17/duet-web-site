import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import Image from "next/image";
import Link from "next/link";

export default function ProductItem({ image, id, size, product }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const isSVG = typeof image === "string" && image.startsWith("<svg");
    const router = useRouter();



    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 1440);
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    const handleClick = () => {
        if (isMobile) {
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
                <div className={`${styles.CircleBackground} ${isHovered ? styles.ShowCircle : ""}`} />
                <div className={styles.DefaultCircle} />

                {isSVG ? (
                    <div
                        className={`${styles.SVGContainer} ${isHovered ? styles.HoveredImage : ""}`}
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

            {isHovered && product && (
                <div className={styles.HoverContent}>
                    <span className={styles.HoverText}>
                        {size.match(/\d+/) ? `${size.match(/\d+/)[0]}մլ` : ""}
                    </span>
                    <Link href={`/product/${id}`} className={styles.HoverButton}>
                        Տեսնել ավելին
                    </Link>
                </div>
            )}
        </div>
    );
}

