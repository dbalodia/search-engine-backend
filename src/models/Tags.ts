import mongoose from "mongoose";

export type TagsDocument = mongoose.Document & {
    tags: string;
    links: string;
    description: string;
    title: string;
    isEntityActive: boolean;
};

const tagsSchema = new mongoose.Schema({
    tags: String,
    links: String,
    description: String,
    title: String,
    isEntityActive: { type: Boolean, default: true },
}, { timestamps: true });

/**
 * Password hash middleware.
 */

const TagsDataStorage = mongoose.model("tags", tagsSchema, "tags");

const createEntity = (data: object | Array<object>) => TagsDataStorage.create(data);

const getEntity = ({ qryFields }: { qryFields: object }) => TagsDataStorage.findOne(qryFields);

const getEntities = ({ qryFields }: { qryFields: object }) => TagsDataStorage.find(qryFields).sort({ updatedAt: -1 });
export const Models = {
    createEntity,
    getEntity,
    getEntities,

};

export default Models;
