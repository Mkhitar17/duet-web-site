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

const AdminProductionSection = () => {
    const dispatch = useDispatch();
    const { pageData } = useSelector((state) => state.admin);
    const [activeTab, setActiveTab] = useState(0);
    const [updatedData, setUpdatedData] = useState(pageData?.production || {});
    const fileInputRefs = useRef([]);

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

    // const handleImageChange = (e, index) => {
    //     const file = e.target.files[0];
    //     if (!file) return alert("Please select an image!");

    //     const fileWithPreview = {
    //         file,
    //         preview: URL.createObjectURL(file),
    //     };

    //     setUpdatedData((prev) => {
    //         const categoryKey = nameToKeyMap[tabs[activeTab].name.toLowerCase()];
    //         return {
    //             ...prev,
    //             [categoryKey]: [...(prev[categoryKey] || []), fileWithPreview],
    //         };
    //     });
    // };


    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (!file) return alert("Please select an image!");

        const fileWithPreview = {
            file,
            preview: URL.createObjectURL(file),
        };

        setUpdatedData((prev) => {
            const categoryKey = nameToKeyMap[tabs[activeTab].name.toLowerCase()];
            const updatedItems = [...(prev[categoryKey] || [])];
            if (index !== undefined) {
                // Replace the specific image
                updatedItems[index] = fileWithPreview;
            } else {
                // Add a new image
                updatedItems.push(fileWithPreview);
            }
            return {
                ...prev,
                [categoryKey]: updatedItems,
            };
        });
    };


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

                updatedProduction[key] = processedItems;
            }

            dispatch(savePageData({ production: updatedProduction }));
            alert("Changes saved successfully!");
        } catch (error) {
            console.error("Error saving changes:", error);
            alert("Failed to save changes.");
        }
    };

    // useEffect(() => {
    //     console.log("Tabs:", tabs);
    //     console.log("Active Tab:", tabs[activeTab]);
    // }, [tabs, activeTab]);

    // useEffect(() => {
    //     console.log("Updated Data:", updatedData);
    // }, [updatedData]);

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
                            {typeof item === "string" && item.startsWith("<svg") ? (
                                <div
                                    className={styles.SVGContainer}
                                    dangerouslySetInnerHTML={{ __html: item }}
                                />
                            ) : item.preview ? (
                                <Image src={item.preview} alt={`New Product ${index}`} width={250} height={250} />
                            ) : (
                                <Image src={item} alt={`Product ${index}`} width={250} height={250} />
                            )}
                            <input
                                type="file"
                                ref={(el) => (fileInputRefs.current[index] = el)}
                                className={styles.FileInputHidden}
                                onChange={(e) => handleImageChange(e, index)}
                            />
                            <div className={styles.EditButton} onClick={() => fileInputRefs.current[index]?.click()}>
                                Edit
                            </div>
                            {/* <button onClick={() => handleDelete(index)}>Delete</button> */}

                            <div className={styles.DeleteButton} onClick={() => handleDelete(index)}>
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
                <div className={styles.UploadContainer}>
                    {/* <input type="file" onChange={handleImageChange} /> */}
                    <div className={styles.FileInputWrapper}>
                        <input
                            type="file"
                            id={`file-upload-2`}
                            onChange={handleImageChange}
                            className={styles.FileInputHidden}
                        />
                        <label htmlFor={`file-upload-2`} className={styles.CustomFileButton}>
                            Add Image
                        </label>
                    </div>
                </div>
                <div className={styles.SaveContainer}>
                    <Button
                        type="button"
                        text="Save Changes"
                        onClick={handleSaveChanges}
                        customStyles={{ width: "255px" }}
                    />
                </div>
            </div>
        </div>
    );
};

export default adminWrapper(AdminProductionSection);
