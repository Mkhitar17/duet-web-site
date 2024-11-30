import styles from "./index.module.css";
import Image from "next/image";
import tel from "@/public/contact.svg";
import fb from "@/public/facebook.svg";
import insta from "@/public/instagram.svg";
import mail from "@/public/mail.svg";
import location from "@/public/location.svg";

export default function ContactSection() {

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
    };
    const handleSubmitButton =(e)=>{
        e.preventDefault()
        alert("Button Active!")
    }
    return (
        <div className={styles.Container}>
            <div className={styles.contactSize}>
                <div className={styles.contactSize_df}>
                    <div className={styles.contactTelIconsText_styles}>
                        <div className={styles.contactTelIconsText}>
                            <Image src={tel} width={20} height={20} alt="Телефон" />
                            <p className={styles.contactTextStyle}>098 604406</p>
                        </div>
                        <div className={styles.contactIcons_fb_insta}>
                            <Image src={fb} width={24} height={24} alt="Facebook" />
                            <Image src={insta} width={24} height={24} alt="Instagram" />
                        </div>
                    </div>
                    <div className={styles.contactSizeMailStyles}>
                        <Image src={mail} width={24} height={24} alt="Почта" />
                        <p className={styles.contactTextStyle}>duet.coffee@gmail.com</p>
                    </div>
                    <div className={styles.contactSizeMailStyles}>
                        <Image src={location} width={24} height={24} alt="Локация" />
                        <p className={styles.contactTextStyle}>
                            Հաղթանակ թաղամաս, 1 փողոց 48 շինություն
                        </p>
                    </div>

                    <div className={styles.mapContainer}>
                        <iframe
                            src="https://yandex.ru/map-widget/v1/?ll=44.421818%2C40.196547&z=15&l=map&pt=44.421818,40.196547,pm2rdm"
                            width="90%"
                            height="240"
                            style={{ border: "none", borderRadius: "10px" }}
                            allowFullScreen
                            loading="lazy"
                        ></iframe>

                    </div>
                </div>

                <div className={styles.formContainer}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.inputRow}>
                            <input type="text" placeholder="First name" className={styles.inputField} />
                            <input type="text" placeholder="Last name" className={styles.inputField} />
                        </div>
                        <input type="email" placeholder="Mail" className={`${styles.inputField} ${styles.fullWidth}`} />
                        <textarea placeholder="Message" className={`${styles.inputField} ${styles.textarea}`}></textarea>
                        <button type="submit" onClick={handleSubmitButton} className={styles.submitButton}>Ուղարկել</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
