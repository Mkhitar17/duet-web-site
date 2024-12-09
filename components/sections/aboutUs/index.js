import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import Image from "next/image";
import aboutImage from "@/public/aboutUs/aboutImage.png";

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