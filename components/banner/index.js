import { useMemo } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import styles from "./index.module.css";
import Button from "@/components/buttons/PrimaryButton";
import Swiper from '@/components/swiper';

export default function Banner() {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/production`);
  };

  const bannerData = useSelector((state) => state.publicData.data?.pageData?.banner);
  const locale = useSelector((state) => state.language.locale);
  const bannerSlides = useMemo(() => bannerData?.images || [], [bannerData]);

  const bannerTexts = useMemo(() => {
    return bannerData?.texts?.[locale] || {
      primaryText: "",
      secondaryText: "",
    };
  }, [bannerData, locale]);

  const buttonText = useMemo(() => {
    switch (locale) {
      case "arm":
        return "Արտադրանք";
      case "ru":
        return "Продукция";
      case "en":
        return "Products";
      default:
        return "Արտադրանք";
    }
  }, [locale]);


  const counterContainerStyles = {
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    left: '16px',
    bottom: '26px',
    width: '100%'
  };

  const counterItemsStyles = {
    width: '21px',
    height: '21px',
    backgroundColor: 'rgba(217, 217, 217, 0.5)',
    opacity: '1',
    borderRadius: '50%',
  };

  const activeCounterItemStyles = {
    backgroundColor: 'rgba(217, 217, 217, 0.5)',
    opacity: '1',
    width: '28px',
    height: '28px',
  };


  return (
    <div className={styles.Container}>
      <div className={styles.Overlay}></div>
      <Swiper
        loop={true}
        slides={bannerSlides}
        counter={true}
        counterContainerStyles={counterContainerStyles}
        counterItemsStyles={counterItemsStyles}
        activeCounterItemStyles={activeCounterItemStyles}
        autoSwipeDelay={5000}
      />
      <div className={styles.BannerTextContainer}>
        <span>{bannerTexts.primaryText}</span>
        <span>{bannerTexts.secondaryText}</span>
        <Button
          text={buttonText}
          onClick={handleClick}
          customStyles={{ pointerEvents: 'all' }}
        />
      </div>
    </div>
  );
}