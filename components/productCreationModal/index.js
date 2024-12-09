import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./index.module.css";
import Button from "@/components/buttons/PrimaryButton";
import CloseIcon from "@/public/icons/close-red.svg";

const ProductModal = ({ isOpen, onClose, onSave, initialData }) => {
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(initialData?.image || "");
    const [size, setSize] = useState(initialData?.size || "");
    const [description, setDescription] = useState(initialData?.description || "");

    useEffect(() => {
        if (initialData) {
            setImagePreview(initialData.image);
            setSize(initialData.size);
            setDescription(initialData.description);
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
        if (!size || !description || (!imageFile && !imagePreview)) {
            alert("Please provide all details (image, size, and description).");
            return;
        }

        onSave({ image: imagePreview, size, description, file: imageFile });
    };

    if (!isOpen) return null;

    return (
        <div className={styles.ModalOverlay}>
            <div className={styles.ModalContent}>
                <div className={styles.ModalHeader}>
                    <h2>{initialData ? "Edit Product" : "Add Product"}</h2>
                    <Image src={CloseIcon} alt="Close" className={styles.CloseIcon} onClick={onClose} />
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
                        {imagePreview && <span className={styles.FileName}>File selected</span>}
                    </div>
                    {imagePreview &&
                        typeof imagePreview === "string" && imagePreview.startsWith("<svg") ? (
                        <div
                            className={styles.SVGContainer}
                            dangerouslySetInnerHTML={{ __html: imagePreview }}
                        />
                    ) : (
                        <Image src={imagePreview} alt={`Preview`} width={250} height={250} />
                    )
                    }
                    <input
                        type="text"
                        placeholder="Enter size (e.g., 200ml)"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        className={styles.Input}
                    />
                    <textarea
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={styles.TextArea}
                    />
                </div>
                <div className={styles.ModalFooter}>
                    <Button text="Save" onClick={handleSave} customStyles={{ width: "255px" }} />
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
