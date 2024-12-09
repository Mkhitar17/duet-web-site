import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import Image from "next/image";
import aboutImage from "@/public/aboutUs/aboutImage.png";
import Button from "@/components/buttons/PrimaryButton";
import SectionHeadline from "@/components/sectionHeadline";


export default function About() {
    const pageData = useSelector((state) => state.publicData.data);
    const router = useRouter();

    const handleClick = () => {
        router.push("/about");
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
                        {pageData?.pageData.about?.section1?.text || "Տվյալները հասանելի չեն"}
                    </span>
                    <Button
                        text="Տեսնել ավելին"
                        onClick={handleClick}
                        customStyles={{ maxWidth: "255px" }}
                    />
                </div>
                <div className={styles.ImageContainer}>
                    <Image
                        src={pageData?.pageData.about?.section1?.image}
                        width={1000}
                        height={1000}
                        className={styles.AboutImage}

                    />
                </div>
            </div>
        </div>
    );
}