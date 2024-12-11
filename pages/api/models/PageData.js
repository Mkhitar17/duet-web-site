import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: {
        arm: { type: String, required: true },
        ru: { type: String, required: true },
        en: { type: String, required: true },
    },
    image: { type: String, required: true },
    size: { type: String, required: true },
    description: {
        arm: { type: String, required: true },
        ru: { type: String, required: true },
        en: { type: String, required: true },
    },
});


const PageDataSchema = new mongoose.Schema({
    pageData: {
        production: {
            coffee: { type: [ProductSchema], default: undefined },
            tea: { type: [ProductSchema], default: undefined },
            milkCoffee: { type: [ProductSchema], default: undefined },
        },
        about: {
            section1: {
                texts: {
                    arm: { type: String, default: "" },
                    ru: { type: String, default: "" },
                    en: { type: String, default: "" },
                },
                image: { type: String, default: "" },
            },
            section2: {
                texts: {
                    arm: { type: String, default: "" },
                    ru: { type: String, default: "" },
                    en: { type: String, default: "" },
                },
                image: { type: String, default: "" },
                smallImages: { type: [String], default: [] },
            },
        },
        material: {
            texts: {
                arm: { type: String, default: "" },
                ru: { type: String, default: "" },
                en: { type: String, default: "" },
            },
            materialImage: { type: String, default: "" },
            materialItems: { type: [ProductSchema], default: undefined },
        },
        partners: { type: [String], default: [] },
        contact: {
            phone: { type: String, default: "" },
            email: { type: String, default: "" },
            address: {
                arm: { type: String, default: "" },
                ru: { type: String, default: "" },
                en: { type: String, default: "" },
            },
        },
        banner: {
            images: { type: [String], default: [] },
            texts: {
                arm: {
                    primaryText: { type: String, default: "" },
                    secondaryText: { type: String, default: "" }
                },
                ru: {
                    primaryText: { type: String, default: "" },
                    secondaryText: { type: String, default: "" }
                },
                en: {
                    primaryText: { type: String, default: "" },
                    secondaryText: { type: String, default: "" }
                }
            }
        }
    },
});

const PageData = mongoose.models.PageData || mongoose.model("PageData", PageDataSchema, "pageData");
export default PageData;
