import styles from "./index.module.css";
import Image from "next/image";
import tel from "@/public/contact.svg";
import fb from "@/public/facebook.svg";
import insta from "@/public/instagram.svg";
import mail from "@/public/mail.svg";
import location from "@/public/location.svg";
import SectionHeadline from "@/components/sectionHeadline";
import Button from "@/components/buttons/PrimaryButton";

export default function ContactSection() {

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
        alert("Button Active!")
    };
    const handleSubmitButton = (e) => {
        e.preventDefault()
        alert("Button Active!")
    }
    return (
        <div className={styles.Container}>
            <SectionHeadline
                title="կապ մեզ հետ"
                showIcons={false}
                customStyles={{
                    justifyContent: "flex-start",
                    paddingLeft: "71px",
                }}

            />
            <div className={styles.ContactContentContainer}>
                <div className={styles.ContactInfoContainer}>
                    <div className={styles.ContactItems}>
                        <div className={styles.SocialContacts}>
                            <div className={styles.PhoneNumberContainer}>
                                <Image src={tel} width={24} height={24} alt="Phone" />
                                <span >098 604406</span>
                            </div>
                            <div className={styles.SocialIcons}>
                                <Image src={fb} width={24} height={24} alt="Facebook" />
                                <Image src={insta} width={24} height={24} alt="Instagram" />
                            </div>
                        </div>
                        <div className={styles.EmailContainer}>
                            <Image src={mail} width={24} height={24} alt="Mail" />
                            <span >duet.coffee@gmail.com</span>
                        </div>
                        <div className={styles.LocationContainer}>
                            <Image src={location} width={24} height={24} alt="Location" />
                            <span >
                                Հաղթանակ թաղամաս, 1 փողոց 48 շինություն
                            </span>
                        </div>

                    </div>

                    <div className={styles.MapContainer}>
                        <iframe
                            src="https://yandex.ru/map-widget/v1/?ll=44.421818%2C40.196547&z=15&l=map&pt=44.421818,40.196547,pm2rdm"
                            width="100%"
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
                        <textarea placeholder="Message"></textarea>
                        <Button
                            type="submit"
                            text="Ուղարկել"
                            customStyles={{ maxWidth: "255px" }}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}
