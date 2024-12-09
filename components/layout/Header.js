import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./layout.module.css";
import Image from "next/image";
import DuetLogo from "@/public/logo.svg";
import BurgerMenu from "@/public/icons/burger-menu.svg";
import CloseMenu from "@/public/icons/close-menu.svg";


export default function Header() {
  const flags = {
    arm: { src: '/armFlag.svg', alt: 'Armenian Flag' },
    rus: { src: '/russianFlag.svg.webp', alt: 'Russian Flag' },
    usa: { src: '/americanFlag.webp', alt: 'American Flag' },
  };
  const [selectedFlag, setSelectedFlag] = useState('arm');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);



  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleFlagSelect = (flag) => {
    setSelectedFlag(flag);
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

    // Cleanup on unmount
    return () => document.body.classList.remove(styles.noScroll);
  }, [isMobileMenuOpen]);
  const availableFlags = Object.keys(flags).filter((key) => key !== selectedFlag);
  return (
    <>

      <header className={styles.Header}>
        <div className={styles.HeaderContent}>
          <Link href="/" >
            <Image
              src={DuetLogo}
              width={0}
              height={0}
              className={styles.DuetLogo}
              alt="Duet Logo"
            />
          </Link>
          <nav className={styles.nav}>
            <Link href="/about" className={styles.link}>Մեր մասին</Link>
            <Link href="/production" className={styles.link}>Արտադրանք</Link>
            <Link href="/material" className={styles.link}>Հումք</Link>
            <Link href="/contact" className={styles.link}>Կապ մեզ հետ</Link>

            <div className={styles.flagSelector}>
              <div className={styles.selectedFlag} onClick={toggleDropdown}>
                <Image
                  src={flags[selectedFlag].src}
                  width={30}
                  height={20}
                  alt={flags[selectedFlag].alt}
                />
              </div>

              {isDropdownOpen && (
                <div className={styles.flagContainer}>
                  {availableFlags.map((flag) => (
                    <div
                      key={flag}
                      className={styles.flagOption}
                      onClick={() => handleFlagSelect(flag)}
                    >
                      <Image
                        src={flags[flag].src}
                        width={30}
                        height={20}
                        alt={flags[flag].alt}
                      />
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
              alt="Duet Logo"
            />
          </div>
        </div>
        {isMobileMenuOpen && (<div className={styles.overlay} onClick={toggleMobileMenu}></div>)}
        <div className={`${styles.mobileDropdownMenu} ${isMobileMenuOpen ? styles.open : ""}`}>
          <div className={styles.MobileManuContent}>
            <Link href="/about" className={styles.mobileLink} onClick={toggleMobileMenu}>
              Մեր մասին
            </Link>
            <Link href="/production" className={styles.mobileLink} onClick={toggleMobileMenu}>
              Արտադրանք
            </Link>
            <Link href="/material" className={styles.mobileLink} onClick={toggleMobileMenu}>
              Հումք
            </Link>
            <Link href="/contact" className={styles.mobileLink} onClick={toggleMobileMenu}>
              Կապ մեզ հետ
            </Link>

            <div className={styles.flagSelector}>
              <div className={styles.selectedFlag} onClick={toggleDropdown}>
                <Image
                  src={flags[selectedFlag].src}
                  width={30}
                  height={20}
                  alt={flags[selectedFlag].alt}
                />
              </div>

              {isDropdownOpen && (
                <div className={styles.flagContainer}>
                  {availableFlags.map((flag) => (
                    <div
                      key={flag}
                      className={styles.flagOption}
                      onClick={() => handleFlagSelect(flag)}
                    >
                      <Image
                        src={flags[flag].src}
                        width={30}
                        height={20}
                        alt={flags[flag].alt}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

    </>
  );
}
