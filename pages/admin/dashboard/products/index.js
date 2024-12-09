import { useState, useMemo, useEffect, useRef } from "react";
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

const AdminProductionSection = () => {
    const dispatch = useDispatch();
    const { pageData } = useSelector((state) => state.admin);
    const [activeTab, setActiveTab] = useState(0);
    const [updatedData, setUpdatedData] = useState(pageData?.production || {});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [editingIndex, setEditingIndex] = useState(null);

    const nameToKeyMap = {
        "սուրճ": "coffee",
        "թեյ": "tea",
        "կաթնային սուրճ": "milkCoffee",
    };

    useEffect(() => {
        setUpdatedData(pageData?.production || {});
    }, [pageData]);

    const tabs = useMemo(() => {
        return updatedData
            ? [
                { name: "Սուրճ", items: updatedData.coffee || [] },
                { name: "Թեյ", items: updatedData.tea || [] },
                { name: "Կաթնային սուրճ", items: updatedData.milkCoffee || [] },
            ]
            : [];
    }, [updatedData]);

    const activeItems = useMemo(() => tabs[activeTab]?.items || [], [tabs, activeTab]);

    const handleDelete = (index) => {
        setUpdatedData((prev) => {
            const categoryKey = nameToKeyMap[tabs[activeTab].name.toLowerCase()];
            const currentItems = prev[categoryKey] || [];
            return {
                ...prev,
                [categoryKey]: currentItems.filter((_, i) => i !== index),
            };
        });
    };

    const handleSaveChanges = async () => {
        try {
            const updatedProduction = { ...updatedData };

            for (const key in updatedProduction) {
                const items = updatedProduction[key];
                const processedItems = await Promise.all(
                    items.map(async (item) => {
                        if (item.file) {
                            if (item.file.type === "image/svg+xml") {
                                // Handle SVG file directly
                                const svgData = await new Promise((resolve, reject) => {
                                    const reader = new FileReader();
                                    reader.onload = () => resolve(reader.result);
                                    reader.onerror = reject;
                                    reader.readAsText(item.file);
                                });
                                return { image: svgData, size: item.size, description: item.description };
                            } else {
                                const compressedFile = await imageCompression(item.file, {
                                    maxSizeMB: 1,
                                    maxWidthOrHeight: 1920,
                                    useWebWorker: true,
                                });

                                const formData = new FormData();
                                formData.append("image", compressedFile);

                                const response = await axios.post("/api/handlers/admin/uploadToImgur", formData);
                                return { image: response.data.url, size: item.size, description: item.description };
                            }
                        }
                        return item;
                    })
                );

                updatedProduction[key] = processedItems;
            }

            dispatch(savePageData({ production: updatedProduction }));
            alert("Changes saved successfully!");
        } catch (error) {
            console.error("Error saving changes:", error);
            alert("Failed to save changes.");
        }
    };

    const openModal = (index = null) => {
        setEditingIndex(index);
        setCurrentItem(index !== null ? activeItems[index] : null);
        setIsModalOpen(true);
    };

    const handleSaveProduct = (newProduct) => {
        const categoryKey = nameToKeyMap[tabs[activeTab].name.toLowerCase()];
        setUpdatedData((prev) => {
            const updatedItems = [...(prev[categoryKey] || [])];
            if (editingIndex !== null) {
                updatedItems[editingIndex] = newProduct;
            } else {
                updatedItems.push(newProduct);
            }
            return { ...prev, [categoryKey]: updatedItems };
        });
        setIsModalOpen(false);
        setCurrentItem(null);
        setEditingIndex(null);
    };

    return (
        <div className={styles.Container}>
            <div className={styles.ContentContainer}>
                <div className={styles.ProductionTabsContainer}>
                    <div className={styles.Tabs}>
                        {tabs.map((tab, index) => (
                            <div
                                key={index}
                                className={`${styles.tab} ${activeTab === index ? styles.activeTab : ""}`}
                                onClick={() => setActiveTab(index)}
                            >
                                <span>{tab.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.ProductsContainer}>
                    {activeItems.map((item, index) => (
                        <div key={index} className={styles.ProductItem}>
                            {typeof item.image === "string" && item.image.startsWith("<svg") ? (
                                <div
                                    className={styles.SVGContainer}
                                    dangerouslySetInnerHTML={{ __html: item.image }}
                                />
                            ) : (
                                <Image src={item.image} alt={`Product ${index}`} width={250} height={250} />
                            )}
                            <div className={styles.ProductDetails}>
                                <span> <strong>Size:</strong> {item.size}</span>
                                <span><strong>Description:</strong> {item.description}</span>
                            </div>
                            <div className={styles.EditButton} onClick={() => openModal(index)}>
                                Edit
                            </div>
                            <div className={styles.DeleteButton} onClick={() => handleDelete(index)}>
                                <Image src={CloseIcon} width={30} height={30} alt="Delete" />
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.UploadContainer}>
                    <Button text="Add Product" onClick={() => openModal()} customStyles={{ width: "200px", background: "blue" }} />
                </div>
                <div className={styles.SaveContainer}>
                    <Button type="button" text="Save Changes" onClick={handleSaveChanges} customStyles={{ width: "255px" }} />
                </div>
            </div>
            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveProduct}
                initialData={currentItem}
            />
        </div>
    );
};

export default adminWrapper(AdminProductionSection);
