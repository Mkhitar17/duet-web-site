  import { useState } from "react";
  import Link from "next/link";
  import styles from "./layout.module.css";
  import Image from "next/image";
  import DuetLogo from "@/public/logo.svg";
  // import ArmFlag from "@/public/armFlag.svg";
  // import RussianFlag from "@/public/russianFlag.svg.webp";
  // import AmericanFlag from "@/public/americanFlag.webp";

  export default function Header() {
    const flags = {
      arm: { src: '/armFlag.svg', alt: 'Armenian Flag' },
      rus: { src: '/russianFlag.svg.webp', alt: 'Russian Flag' },
      usa: { src: '/americanFlag.webp', alt: 'American Flag' },
    };
    const [selectedFlag, setSelectedFlag] = useState('arm');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);



    const toggleDropdown = () => {
      setIsDropdownOpen((prev) => !prev);
    };

    const handleFlagSelect = (flag) => {
      setSelectedFlag(flag);
      setIsDropdownOpen(false);
    };

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
        </div>

        
      </header>

      </>
    );
  }
