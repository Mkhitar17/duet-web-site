import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import styles from "./layout.module.css";
import Image from "next/image";
import DuetLogo from "@/public/logo.svg";
import BurgerMenu from "@/public/icons/burger-menu.svg";
import CloseMenu from "@/public/icons/close-menu.svg";
import { useSelector, useDispatch } from "react-redux";
import { setLocale } from "@/redux/slices/languageSlice";
import { FLAGS, NAV_ITEMS } from "@/constants/globalConstants";


export default function Header() {
  const dispatch = useDispatch();
  const locale = useSelector((state) => state.language.locale);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleFlagSelect = (flag) => {
    dispatch(setLocale(flag));
    setIsDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("noScroll");
    } else {
      document.body.classList.remove("noScroll");
    }

    return () => document.body.classList.remove("noScroll");
  }, [isMobileMenuOpen]);

  const availableFlags = useMemo(() => {
    return Object.keys(FLAGS).filter((key) => key !== locale);
  }, [locale]);

  // Use useMemo for navItems
  const navItems = useMemo(() => {
    return NAV_ITEMS[locale] || NAV_ITEMS.arm;
  }, [locale]);

  return (
    <header className={styles.Header}>
      <div className={styles.HeaderContent}>
        <Link href="/">
          <Image src={DuetLogo} width={0} height={0} className={styles.DuetLogo} alt="Duet Logo" />
        </Link>
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={styles.link}>
              {item.label}
            </Link>
          ))}
          <div className={styles.flagSelector}>
            <div className={styles.selectedFlag} onClick={toggleDropdown}>
              <Image src={FLAGS[locale].src} width={30} height={20} alt={FLAGS[locale].alt} />
            </div>
            {isDropdownOpen && (
              <div className={styles.flagContainer}>
                {availableFlags.map((flag) => (
                  <div key={flag} className={styles.flagOption} onClick={() => handleFlagSelect(flag)}>
                    <Image src={FLAGS[flag].src} width={30} height={20} alt={FLAGS[flag].alt} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </nav>
        <div className={styles.BurgerMenuContainer} onClick={toggleMobileMenu}>
          <Image
            src={isMobileMenuOpen ? CloseMenu : BurgerMenu}
            width={0}
            height={0}
            className={styles.BurgerMenuIcon}
            alt="Menu Toggle"
          />
        </div>
      </div>
      {isMobileMenuOpen && (<div className={styles.overlay} onClick={toggleMobileMenu}></div>)}
      <div className={`${styles.mobileDropdownMenu} ${isMobileMenuOpen ? styles.open : ""}`}>
        <div className={styles.MobileManuContent}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={styles.link}>
              {item.label}
            </Link>
          ))}
          <div className={styles.flagSelector}>
            <div className={styles.selectedFlag} onClick={toggleDropdown}>
              <Image
                src={FLAGS[locale].src}
                width={30}
                height={20}
                alt={FLAGS[locale].alt}
              />
            </div>
            {isDropdownOpen && (
              <div className={styles.flagContainer}>
                {availableFlags.map((flag) => (
                  <div key={flag} className={styles.flagOption} onClick={() => handleFlagSelect(flag)}>
                    <Image src={FLAGS[flag].src} width={30} height={20} alt={FLAGS[flag].alt} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
