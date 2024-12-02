import React, { useState } from "react";
import styles from "./index.module.css";
import Image from "next/image";
import Button from "@/components/buttons/PrimaryButton";
import CloseIcon from "@/public/icons/close-red.svg";
import tel from "@/public/icons/tel-black.svg";
import mail from "@/public/icons/email-black.svg";
import location from "@/public/icons/location-black.svg";

export default function OrderModal({ onClose }) {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
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
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>

                <div className={styles.ModalHeadline}>
                    <div className={styles.HeadlineText}>
                        <span>Պատվիրել Հումք</span>
                    </div>

                    <div className={styles.closeButton} onClick={onClose}>
                        <Image
                            src={CloseIcon}
                            width={0}
                            height={0}
                            className={styles.Image}
                            alt="image"
                        />
                    </div>
                </div>

                <div className={styles.ContactItems}>
                    <div className={styles.PhoneNumberContainer}>
                        <Image src={tel} width={20} height={20} alt="Phone" />
                        <span >098 604406</span>
                    </div>
                    <div className={styles.EmailContainer}>
                        <Image src={mail} width={20} height={20} alt="Mail" />
                        <span >duet.coffee@gmail.com</span>
                    </div>
                    <div className={styles.LocationContainer}>
                        <Image src={location} width={20} height={20} alt="Location" />
                        <span > Հաղթանակ թաղամաս, 1 փողոց 48 շինություն</span>
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
                            text="Ուղարկել"
                            customStyles={{ maxWidth: "100%" }}
                        />
                    </form>
                </div>

            </div>
        </div>
    );
}
