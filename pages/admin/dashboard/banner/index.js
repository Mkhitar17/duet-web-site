import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./index.module.css";
import Image from "next/image";
import axios from "axios";
import { savePageData } from "@/redux/slices/adminSlice";
import adminWrapper from "@/components/wrappers/adminWrapper";
import imageCompression from "browser-image-compression";
import Button from "@/components/buttons/PrimaryButton";

const AdminBannerSection = () => {
    const dispatch = useDispatch();
    const { pageData } = useSelector((state) => state.admin);
    const [updatedBanner, setUpdatedBanner] = useState(pageData?.banner || { images: [], texts: {} });


    useEffect(() => {
        setUpdatedBanner(pageData?.banner || { images: [], texts: {} });
    }, [pageData]);

    const handleBannerImagesChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return alert("Please select images!");

        const filesWithPreviews = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setUpdatedBanner((prev) => ({
            ...prev,
            images: [...(prev.images || []), ...filesWithPreviews],
        }));
    };

    const handleTextChange = (e, language, field) => {
        setUpdatedBanner((prev) => ({
            ...prev,
            texts: {
                ...prev.texts,
                [language]: {
                    ...prev.texts[language],
                    [field]: e.target.value,
                },
            },
        }));
    };

    const handleDeleteImage = (index) => {
        setUpdatedBanner((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
    };

    const handleSaveChanges = async () => {
        try {
            const finalBanner = { ...updatedBanner };

            if (updatedBanner.images) {
                const uploadedImages = await Promise.all(
                    updatedBanner.images.map(async (item) => {
                        if (item.file) {
                            const compressedFile = await imageCompression(item.file, {
                                maxSizeMB: 1,
                                maxWidthOrHeight: 1920,
                                useWebWorker: true,
                            });

                            const formData = new FormData();
                            formData.append("image", compressedFile);

                            const response = await axios.post("/api/handlers/admin/uploadToImgur", formData);
                            return response.data.url;
                        }
                        return item;
                    })
                );

                finalBanner.images = uploadedImages;
            }

            await dispatch(savePageData({ banner: finalBanner }));
            alert("Banner updated successfully!");
        } catch (error) {
            console.error("Error saving banner:", error);
            alert("Failed to save banner. Please try again.");
        }
    };

    return (

        <div className={styles.Container}>
            <div className={styles.ButtonsContainer}>
                <div className={styles.FileInputWrapper}>
                    <input
                        type="file"
                        multiple
                        onChange={handleBannerImagesChange}
                        className={styles.FileInputHidden}
                        id="file-upload"
                    />
                    <label htmlFor="file-upload" className={styles.CustomFileButton}>
                        Add Image
                    </label>
                </div>
                <Button type="button" text="Save Changes" onClick={handleSaveChanges} customStyles={{ width: "200px" }} />
            </div>
            <div className={styles.BannerSection}>


                <div className={styles.ImagesPreview}>
                    <div className={styles.ImagesContainer}>
                        {updatedBanner.images?.map((item, index) => (
                            <div key={index} className={styles.ImageContainer}>
                                <Image
                                    src={item.preview || item}
                                    alt={`Banner Image ${index}`}
                                    className={styles.BannerImage}
                                    width={800}
                                    height={1000}
                                />
                                <div className={styles.DeleteButton} onClick={() => handleDeleteImage(index)}>
                                    <span>Delete Image</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.Texts}>
                    {["arm", "ru", "en"].map((lang) => (
                        <div key={lang} className={styles.TextsSection}>
                            <h4>{lang.toUpperCase()}</h4>
                            <div className={styles.TextItemsContainer}>
                                <textarea
                                    value={updatedBanner.texts?.[lang]?.primaryText || ""}
                                    onChange={(e) => handleTextChange(e, lang, "primaryText")}
                                    className={styles.TextArea1}
                                    placeholder={`Enter primary text (${lang})`}
                                />
                                <textarea
                                    value={updatedBanner.texts?.[lang]?.secondaryText || ""}
                                    onChange={(e) => handleTextChange(e, lang, "secondaryText")}
                                    className={styles.TextArea2}
                                    placeholder={`Enter secondary text (${lang})`}
                                />
                            </div>
                        </div>
                    ))}

                </div>
            </div>

        </div>
    );
};

export default adminWrapper(AdminBannerSection);
