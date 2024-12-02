import { useState, useRef } from "react";
import styles from "./index.module.css";
import SectionHeadline from "@/components/sectionHeadline";
import aboutImage from "@/public/aboutUs/aboutImage.png";

import image1 from "@/public/aboutUs/image1.png";
import image2 from "@/public/aboutUs/image2.png";
import image3 from "@/public/aboutUs/image3.png";
import image4 from "@/public/aboutUs/image4.png";
import Image from "next/image";



export default function ProducTionSection() {
    const imagesArray = [image1, image2, image3, image4]

    return (
        <div className={styles.Container}>
            <div className={styles.ContentContainer}>
                <SectionHeadline
                    title="Մեր մասին"
                    showIcons={false}
                />
                <div className={styles.InfoSectionsCopntainer}>
                    <div className={styles.SectionContainer}>
                        <div className={styles.TextContainer}>
                            <span>
                                «DUET COMPANY»-ն հիմնադրվել է 2007 թվականին:
                                Ընկերությունը զբաղվում է սառը սուրճի, սառը թեյի
                                արտադրությամբ եւ իրացմամբ: «DUET» ապրանքանիշի հիմնադիրը
                                մի քանի տարի ուսումնասիրել է շուկայի պահանջները, նախասիրությունները
                                և մշակել է զարգացման բանաձև, որը տվել է սպասվելիք արդյունք:
                                «DUET»-ի արտադրանքը շուրջ տասնմեկ տարի է,
                                ինչ գոյություն ունի սառը սուրճի, սառը թեյի
                                արտադրության շուկայում և չունի իր նմանատիպը:
                            </span>

                        </div>

                        <div className={styles.ImageContainer}>
                            <Image
                                src={aboutImage}
                                width={0}
                                height={0}
                                className={styles.Image}
                                alt="image"
                            />
                        </div>
                    </div>

                    <div className={styles.SectionContainer}>
                        <div className={styles.ImagesContent}>
                            <div className={styles.ImageContainer}>
                                <Image
                                    src={aboutImage}
                                    width={0}
                                    height={0}
                                    className={styles.Image}
                                    alt="image"
                                />
                            </div>
                            <div className={styles.SmallImagesContainer}>
                                {imagesArray.map((image, index) => (
                                    <div key={index}>
                                        <Image
                                            src={image}
                                            width={130}
                                            height={130}
                                            className={styles.SmallImage}
                                            alt="image"
                                        />

                                    </div>
                                ))}

                            </div>
                        </div>
                        <div className={styles.TextContainer2}>
                            <span>
                                Արտադրության մեջ օգտագործվող բոլոր բաղադրամասերը հավատարմագրված են ISO
                                18001 ստանդարտի համաձայն և անցել են փորձաքննություն սննդի անվտանգության կողմից,
                                իսկ ձեռնարկության որակի վերահսկողության բաժինն ապահովում է
                                արտադրանքի բարձր և կայուն որակը:
                                Մեր արտադրանքը անցել է ֆիզիկաքիմիական, մանրէաբանական և այլ փորձաքննություններ,
                                որի հիման վրա տրվել է համապատասխանության հայտարարագիր
                                (գրանցման համարը ՄՄ AM № 009/S.B-0028-2016):
                                «DUET»-ի արտադրանքը իրացվում է Հայաստանի Հանրապետության բոլոր
                                մարզերում՝ ցանցային, մեծածախ և մանրածախ սննդի առևտրով զբաղվող 2000 և
                                ավելի կետերում: Արտադրության մեջ օգտագործվող բոլոր բաղադրամասերը հավատարմագրված են
                                ISO 18001 ստանդարտի համաձայն և անցել են փորձաքննություն սննդի անվտանգության կողմից,
                                իսկ ձեռնարկության որակի վերահսկողության բաժինն ապահովում է արտադրանքի
                                բարձր և կայուն որակը:
                                ննդի առևտրով զբաղվող 2000 և ավելի կետերում:
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
