// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
// import imageCompression from "browser-image-compression";
// import { savePageData } from "@/redux/slices/adminSlice";
// import adminWrapper from "@/components/wrappers/adminWrapper";
// import styles from "./index.module.css";
// import Image from "next/image";
// import Button from "@/components/buttons/PrimaryButton";

// const AdminPartnersSection = () => {
//     const dispatch = useDispatch();
//     const { pageData } = useSelector((state) => state.admin);
//     const [updatedPartners, setUpdatedPartners] = useState(pageData?.partners || []);

//     useEffect(() => {
//         setUpdatedPartners(pageData?.partners || []);
//     }, [pageData]);

//     const handlePartnerImageChange = (e) => {
//         const file = e.target.files[0];
//         if (!file) return alert("Please select an image!");

//         const fileWithPreview = {
//             file,
//             preview: URL.createObjectURL(file),
//         };

//         setUpdatedPartners((prev) => [...prev, fileWithPreview]);
//     };

//     const handleDelete = (index) => {
//         setUpdatedPartners((prev) => prev.filter((_, i) => i !== index));
//     };

//     const handleSaveChanges = async () => {
//         try {
//             const finalPartners = await Promise.all(
//                 updatedPartners.map(async (item) => {
//                     if (item.file) {
//                         if (item.file.type === "image/svg+xml") {
//                             // Handle SVG file directly
//                             const svgData = await new Promise((resolve, reject) => {
//                                 const reader = new FileReader();
//                                 reader.onload = () => resolve(reader.result);
//                                 reader.onerror = reject;
//                                 reader.readAsText(item.file);
//                             });
//                             return svgData;
//                         } else {
//                             const compressedFile = await imageCompression(item.file, {
//                                 maxSizeMB: 1,
//                                 maxWidthOrHeight: 1920,
//                                 useWebWorker: true,
//                             });
//                             const formData = new FormData();
//                             formData.append("image", compressedFile);

//                             const response = await axios.post("/api/handlers/admin/uploadToImgur", formData);
//                             return response.data.url;
//                         }
//                     }
//                     return item;
//                 })
//             );

//             dispatch(savePageData({ partners: finalPartners }));
//             alert("Changes saved successfully!");
//         } catch (error) {
//             console.error("Error saving changes:", error);
//             alert("Failed to save changes.");
//         }
//     };

//     return (
//         <div className={styles.Container}>
//             <h2>Partners</h2>
//             <div className={styles.PartnersContainer}>
//                 {updatedPartners.map((item, index) => (
//                     <div key={index} className={styles.ImageItem}>
//                         {typeof item === "string" && item.startsWith("<svg") ? (
//                             <div
//                                 className={styles.SVGContainer}
//                                 dangerouslySetInnerHTML={{ __html: item }}
//                             />
//                         ) : item.preview ? (
//                             <Image
//                                 src={item.preview}
//                                 alt={`New Partner ${index}`}
//                                 className={styles.PreviewImage}
//                                 width={200}
//                                 height={100}
//                             />
//                         ) : (
//                             <Image
//                                 src={item}
//                                 alt={`Partner ${index}`}
//                                 className={styles.PreviewImage}
//                                 width={200}
//                                 height={100}
//                             />
//                         )}
//                         {/* <button onClick={() => handleDelete(index)}>Delete</button> */}
//                     </div>
//                 ))}
//             </div>

//             <div className={styles.FileInputWrapper}>
//                 <input
//                     type="file"
//                     id={`file-upload`}
//                     onChange={handlePartnerImageChange}
//                     className={styles.FileInputHidden}
//                 />
//                 <label htmlFor={`file-upload`} className={styles.CustomFileButton}>
//                     Add Image
//                 </label>
//             </div>

//             <Button
//                 type="button"
//                 text="Save Changes"
//                 onClick={handleSaveChanges}
//                 customStyles={{ width: "255px" }}
//             />
//         </div>
//     );
// };

// export default adminWrapper(AdminPartnersSection);




























import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import imageCompression from "browser-image-compression";
import { savePageData } from "@/redux/slices/adminSlice";
import adminWrapper from "@/components/wrappers/adminWrapper";
import styles from "./index.module.css";
import Image from "next/image";
import Button from "@/components/buttons/PrimaryButton";

const AdminPartnersSection = () => {
    const dispatch = useDispatch();
    const { pageData } = useSelector((state) => state.admin);
    const [updatedPartners, setUpdatedPartners] = useState(pageData?.partners || []);
    const fileInputRefs = useRef([]);

    useEffect(() => {
        setUpdatedPartners(pageData?.partners || []);
    }, [pageData]);

    const handlePartnerImageChange = (e, index) => {
        const file = e.target.files[0];
        if (!file) return alert("Please select an image!");

        const fileWithPreview = {
            file,
            preview: URL.createObjectURL(file),
        };

        setUpdatedPartners((prev) => {
            const updatedItems = [...prev];
            if (index !== undefined) {
                // Replace the specific image
                updatedItems[index] = fileWithPreview;
            } else {
                // Add a new image
                updatedItems.push(fileWithPreview);
            }
            return updatedItems;
        });
    };

    const handleDelete = (index) => {
        setUpdatedPartners((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSaveChanges = async () => {
        try {
            const finalPartners = await Promise.all(
                updatedPartners.map(async (item) => {
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

            dispatch(savePageData({ partners: finalPartners }));
            alert("Changes saved successfully!");
        } catch (error) {
            console.error("Error saving changes:", error);
            alert("Failed to save changes.");
        }
    };

    return (
        <div className={styles.Container}>
            <div className={styles.PartnersContainer}>
                {updatedPartners.map((item, index) => (
                    <div key={index} className={styles.ImageItem}>
                        {typeof item === "string" && item.startsWith("<svg") ? (
                            // SVG Handling
                            <div
                                className={styles.SVGContainer}
                                dangerouslySetInnerHTML={{ __html: item }}
                            />
                        ) : (
                            // Non-SVG Images
                            <Image
                                src={item.preview || item}
                                alt={`Partner ${index}`}
                                className={styles.RasterImage}
                                width={200}
                                height={150}
                            />
                        )}
                        <input
                            type="file"
                            ref={(el) => (fileInputRefs.current[index] = el)}
                            className={styles.FileInputHidden}
                            onChange={(e) => handlePartnerImageChange(e, index)}
                        />
                        <div className={styles.EditActionButtonsContainer}>
                            <div
                                className={styles.EditButton}
                                onClick={() => fileInputRefs.current[index]?.click()}
                            >
                                Edit
                            </div>
                            <div
                                className={styles.DeleteButton}
                                onClick={() => handleDelete(index)}
                            >
                                Delete
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            <div className={styles.FileInputWrapper}>
                <input
                    type="file"
                    id={`file-upload-new`}
                    onChange={(e) => handlePartnerImageChange(e)}
                    className={styles.FileInputHidden}
                />
                <label htmlFor={`file-upload-new`} className={styles.CustomFileButton}>
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
    );
};

export default adminWrapper(AdminPartnersSection);
