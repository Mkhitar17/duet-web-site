// import { useState, useMemo, useEffect } from "react";
// import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
// import styles from "./index.module.css";
// import Image from "next/image";
// import { savePageData } from "@/redux/slices/adminSlice";
// import adminWrapper from "@/components/wrappers/adminWrapper";
// import imageCompression from "browser-image-compression";
// import Button from "@/components/buttons/PrimaryButton";

// const AdminMaterialsSection = () => {
//     const dispatch = useDispatch();
//     const { pageData } = useSelector((state) => state.admin); // Access Redux state

//     const [updatedData, setUpdatedData] = useState(pageData?.material || {}); // Local state for material
//     const [newMaterialItem, setNewMaterialItem] = useState(null); // For file input

//     // Initialize local state when `pageData` changes
//     useEffect(() => {

//         setUpdatedData(pageData?.material || {});
//     }, [pageData]);

//     // useEffect(() => {

//     //     console.log(updatedData, "updatedData")
//     // }, [updatedData]);

//     const handleTextChange = (e) => {
//         const textarea = e.target;

//         textarea.style.height = "auto";
//         textarea.style.height = `${textarea.scrollHeight}px`;

//         setUpdatedData((prev) => ({
//             ...prev,
//             text: textarea.value,
//         }));
//     };
//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (!file) return alert("Please select an image!");

//         const fileWithPreview = {
//             file,
//             preview: URL.createObjectURL(file),
//         };

//         setUpdatedData((prev) => ({
//             ...prev,
//             materialImage: fileWithPreview,
//         }));
//     };

//     const handleMaterialItemChange = (e) => {
//         const file = e.target.files[0];
//         if (!file) return alert("Please select an image!");

//         const fileWithPreview = {
//             file,
//             preview: URL.createObjectURL(file),
//         };

//         setUpdatedData((prev) => ({
//             ...prev,
//             materialItems: [...(prev.materialItems || []), fileWithPreview],
//         }));
//     };

//     const handleDeleteMaterialItem = (index) => {
//         setUpdatedData((prev) => ({
//             ...prev,
//             materialItems: prev.materialItems.filter((_, i) => i !== index),
//         }));
//     };


//     const handleSaveChanges = async () => {
//         try {
//             const updatedMaterial = { ...updatedData };

//             // Compress and upload the material image if it's a new file
//             if (updatedMaterial.materialImage?.file) {
//                 if (updatedMaterial.materialImage.file.type === "image/svg+xml") {
//                     // Handle SVG directly
//                     const svgData = await new Promise((resolve, reject) => {
//                         const reader = new FileReader();
//                         reader.onload = () => resolve(reader.result);
//                         reader.onerror = reject;
//                         reader.readAsText(updatedMaterial.materialImage.file);
//                     });
//                     updatedMaterial.materialImage = svgData; // Save SVG data directly
//                 } else {
//                     // Handle non-SVG files
//                     const compressedFile = await imageCompression(updatedMaterial.materialImage.file, {
//                         maxSizeMB: 1, // Maximum size in MB
//                         maxWidthOrHeight: 1920, // Maximum width or height
//                         useWebWorker: true, // Use a web worker for faster compression
//                     });

//                     const formData = new FormData();
//                     formData.append("image", compressedFile);

//                     const response = await axios.post("/api/handlers/admin/uploadToImgur", formData);
//                     updatedMaterial.materialImage = response.data.url; // Replace blob with uploaded URL
//                 }
//             }

//             // Compress and upload new material items
//             if (updatedMaterial.materialItems) {
//                 const uploadedItems = await Promise.all(
//                     updatedMaterial.materialItems.map(async (item) => {
//                         if (item.file) {
//                             if (item.file.type === "image/svg+xml") {
//                                 // Handle SVG files directly
//                                 const svgData = await new Promise((resolve, reject) => {
//                                     const reader = new FileReader();
//                                     reader.onload = () => resolve(reader.result);
//                                     reader.onerror = reject;
//                                     reader.readAsText(item.file);
//                                 });
//                                 return svgData; // Save SVG data directly
//                             } else {
//                                 // Compress and upload non-SVG images
//                                 const compressedFile = await imageCompression(item.file, {
//                                     maxSizeMB: 1,
//                                     maxWidthOrHeight: 1920,
//                                     useWebWorker: true,
//                                 });

//                                 const formData = new FormData();
//                                 formData.append("image", compressedFile);

//                                 const response = await axios.post("/api/handlers/admin/uploadToImgur", formData);
//                                 return response.data.url; // Return the uploaded URL
//                             }
//                         }
//                         return item; // Keep existing URL
//                     })
//                 );
//                 updatedMaterial.materialItems = uploadedItems; // Replace items with final URLs
//             }

//             // Dispatch the updated data to Redux and backend
//             await dispatch(savePageData({ material: updatedMaterial }));
//             alert("Changes saved successfully!");
//         } catch (error) {
//             console.error("Error saving changes:", error);
//             alert("Failed to save changes. Please try again.");
//         }
//     };


//     return (
//         <div className={styles.Container}>
//             <div className={styles.ContentContainer}>
//                 <div className={styles.SectionContainer}>
//                     <div className={styles.TextContainer}>
//                         <textarea
//                             value={updatedData.text || ""}
//                             onChange={handleTextChange}
//                             placeholder="Enter material description..."
//                             className={styles.TextArea}
//                         />
//                     </div>
//                     <div className={styles.ImageContainer}>
//                         <div className={styles.FileInputWrapper}>
//                             <input
//                                 type="file"
//                                 id={`file-upload-new`}
//                                 onChange={handleImageChange}
//                                 className={styles.FileInputHidden}
//                             />
//                             <label htmlFor={`file-upload-new`} className={styles.CustomFileButton}>
//                                 Change Image
//                             </label>
//                         </div>
//                         {updatedData.materialImage ? (
//                             typeof updatedData.materialImage === "string" && updatedData.materialImage.startsWith("<svg") ? (
//                                 // Render SVG as raw HTML
//                                 <div
//                                     className={styles.SVGContainer}
//                                     dangerouslySetInnerHTML={{ __html: updatedData.materialImage }}
//                                 />
//                             ) : (
//                                 // Render non-SVG image
//                                 <Image
//                                     src={updatedData.materialImage.preview || updatedData.materialImage}
//                                     alt="Material Image"
//                                     width={300}
//                                     height={300}
//                                     className={styles.Image}
//                                 />
//                             )
//                         ) : (
//                             <span>No image selected</span>
//                         )}
//                         {/* <input
//                             type="file"
//                             onChange={handleImageChange}
//                             className={styles.FileInput}
//                         /> */}

//                     </div>
//                 </div>
//                 <div className={styles.ProductsContainer}>
//                     {updatedData.materialItems?.map((item, index) => (
//                         <div key={index} className={styles.ProductItem}>
//                             {typeof item === "string" && item.startsWith("<svg") ? (
//                                 <div
//                                     className={styles.SVGContainer}
//                                     dangerouslySetInnerHTML={{ __html: item }}
//                                 />
//                             ) : (
//                                 <Image
//                                     src={item.preview || item}
//                                     alt={`Material ${index}`}
//                                     width={150}
//                                     height={150}
//                                     className={styles.Image}
//                                 />
//                             )}
//                             <button onClick={() => handleDeleteMaterialItem(index)}>Delete</button>
//                         </div>
//                     ))}
//                     <div>
//                         <input
//                             type="file"
//                             onChange={handleMaterialItemChange}
//                             className={styles.FileInput}
//                         />
//                     </div>
//                 </div>
//                 <Button
//                     type="button"
//                     text="Save Changes"
//                     onClick={handleSaveChanges}
//                     customStyles={{ width: "255px" }}
//                 />
//             </div>
//         </div >
//     );
// };

// export default adminWrapper(AdminMaterialsSection);























import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import styles from "./index.module.css";
import Image from "next/image";
import { savePageData } from "@/redux/slices/adminSlice";
import adminWrapper from "@/components/wrappers/adminWrapper";
import imageCompression from "browser-image-compression";
import Button from "@/components/buttons/PrimaryButton";

const AdminMaterialsSection = () => {
    const dispatch = useDispatch();
    const { pageData } = useSelector((state) => state.admin);

    const [updatedData, setUpdatedData] = useState(pageData?.material || {});
    const fileInputRefs = useRef([]);

    useEffect(() => {
        setUpdatedData(pageData?.material || {});
    }, [pageData]);

    const handleTextChange = (e) => {
        const textarea = e.target;

        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;

        setUpdatedData((prev) => ({
            ...prev,
            text: textarea.value,
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

    const handleMaterialItemChange = (e, index) => {
        const file = e.target.files[0];
        if (!file) return alert("Please select an image!");

        const fileWithPreview = {
            file,
            preview: URL.createObjectURL(file),
        };

        setUpdatedData((prev) => {
            const materialItems = [...(prev.materialItems || [])];
            if (index !== undefined) {
                materialItems[index] = fileWithPreview; // Replace the specific image
            } else {
                materialItems.push(fileWithPreview); // Add a new image
            }
            return {
                ...prev,
                materialItems,
            };
        });
    };

    const handleDeleteMaterialItem = (index) => {
        setUpdatedData((prev) => ({
            ...prev,
            materialItems: prev.materialItems.filter((_, i) => i !== index),
        }));
    };

    const handleSaveChanges = async () => {
        try {
            const updatedMaterial = { ...updatedData };

            if (updatedMaterial.materialImage?.file) {
                if (updatedMaterial.materialImage.file.type === "image/svg+xml") {
                    const svgData = await new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result);
                        reader.onerror = reject;
                        reader.readAsText(updatedMaterial.materialImage.file);
                    });
                    updatedMaterial.materialImage = svgData;
                } else {
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
            }

            if (updatedMaterial.materialItems) {
                const uploadedItems = await Promise.all(
                    updatedMaterial.materialItems.map(async (item) => {
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
                updatedMaterial.materialItems = uploadedItems;
            }

            await dispatch(savePageData({ material: updatedMaterial }));
            alert("Changes saved successfully!");
        } catch (error) {
            console.error("Error saving changes:", error);
            alert("Failed to save changes. Please try again.");
        }
    };

    return (
        <div className={styles.Container}>
            <div className={styles.ContentContainer}>
                <div className={styles.SectionContainer}>
                    <div className={styles.TextContainer}>
                        <textarea
                            value={updatedData.text || ""}
                            onChange={handleTextChange}
                            placeholder="Enter material description..."
                            className={styles.TextArea}
                        />
                    </div>
                    <div className={styles.ImageContainer}>
                        <div className={styles.FileInputWrapper}>
                            <input
                                type="file"
                                id={`file-upload-image`}
                                onChange={handleImageChange}
                                className={styles.FileInputHidden}
                            />
                            <label htmlFor={`file-upload-image`} className={styles.CustomFileButton}>
                                Change Image
                            </label>
                        </div>
                        {updatedData.materialImage ? (
                            typeof updatedData.materialImage === "string" &&
                                updatedData.materialImage.startsWith("<svg") ? (
                                <div
                                    className={styles.SVGContainer}
                                    dangerouslySetInnerHTML={{ __html: updatedData.materialImage }}
                                />
                            ) : (
                                <Image
                                    src={updatedData.materialImage.preview || updatedData.materialImage}
                                    alt="Material Image"
                                    width={280}
                                    height={200}
                                    className={styles.Image}
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
                            {typeof item === "string" && item.startsWith("<svg") ? (
                                <div
                                    className={styles.SVGContainer}
                                    dangerouslySetInnerHTML={{ __html: item }}
                                />
                            ) : (
                                <Image
                                    src={item.preview || item}
                                    alt={`Material ${index}`}
                                    width={150}
                                    height={150}
                                    className={styles.Image}
                                />
                            )}
                            <input
                                type="file"
                                ref={(el) => (fileInputRefs.current[index] = el)}
                                className={styles.FileInputHidden}
                                onChange={(e) => handleMaterialItemChange(e, index)}
                            />
                            <div className={styles.EditActionButtons}>
                                <div
                                    className={styles.EditButton}
                                    onClick={() => fileInputRefs.current[index]?.click()}
                                >
                                    Edit
                                </div>
                                <div
                                    className={styles.DeleteButton}
                                    onClick={() => handleDeleteMaterialItem(index)}
                                >
                                    Delete
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* <div>
                        <input
                            type="file"
                            onChange={(e) => handleMaterialItemChange(e)}
                            className={styles.FileInput}
                        />
                    </div> */}
                </div>

            </div>
            <div className={styles.MainButtons}>
                <div className={styles.FileInputWrapper}>
                    <input
                        type="file"
                        id={`file-upload-material`}
                        onChange={(e) => handleMaterialItemChange(e)}
                        className={styles.FileInputHidden}
                    />
                    <label htmlFor={`file-upload-material`} className={styles.CustomFileButton}>
                        Add Image
                    </label>
                </div>
                <Button
                    type="button"
                    text="Save Changes"
                    onClick={handleSaveChanges}
                    customStyles={{ width: "255px" }}
                />
            </div>
        </div>
    );
};

export default adminWrapper(AdminMaterialsSection);
