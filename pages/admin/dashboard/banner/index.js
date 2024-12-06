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
    const [updatedBanner, setUpdatedBanner] = useState(pageData?.banner || {});

    useEffect(() => {
        setUpdatedBanner(pageData?.banner || {});
    }, [pageData]);

    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (!file) return alert("Please select an image!");

        const fileWithPreview = {
            file,
            preview: URL.createObjectURL(file),
        };

        setUpdatedBanner(fileWithPreview);
    };

    const handleSaveChanges = async () => {
        try {
            let finalBanner = updatedBanner;

            if (updatedBanner.file) {
                if (updatedBanner.file.type === "image/svg+xml") {
                    const svgData = await new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result);
                        reader.onerror = reject;
                        reader.readAsText(updatedBanner.file);
                    });
                    finalBanner = svgData;
                } else {
                    const compressedFile = await imageCompression(updatedBanner.file, {
                        maxSizeMB: 1,
                        maxWidthOrHeight: 1920,
                        useWebWorker: true,
                    });

                    const formData = new FormData();
                    formData.append("image", compressedFile);

                    const response = await axios.post("/api/handlers/admin/uploadToImgur", formData);
                    finalBanner = response.data.url;
                }
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
            <div className={styles.BannerSection}>
                <div className={styles.FileInputWrapper}>
                    <input
                        type="file"
                        id={`file-upload`}
                        onChange={handleBannerChange}
                        className={styles.FileInputHidden}
                    />
                    <label htmlFor={`file-upload`} className={styles.CustomFileButton}>
                        Choose Image
                    </label>
                </div>
                {updatedBanner.preview || updatedBanner ? (
                    typeof updatedBanner === "string" && updatedBanner.startsWith("<svg") ? (
                        <div
                            className={styles.SVGContainer}
                            dangerouslySetInnerHTML={{ __html: updatedBanner }}
                        />
                    ) : (
                        <Image
                            src={updatedBanner.preview || updatedBanner}
                            alt="Banner"
                            className={styles.BannerImage}
                            width={800}
                            height={400}
                        />
                    )
                ) : (
                    <span>No banner image selected</span>
                )}
            </div>
            <Button
                type="button"
                text="Save Changes"
                onClick={handleSaveChanges}
                customStyles={{ width: "200px" }}
            />
        </div>
    );
};

export default adminWrapper(AdminBannerSection);
