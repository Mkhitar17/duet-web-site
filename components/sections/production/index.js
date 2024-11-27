import Link from "next/link";
import styles from "./index.module.css";
import Image from "next/image";
import ProducItem from "@/components/producItem";

import dexc from "@/public/products/dexc.png";
import kapuyt from "@/public/products/kapuyt.png";
import kat from "@/public/products/kat.png";
import limon from "@/public/products/limon-shish.png";
import sev from "@/public/products/sev.png";



export default function ProducTionSection() {

    const imagesArray = [dexc, kapuyt, kat, limon, sev]


    return (
        <div className={styles.Container}>
            <div className={styles.ProductsSlider}>
                {imagesArray.map((image, index) => (
                    <div  key={index}>
                    <ProducItem image={image} /> 
                    </div>
                ))}
            </div>
        </div>
    );
}