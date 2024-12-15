import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./index.module.css";
import { savePageData } from "@/redux/slices/adminSlice";
import adminWrapper from "@/components/wrappers/adminWrapper";
import Button from "@/components/buttons/PrimaryButton";

const AdminContactSection = () => {
    const dispatch = useDispatch();
    const { pageData } = useSelector((state) => state.admin); // Access Redux state
    const [updatedData, setUpdatedData] = useState(pageData?.contact || {}); // Local state for contact section

    useEffect(() => {
        setUpdatedData(pageData?.contact || {});
    }, [pageData]);

    const handleInputChange = (e, field) => {
        const { value } = e.target;
        setUpdatedData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };


    const handleAddressChange = (e, lang) => {
        const { value } = e.target;
        setUpdatedData((prev) => ({
            ...prev,
            address: {
                ...prev.address,
                [lang]: value,
            },
        }));
    };

    const handleSaveChanges = async () => {
        try {
            await dispatch(savePageData({ contact: updatedData }));
            alert("Contact information saved successfully!");
        } catch (error) {
            console.error("Error saving contact information:", error);
            alert("Failed to save contact information. Please try again.");
        }
    };

    return (
        <div className={styles.Container}>
            <h2>Contact Information</h2>
            <div className={styles.InputsContainer}>

                <div className={styles.Section}>
                    <label htmlFor="phone" className={styles.Label}>Phone Number</label>
                    <input
                        id="phone"
                        type="text"
                        value={updatedData.phone || ""}
                        onChange={(e) => handleInputChange(e, "phone")}
                        className={styles.Input}
                        placeholder="Enter phone number"
                    />
                </div>

                <div className={styles.Section}>
                    <label htmlFor="email" className={styles.Label}>Email</label>
                    <input
                        id="email"
                        type="email"
                        value={updatedData.email || ""}
                        onChange={(e) => handleInputChange(e, "email")}
                        className={styles.Input}
                        placeholder="Enter email address"
                    />
                </div>

                <div className={styles.Section}>
                    <label className={styles.Label}>Address</label>
                    <div className={styles.adressInputs}>
                        {["arm", "ru", "en"].map((lang , index) => (
                            <div key={index} className={styles.AdressItemContainer}>
                                <span>{lang}</span>
                                <input
                                    key={`address-${lang}`}
                                    type="text"
                                    value={updatedData.address?.[lang] || ""}
                                    onChange={(e) => handleAddressChange(e, lang)}
                                    className={styles.Input}
                                    placeholder={`Enter ${lang.toUpperCase()} address`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Button
                type="button"
                text="Save Changes"
                onClick={handleSaveChanges}
                customStyles={{ width: "255px" }}
            />
        </div>
    );
};

export default adminWrapper(AdminContactSection);
