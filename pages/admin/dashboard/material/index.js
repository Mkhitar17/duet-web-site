import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import styles from "./index.module.css";
import { savePageData } from "@/redux/slices/adminSlice";
import adminWrapper from "@/components/wrappers/adminWrapper";
import Button from "@/components/buttons/PrimaryButton";
import CloseIcon from "@/public/icons/close-red.svg";
import ProductModal from "@/components/productCreationModal";

const AdminMaterialsSection = () => {
    const dispatch = useDispatch();
    const { pageData } = useSelector((state) => state.admin);

    const [updatedData, setUpdatedData] = useState(pageData?.material || {});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [editingIndex, setEditingIndex] = useState(null);

    useEffect(() => {
        setUpdatedData(pageData?.material || {});
    }, [pageData]);

    const handleTextChange = (e) => {
        setUpdatedData((prev) => ({
            ...prev,
            texts: {
                ...prev.texts,
                [e.target.name]: e.target.value,
            },
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return alert("Please select an image!");

        const fileWithPreview = {
            file,
            preview: URL.createObjectURL(file),
        };

        setUpdatedData((prev) => ({
            ...prev,
            materialImage: fileWithPreview,
        }));
    };

    const handleDelete = (index) => {
        setUpdatedData((prev) => ({
            ...prev,
            materialItems: prev.materialItems.filter((_, i) => i !== index),
        }));
    };

    const handleSaveChanges = async () => {
        try {
            const updatedMaterial = { ...updatedData };
            if (updatedMaterial.materialImage?.file) {
                const compressedFile = await imageCompression(updatedMaterial.materialImage.file, {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true,
                });

                const formData = new FormData();
                formData.append("image", compressedFile);

                const response = await axios.post("/api/handlers/admin/uploadToImgur", formData);
                updatedMaterial.materialImage = response.data.url;
            }

            if (updatedMaterial.materialItems) {
                const uploadedItems = await Promise.all(
                    updatedMaterial.materialItems.map(async (item) => {
                        if (item.file) {
                            const compressedFile = await imageCompression(item.file, {
                                maxSizeMB: 1,
                                maxWidthOrHeight: 1920,
                                useWebWorker: true,
                            });

                            const formData = new FormData();
                            formData.append("image", compressedFile);

                            const response = await axios.post("/api/handlers/admin/uploadToImgur", formData);
                            return { ...item, image: response.data.url };
                        }
                        return item;
                    })
                );
                updatedMaterial.materialItems = uploadedItems;
            }

            dispatch(savePageData({ material: updatedMaterial }));
            alert("Changes saved successfully!");
        } catch (error) {
            console.error("Error saving changes:", error);
            alert("Failed to save changes. Please try again.");
        }
    };

    const openModal = (index = null) => {
        setEditingIndex(index);
        setCurrentItem(
            index !== null
                ? updatedData.materialItems[index]
                : { image: "", size: "", name: { arm: "", ru: "", en: "" }, description: { arm: "", ru: "", en: "" } }
        );
        setIsModalOpen(true);
    };

    const handleSaveProduct = (newProduct) => {
        setUpdatedData((prev) => {
            const updatedItems = [...(prev.materialItems || [])];
            if (editingIndex !== null) {
                updatedItems[editingIndex] = newProduct;
            } else {
                updatedItems.push(newProduct);
            }
            return { ...prev, materialItems: updatedItems };
        });
        setIsModalOpen(false);
        setCurrentItem(null);
        setEditingIndex(null);
    };

    return (
        <div className={styles.Container}>
            <div className={styles.ButtonsContainer}>
                <Button text="Add Material Item" onClick={() => openModal()} customStyles={{ width: "200px", background: "blue" }} />
                <Button type="button" text="Save Changes" onClick={handleSaveChanges} customStyles={{ width: "255px" }} />
            </div>
            <div className={styles.ContentContainer}>
                <div className={styles.SectionContainer}>
                    <div className={styles.TextContainer}>
                        {["arm", "ru", "en"].map((lang) => (
                            <textarea
                                key={`material-text-${lang}`}
                                name={lang}
                                value={updatedData.texts?.[lang] || ""}
                                onChange={handleTextChange}
                                placeholder={`Enter ${lang.toUpperCase()} material description...`}
                                className={styles.TextArea}
                            />
                        ))}
                    </div>
                    <div className={styles.ImageContainer}>
                        <div className={styles.FileInputWrapper}>
                            <input type="file" id="file-upload-image" onChange={handleImageChange} className={styles.FileInputHidden} />
                            <label htmlFor="file-upload-image" className={styles.CustomFileButton}>
                                Change Image
                            </label>
                        </div>
                        {updatedData.materialImage ? (
                            typeof updatedData.materialImage === "string" && updatedData.materialImage.startsWith("<svg") ? (
                                <div className={styles.SVGContainer} dangerouslySetInnerHTML={{ __html: updatedData.materialImage }} />
                            ) : (
                                <Image
                                    loading="lazy"
                                    src={updatedData.materialImage.preview || updatedData.materialImage}
                                    alt="Material Image"
                                    width={450}
                                    height={253}
                                    className={styles.Image}
                                    unoptimized
                                />
                            )
                        ) : (
                            <span>No image selected</span>
                        )}
                    </div>
                </div>

                <div className={styles.ProductsContainer}>
                    {updatedData.materialItems?.map((item, index) => (
                        <div key={index} className={styles.ProductItem}>
                            {typeof item.image === "string" && item.image.startsWith("<svg") ? (
                                <div
                                    className={styles.SVGContainer}
                                    dangerouslySetInnerHTML={{ __html: item.image }}
                                />
                            ) : (
                                <Image unoptimized loading="lazy"src={item.image} alt={`Product ${index}`} width={350} height={350} />
                            )}
                            <div className={styles.ProductDetails}>
                                <span><strong>Size:</strong> {item.size}</span>
                                <span><strong>Description (ARM):</strong> {item.description.arm}</span>
                                <span><strong>Description (RU):</strong> {item.description.ru}</span>
                                <span><strong>Description (EN):</strong> {item.description.en}</span>
                            </div>
                            <div className={styles.EditButton} onClick={() => openModal(index)}>
                                Edit
                            </div>
                            <div className={styles.DeleteButton} onClick={() => handleDelete(index)}>
                                <Image loading="lazy" src={CloseIcon} width={30} height={30} alt="Delete" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveProduct}
                initialData={currentItem}
                editingIndex={editingIndex}
            />
        </div>
    );
};

export default adminWrapper(AdminMaterialsSection);
