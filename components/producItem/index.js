
import styles from "./index.module.css";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function ProducItem({ image }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={styles.Container}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={styles.ProductImageContainer}>
                <div className={`${styles.CircleBackground } ${isHovered ? styles.ShowCircle : ""}`} />
                <div className={styles.DefaultCircle} />
                <Image
                    src={image}
                    alt="Product Image"
                    width={1000}
                    height={1000}
                    className={`${styles.ProductImage} ${isHovered ? styles.HoveredImage : ""}`}
                />
            </div>
            {isHovered && (
                <div className={styles.HoverContent}>
                    <span className={styles.HoverText}>200մլ</span>
                    <Link href="/production" className={styles.HoverButton}>Տեսնել ավելին</Link>
                </div>
            )}
        </div>
    );
}
