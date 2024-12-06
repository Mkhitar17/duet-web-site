import PageData from "@/pages/api/models/PageData";
import mongoose from "mongoose";

/**
 * Fetch all documents from the pageData collection.
 * Always returns the data as an array, even if there's only one document.
 * 
 * @returns {Array} An array of all documents in the pageData collection
 * @throws {Error} If there's a database error
 */
export const fetchAllPageData = async () => {
    try {
        const pageDataArray = await PageData.find({}); // Fetch all documents
        return pageDataArray; // Return as an array
    } catch (error) {
        console.error("Error fetching data from pageData collection:", error);
        throw new Error("Failed to fetch data from pageData collection.");
    }
};


/**
 * Update page data in the database
 * @param {Object} updates - Object containing updated data
 * @returns {Object} Updated page data
 */

export const updatePageData = async (updates) => {
    try {
        const existingDocument = await PageData.findOne({});
        if (!existingDocument) {
            throw new Error("No PageData document found in the collection.");
        }
        console.log(updates,"$$$$####$#$#$#$#$#$#$#$34")

        
        const updatedPageData = await PageData.findOneAndUpdate(
            { }, // Use the found document's _id
            { $set: { pageData: updates } }, // Update fields
            { new: true } // Return the updated document and create it if it doesn't exist
        );

        console.log(updatedPageData,"################")
        return updatedPageData;
    } catch (error) {
        console.error("Error updating page data:", error);
        throw new Error("Failed to update page data.");
    }
}