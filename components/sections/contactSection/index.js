

import { useEffect, useState } from "react";
import styles from "./index.module.css";
import Image from "next/image";
import tel from "@/public/contact.svg";
import fb from "@/public/facebook.svg";
import insta from "@/public/instagram.svg";
import mail from "@/public/mail.svg";
import location from "@/public/location.svg";
import SectionHeadline from "@/components/sectionHeadline";
import Button from "@/components/buttons/PrimaryButton";
import emailjs from "emailjs-com";

export default function ContactSection() {
    const [paddingLeft, setPaddingLeft] = useState("71px");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
    });

    const [isSending, setIsSending] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    useEffect(() => {
        console.log(formData)
    }, [formData])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
            alert("Please fill in all fields!");
            return;
        }

        setIsSending(true);

        const templateParams = {
            from_name: formData.firstName,
            to_name: "Duet",
            from_email: formData.email, 
            message: formData.message,
        };

        emailjs
            .send(
                "service_8ivgtvt", 
                "template_7d9osdu", 
                templateParams,
                "lPz7KtDq8TRTKVEja" 
            )
            .then(
                () => {
                    alert("Your message has been sent successfully!");
                    setFormData({
                        firstName: "",
                        lastName: "",
                        email: "",
                        message: "",
                    });
                },
                (error) => {
                    console.error("Failed to send message:", error);
                    alert("Failed to send your message. Please try again.");
                }
            )
            .finally(() => setIsSending(false));
    };

    useEffect(() => {
        const updatePadding = () => {
          if (window.innerWidth < 1440) {
            setPaddingLeft("16px");
          } else {
            setPaddingLeft("71px");
          }
        };
    
        updatePadding();
    
        window.addEventListener("resize", updatePadding);
    
        return () => window.removeEventListener("resize", updatePadding);
      }, []);

    return (
        <div className={styles.Container}>
            <SectionHeadline
                title="կապ մեզ հետ"
                showIcons={false}
                customStyles={{paddingLeft }}
                
            />
            <div className={styles.ContactContentContainer}>
                <div className={styles.ContactInfoContainer}>
                    <div className={styles.ContactItems}>
                        <div className={styles.SocialContacts}>
                            <div className={styles.PhoneNumberContainer}>
                                <Image src={tel} width={24} height={24} alt="Phone" />
                                <span>098 604406</span>
                            </div>
                            <div className={styles.SocialIcons}>
                                <a href="https://www.facebook.com/dueticecoffee?locale=ru_RU"
                                    target="_blank">
                                    <Image src={fb} width={24} height={24} alt="Facebook" />
                                </a>

                                <a href="https://www.instagram.com/duet_company/profilecard/?igsh=ancxeGx1Ymg0ZjJy"
                                    target="_blank">
                                    <Image src={insta} width={24} height={24} alt="Instagram" />

                                </a>
                            </div>
                        </div>
                        <div className={styles.EmailContainer}>

                            <Image src={mail} width={24} height={24} alt="Mail" />
                            <span>duet.coffee@gmail.com</span>
                        </div>
                        <div className={styles.LocationContainer}>
                            <Image src={location} width={24} height={24} alt="Location" />
                            <span> Հաղթանակ թաղամաս, 1 փողոց 48 շինություն</span>
                        </div>
                    </div>
                    <div className={styles.MapContainer}>
                        <iframe
                            src="https://yandex.ru/map-widget/v1/?ll=44.421818%2C40.196547&z=15&l=map&pt=44.421818,40.196547,pm2rdm"
                            width="100%"
                            height="100%"
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
                            text={isSending ? "Sending..." : "Ուղարկել"}
                            customStyles={{ maxWidth: "255px" }}
                            disabled={isSending}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}
