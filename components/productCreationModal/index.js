import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./index.module.css";
import Button from "@/components/buttons/PrimaryButton";
import CloseIcon from "@/public/icons/close-red.svg";

const ProductModal = ({ isOpen, onClose, onSave, initialData, editingIndex }) => {
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(initialData?.image || "");
    const [size, setSize] = useState(initialData?.size || "");
    const [name, setName] = useState(initialData?.name || { arm: "", ru: "", en: "" });
    const [description, setDescription] = useState(initialData?.description || { arm: "", ru: "", en: "" });

    useEffect(() => {
        if (initialData) {
            setImageFile(null);
            setImagePreview(initialData.image || "");
            setSize(initialData.size || "");
            setName(initialData.name || { arm: "", ru: "", en: "" });
            setDescription(initialData.description || { arm: "", ru: "", en: "" });
        } else {
            setImageFile(null);
            setImagePreview("");
            setSize("");
            setName({ arm: "", ru: "", en: "" });
            setDescription({ arm: "", ru: "", en: "" });
        }
    }, [initialData]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSave = () => {
        if (!size || !name.en || !description.en || (!imageFile && !imagePreview)) {
            alert("Please provide all details (image, size, name, and description).");
            return;
        }

        onSave({ image: imagePreview, size, name, description, file: imageFile });
    };

    if (!isOpen) return null;

    return (
        <div className={styles.ModalOverlay}>
            <div className={styles.ModalContent}>
                <div className={styles.ModalHeader}>
                    <h2>{editingIndex ? "Edit Product" : "Add Product"}</h2>
                    <Image loading="lazy" src={CloseIcon} alt="Close" className={styles.CloseIcon} onClick={onClose} />
                </div>
                <div className={styles.ModalBody}>
                    <div className={styles.FileInputWrapper}>
                        <input
                            type="file"
                            id="file-upload"
                            onChange={handleImageChange}
                            className={styles.FileInputHidden}
                        />
                        <label htmlFor="file-upload" className={styles.CustomFileButton}>
                            Choose File
                        </label>
                    </div>
                    {imagePreview && <Image src={imagePreview} alt="Preview" width={250} height={250}  unoptimized/>}
                    <input type="text" placeholder="Size" value={size} onChange={(e) => setSize(e.target.value)} />
                    <div>
                        <input type="text" placeholder="Name (ARM)" value={name.arm} onChange={(e) => setName({ ...name, arm: e.target.value })} />
                        <input type="text" placeholder="Name (RU)" value={name.ru} onChange={(e) => setName({ ...name, ru: e.target.value })} />
                        <input type="text" placeholder="Name (EN)" value={name.en} onChange={(e) => setName({ ...name, en: e.target.value })} />
                    </div>
                    <div>
                        <textarea placeholder="Description (ARM)" value={description.arm} onChange={(e) => setDescription({ ...description, arm: e.target.value })} />
                        <textarea placeholder="Description (RU)" value={description.ru} onChange={(e) => setDescription({ ...description, ru: e.target.value })} />
                        <textarea placeholder="Description (EN)" value={description.en} onChange={(e) => setDescription({ ...description, en: e.target.value })} />
                    </div>
                </div>
                <div className={styles.ModalFooter}>
                    <Button text="Save" onClick={handleSave} />
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
