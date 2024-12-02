import Link from "next/link";
import styles from "./index.module.css";
import Image from "next/image";
import ProducItem from "@/components/producItem";

// import dexc from "@/public/products/dexc.png";
// import kapuyt from "@/public/products/kapuyt.png";
// import kat from "@/public/products/kat.png";
// import limon from "@/public/products/limon-shish.png";
import aboutImage from "@/public/aboutUs/aboutImage.png";
import prev from '@/public/prev.svg'
import next from '@/public/NextIcon.svg'

import Button from "@/components/buttons/PrimaryButton";


import SectionHeadline from "@/components/sectionHeadline";





export default function About() {

    const handleClick = () => {
        alert("Button clicked!");
    };


    return (
        <div className={styles.Container}>
            <SectionHeadline
                title="Մեր մասին"
                showIcons={false}
                customStyles={{
                    justifyContent: "flex-start",
                }}

            />
            <div className={styles.ContentContainer}>
                <div className={styles.TextContainer}>
                    <span>
                        «DUET COMPANY»-ն հիմնադրվել է 2007 թվականին: Ընկերությունը զբաղվում է
                        սառը սուրճի, սառը թեյի արտադրությամբ եւ իրացմամբ:
                        «DUET» ապրանքանիշի հիմնադիրը մի քանի տարի ուսումնասիրել է
                        շուկայի պահանջները, նախասիրությունները և մշակել է
                        զարգացման բանաձև, որը տվել է սպասվելիք արդյունք:
                    </span>
                    <Button
                        text="Տեսնել ավելին"
                        onClick={handleClick}
                        customStyles={{ maxWidth: "255px" }}
                    />

                </div>

                <div className={styles.ImageContainer}>

                    <Image
                        src={aboutImage}
                        width={0}
                        height={0}
                        className={styles.AboutImage}

                    />
                </div>

            </div>

        </div>
    );
}