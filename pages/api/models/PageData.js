import mongoose from "mongoose";

const PageDataSchema = new mongoose.Schema({
    pageData: {
        production: {
            coffee: { type: [String], default: undefined },
            tea: { type: [String], default: undefined },
            milkCoffee: { type: [String], default: undefined },
        },
        about: {
            section1: {
                text: { type: String, default: "" },
                image: { type: String, default: "" },
            },
            section2: {
                text: { type: String, default: "" },
                image: { type: String, default: "" },
                smallImages: { type: [String], default: [] },
            },
        },
        material: {
            text: { type: String, default: undefined },
            materialItems: { type: [String], default: undefined },
            materialImage: { type: String, default: undefined },
        },
        partners: { type: [String], default: [] },
        contact: {
            phone: { type: String, default: "" },
            email: { type: String, default: "" },
            address: { type: String, default: "" },
        },
        banner: { type: String, default: "" },
    },
});

// Force re-creation of the model to ensure changes take effect
const PageData = mongoose.models.PageData || mongoose.model("PageData", PageDataSchema, "pageData");
export default PageData;
