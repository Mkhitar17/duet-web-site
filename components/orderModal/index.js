import React, { useState, useMemo , useEffect} from "react";
import { useSelector } from "react-redux";
import styles from "./index.module.css";
import Image from "next/image";
import Button from "@/components/buttons/PrimaryButton";
import CloseIcon from "@/public/icons/close-red.svg";
import tel from "@/public/icons/tel-black.svg";
import mail from "@/public/icons/email-black.svg";
import location from "@/public/icons/location-black.svg";
import emailjs from "emailjs-com";


const LOCALIZED_TEXTS = {
    arm: {
        title: "Պատվիրել Հումք",
        noPhone: "Հեռախոսի համար չկա",
        noEmail: "Էլ․ փոստի տվյալներ չկան",
        noAddress: "Հասցեի տվյալներ չկան",
        sendButton: "Ուղարկել",
        sendingButton: "Ուղարկվում է...",
        fillAllFields: "Խնդրում ենք լրացնել բոլոր դաշտերը!",
        successMessage: "Ձեր պատվերը հաջողությամբ ուղարկվել է!",
        errorMessage: "Չհաջողվեց ուղարկել ձեր պատվերը։ Խնդրում ենք փորձել կրկին:",
    },
    ru: {
        title: "Заказать сырье",
        noPhone: "Номер телефона недоступен",
        noEmail: "Электронная почта недоступна",
        noAddress: "Адрес недоступен",
        sendButton: "Отправить",
        sendingButton: "Отправка...",
        fillAllFields: "Пожалуйста, заполните все поля!",
        successMessage: "Ваш заказ был успешно отправлен!",
        errorMessage: "Не удалось отправить ваш заказ. Пожалуйста, попробуйте еще раз.",
    },
    en: {
        title: "Order Materials",
        noPhone: "No phone number available",
        noEmail: "No email available",
        noAddress: "No address available",
        sendButton: "Send",
        sendingButton: "Sending...",
        fillAllFields: "Please fill in all fields!",
        successMessage: "Your order request has been sent successfully!",
        errorMessage: "Failed to send your order request. Please try again.",
    },
};

export default function OrderModal({ onClose, locale }) {
    const contactData = useSelector((state) => state.publicData.data?.pageData?.contact);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
    });

    const localizedTexts = useMemo(() => LOCALIZED_TEXTS[locale] || LOCALIZED_TEXTS.arm, [locale]);

    const [isSending, setIsSending] = useState(false);



    useEffect(() => {
        document.body.classList.add("noScroll");

        return () => document.body.classList.remove("noScroll");
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.message) {
            alert(alert(localizedTexts.fillAllFields));
            return;
        }

        setIsSending(true);

        const templateParams = {
            from_name: `${formData.firstName} ${formData.lastName}`,
            from_email: formData.email,
            phone: formData.phone,
            message: formData.message,
            to_name: "Duet",
        };

        emailjs
            .send(
                "service_yadbtlo",
                "template_l76vfni",
                templateParams,
                "IHJZieZ-tv6VVHPLU"
            )
            .then(
                () => {
                    alert(localizedTexts.successMessage);
                    setFormData({
                        firstName: "",
                        lastName: "",
                        email: "",
                        phone: "",
                        message: "",
                    });
                    onClose();
                },
                (error) => {
                    console.error("Failed to send message:", error);
                    alert(localizedTexts.errorMessage);
                }
            )
            .finally(() => setIsSending(false));
    };


    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.ModalHeadline}>
                    <div className={styles.HeadlineText}>
                    <span>{localizedTexts.title}</span>
                    </div>

                    <div className={styles.closeButton} onClick={onClose}>
                        <Image
                            src={CloseIcon}
                            width={0}
                            height={0}
                            className={styles.Image}
                            alt="Close"
                        />
                    </div>
                </div>

                <div className={styles.ContactItems}>
                    <div className={styles.PhoneNumberContainer}>
                        <Image src={tel} width={20} height={20} alt="Phone" />
                        <span>{contactData?.phone || localizedTexts.noPhone}</span>
                    </div>
                    <div className={styles.EmailContainer}>
                        <Image src={mail} width={20} height={20} alt="Mail" />
                        <span>{contactData?.email || localizedTexts.noEmail}</span>
                    </div>
                    <div className={styles.LocationContainer}>
                        <Image src={location} width={20} height={20} alt="Location" />
                        <span>{contactData?.address?.[locale] || localizedTexts.noAddress}</span>
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
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            type="tel"
                            placeholder="Phone number"
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
                            customStyles={{ maxWidth: "100%" }}
                            disabled={isSending}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

