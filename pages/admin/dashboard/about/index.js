import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./index.module.css";
import Image from "next/image";
import axios from "axios";
import { savePageData } from "@/redux/slices/adminSlice";
import adminWrapper from "@/components/wrappers/adminWrapper";
import imageCompression from "browser-image-compression";
import Button from "@/components/buttons/PrimaryButton";
import CloseIcon from "@/public/icons/close-red.svg";

const AdminAboutSection = () => {
    const dispatch = useDispatch();
    const { pageData } = useSelector((state) => state.admin);
    const [updatedData, setUpdatedData] = useState(pageData?.about || {});


    useEffect(() => {
        setUpdatedData(pageData?.about || {});
    }, [pageData]);

    const handleTextChange = (e, section) => {
        setUpdatedData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                text: e.target.value,
            },
        }));
    };

    const handleMainImageChange = (e, section) => {
        const file = e.target.files[0];
        if (!file) return alert("Please select an image!");

        const fileWithPreview = {
            file,
            preview: URL.createObjectURL(file),
        };

        setUpdatedData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                image: fileWithPreview,
            },
        }));
    };

    const handleSmallImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return alert("Please select an image!");

        const fileWithPreview = {
            file,
            preview: URL.createObjectURL(file),
        };
        setUpdatedData((prev) => ({
            ...prev,
            section2: {
                ...prev.section2,
                smallImages: [...(prev.section2.smallImages || []), fileWithPreview],
            },
        }));
    };

    const handleDeleteSmallImage = (index) => {
        setUpdatedData((prev) => ({
            ...prev,
            section2: {
                ...prev.section2,
                smallImages: prev.section2.smallImages.filter((_, i) => i !== index),
            },
        }));
    };

    const handleSaveChanges = async () => {
        try {
            const updatedAbout = { ...updatedData };

            for (const section in updatedAbout) {
                if (updatedAbout[section]?.image?.file) {
                    if (updatedAbout[section].image.file.type === "image/svg+xml") {
                        const svgData = await new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.onload = () => resolve(reader.result);
                            reader.onerror = reject;
                            reader.readAsText(updatedAbout[section].image.file);
                        });
                        updatedAbout[section].image = svgData;
                    } else {
                        const compressedFile = await imageCompression(updatedAbout[section].image.file, {
                            maxSizeMB: 1,
                            maxWidthOrHeight: 1920,
                            useWebWorker: true,
                        });

                        const formData = new FormData();
                        formData.append("image", compressedFile);

                        const response = await axios.post("/api/handlers/admin/uploadToImgur", formData);
                        updatedAbout[section].image = response.data.url;
                    }
                }
            }

            if (updatedAbout.section2?.smallImages) {
                const uploadedSmallImages = await Promise.all(
                    updatedAbout.section2.smallImages.map(async (item) => {
                        if (item.file) {
                            if (item.file.type === "image/svg+xml") {
                                const svgData = await new Promise((resolve, reject) => {
                                    const reader = new FileReader();
                                    reader.onload = () => resolve(reader.result);
                                    reader.onerror = reject;
                                    reader.readAsText(item.file);
                                });
                                return svgData;
                            } else {
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
                        }
                        return item;
                    })
                );
                updatedAbout.section2.smallImages = uploadedSmallImages;
            }

            dispatch(savePageData({ about: updatedAbout }));
            alert("Changes saved successfully!");
        } catch (error) {
            console.error("Error saving changes:", error);
            alert("Failed to save changes. Please try again.");
        }
    };

    return (
        <div className={styles.Container}>
            <div className={styles.Section}>
                <textarea
                    value={updatedData.section1?.text || ""}
                    onChange={(e) => handleTextChange(e, "section1")}
                    className={styles.TextArea}
                    placeholder="Enter text for Section 1"
                />
                <div className={styles.sectionImageContainer}>
                    <div className={styles.FileInputWrapper}>
                        <input
                            type="file"
                            id={`file-upload-1`}
                            onChange={(e) => handleMainImageChange(e, section)}
                            className={styles.FileInputHidden}
                        />
                        <label htmlFor={`file-upload-1`} className={styles.CustomFileButton}>
                            Choose Image
                        </label>
                    </div>
                    {updatedData.section1?.image ? (
                        typeof updatedData.section1.image === "string" && updatedData.section1.image.startsWith("<svg") ? (
                            <div
                                className={styles.SVGContainer}
                                dangerouslySetInnerHTML={{ __html: updatedData.section1.image }}
                            />
                        ) : (
                            <Image
                                src={updatedData.section1.image.preview || updatedData.section1.image}
                                alt="Section 1 Image"
                                className={styles.Image}
                                width={600}
                                height={1}
                            />
                        )
                    ) : (
                        <span>No image selected for Section 1</span>
                    )}
                </div>
            </div>

            <div className={styles.Section}>
                <div className={styles.sectionContentContainer}>
                    <div className={styles.FileInputWrapper}>
                        <input
                            type="file"
                            id={`file-upload-2`}
                            onChange={(e) => handleMainImageChange(e, "section2")}
                            className={styles.FileInputHidden}
                        />
                        <label htmlFor={`file-upload-2`} className={styles.CustomFileButton}>
                            Choose Image
                        </label>
                    </div>

                    {updatedData.section2?.image ? (
                        typeof updatedData.section2.image === "string" && updatedData.section2.image.startsWith("<svg") ? (
                            <div
                                className={styles.SVGContainer}
                                dangerouslySetInnerHTML={{ __html: updatedData.section2.image }}
                            />
                        ) : (
                            <Image
                                src={updatedData.section2.image.preview || updatedData.section2.image}
                                alt="Section 2 Image"
                                className={styles.Image}
                                width={600}
                                height={0}
                            />
                        )
                    ) : (
                        <span>No image selected for Section 2</span>
                    )}

                    <div className={styles.SmallImages}>
                        {updatedData.section2?.smallImages?.map((item, index) => (
                            <div key={index} className={styles.SmallImageContainer}>
                                {typeof item === "string" && item.startsWith("<svg") ? (
                                    <div
                                        className={styles.SVGContainer}
                                        dangerouslySetInnerHTML={{ __html: item }}
                                    />
                                ) : (
                                    <Image
                                        src={item.preview || item}
                                        alt={`Small Image ${index}`}
                                        className={styles.SmallImage}
                                        width={130}
                                        height={130}
                                    />
                                )}

                                <div className={styles.DeleteButton} onClick={() => handleDeleteSmallImage(index)}>
                                    <Image
                                        src={CloseIcon}
                                        width={0}
                                        height={0}
                                        className={styles.Image}
                                        alt="image"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    {updatedData.section2?.smallImages?.length < 4 && (
                        <div className={styles.FileInputWrapper}>
                            <input
                                type="file"
                                id={`file-upload-small`}
                                onChange={handleSmallImageChange}
                                className={styles.FileInputHidden}
                            />
                            <label htmlFor={`file-upload-small`} className={styles.CustomFileButton}>
                                Choose Image
                            </label>
                        </div>
                    )}
                </div>
                <textarea
                    value={updatedData.section2?.text || ""}
                    onChange={(e) => handleTextChange(e, "section2")}
                    className={styles.TextArea}
                    placeholder="Enter text for Section 2"
                />

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

export default adminWrapper(AdminAboutSection);
