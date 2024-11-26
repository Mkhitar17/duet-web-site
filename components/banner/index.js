import Link from "next/link";
import styles from "./index.module.css";
import Image from "next/image";
import Button from "@/components/buttons/PrimaryButton";

import bannerimage from "@/public/banner.png";



export default function Header() {

  const handleClick = () => {
    alert("Button clicked!");
  };



  return (
    <div className={styles.Container}>
      <Image
        src={bannerimage} // Path to the image in the public folder
        alt="bannerimage"
        width={0} // Width of the image
        height={0} // Height of the image
        className={styles.BannerImage} // Optional: Apply a CSS class
      />

      <div className={styles.BannerTextContainer}>
        <span>Բարի Գալուստ</span>
        <span>DUET երբ յուրաքանչյուր վայրկյանն իր հետ բերում է նոր հնարավորություններ</span>
        <div className={styles.bannerBotton}></div>
        <Button
        text="Click Me"
        onClick={handleClick}
      />
      </div>
    </div>
  );
}