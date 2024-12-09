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
        const updatedPageData = await PageData.findOneAndUpdate(
            { }, // Use the found document's _id
            { $set: { pageData: updates } }, // Update fields
            { new: true } // Return the updated document and create it if it doesn't exist
        );

        return updatedPageData;
    } catch (error) {
        console.error("Error updating page data:", error);
        throw new Error("Failed to update page data.");
    }
}



/**
 * Fetch a product by ID from the production categories.
 * @param {string} id - The ID of the product to fetch.
 * @returns {object|null} - The product if found, or null if not found.
 */
export const getProductById = async (id) => {
    try {
      // Find the specific item by id in any of the production categories
      const document = await PageData.findOne({
        $or: [
          { "pageData.production.coffee._id": id },
          { "pageData.production.tea._id": id },
          { "pageData.production.milkCoffee._id": id },
        ],
      });
  
      if (!document) {
        return null;
      }
  
      // Search for the item in each category
      const { coffee, tea, milkCoffee } = document.pageData.production;
      const item =
        coffee.find((item) => item._id.toString() === id) ||
        tea.find((item) => item._id.toString() === id) ||
        milkCoffee.find((item) => item._id.toString() === id);
  
      return item || null;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw new Error("Failed to fetch product");
    }
  };