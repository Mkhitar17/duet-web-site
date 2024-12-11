

import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
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

const LOCALIZED_TEXTS = {
    arm: {
        title: "Կապ մեզ հետ",
        noEmail: "Էլ․ փոստի տվյալներ չկան",
        noAddress: "Հասցեի տվյալներ չկան",
        sendButton: "Ուղարկել",
        sendingButton: "Ուղարկվում է...",
    },
    ru: {
        title: "Свяжитесь с нами",
        noEmail: "Нет доступного адреса электронной почты",
        noAddress: "Нет доступного адреса",
        sendButton: "Отправить",
        sendingButton: "Отправка...",
    },
    en: {
        title: "Contact Us",
        noEmail: "No email available",
        noAddress: "No address available",
        sendButton: "Send",
        sendingButton: "Sending...",
    },
};


export default function ContactSection() {
    const [paddingLeft, setPaddingLeft] = useState("71px");
    const contactData = useSelector((state) => state.publicData.data?.pageData?.contact);
    const locale = useSelector((state) => state.language.locale);
    const [isSending, setIsSending] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
    });

    const localizedTexts = useMemo(() => LOCALIZED_TEXTS[locale] || LOCALIZED_TEXTS.arm, [locale]);


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
                "service_yadbtlo",
                "template_x21xy3q",
                templateParams,
                "IHJZieZ-tv6VVHPLU"
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
                title={localizedTexts.title}
                showIcons={false}
                customStyles={{ paddingLeft }}

            />
            <div className={styles.ContactContentContainer}>
                <div className={styles.ContactInfoContainer}>
                    <div className={styles.ContactItems}>
                        <div className={styles.SocialContacts}>
                            <div className={styles.PhoneNumberContainer}>
                                <Image src={tel} width={24} height={24} alt="Phone" />
                                <span>{contactData?.phone || localizedTexts.noEmail}</span>
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
                            <span>{contactData?.email || localizedTexts.noEmail}</span>
                        </div>
                        <div className={styles.LocationContainer}>
                            <Image src={location} width={24} height={24} alt="Location" />
                            <span>{contactData?.address?.[locale] || localizedTexts.noAddress}</span>
                        </div>
                    </div>
                    <div className={styles.MapContainer}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4250.7444466931365!2d44.41641850195737!3d40.19374414085645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406a97e837c6df5f%3A0x373812c6cb1fba99!2sDuet%20Company!5e0!3m2!1sru!2sam!4v1733831733558!5m2!1sru!2sam"
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
                            text={isSending ? localizedTexts.sendingButton : localizedTexts.sendButton}
                            customStyles={{ maxWidth: "255px" }}
                            disabled={isSending}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}
