import { useState, useRef } from "react";
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

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted: ", formData);
        alert("Form Submitted Successfully!");
    };
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
                            <span > Հաղթանակ թաղամաս, 1 փողոց 48 շինություն</span>
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
                            <input
                                name="firstName" 
                                value={formData.firstName}
                                onChange={handleChange}
                                type="text"
                                placeholder="First name"
                                className={styles.inputField}
                            />
                            <input
                                name="lastName" 
                                value={formData.lastName}
                                onChange={handleChange}
                                type="text"
                                placeholder="Last name"
                                className={styles.inputField}
                            />
                        </div>
                        <input
                            name="email" 
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="Mail"
                            className={`${styles.inputField} ${styles.fullWidth}`}
                        />
                        <textarea
                            name="message" 
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Message"
                            className={styles.inputField}
                        ></textarea>
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
