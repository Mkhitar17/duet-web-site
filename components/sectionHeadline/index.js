import styles from "./index.module.css";
import Image from "next/image";
import prev from "@/public/prev.svg";
import next from "@/public/NextIcon.svg";

export default function SectionHeadline({ title, gridRef, scrollAmount, customStyles = {}, showIcons = true }) {
    const scrollLeft = () => {
        if (gridRef?.current) {
            gridRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (gridRef?.current) {
            gridRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <div className={styles.Container} style={customStyles}>
            <span className={styles.Title}>{title}</span>
            {showIcons && ( // Conditionally render icons
                <div className={styles.NavigationIcons}>
                    <Image
                        onClick={scrollLeft}
                        src={prev}
                        alt="Prev"
                        width={0}
                        height={0}
                    />
                    <Image
                        onClick={scrollRight}
                        src={next}
                        alt="Next"
                        width={0}
                        height={0}
                    />
                </div>
            )}
        </div>
    );
}
