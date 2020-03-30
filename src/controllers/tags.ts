import { Request, Response, NextFunction } from "express";
import { check, sanitize, validationResult } from "express-validator";
import TagsModels from "../models/Tags";
export const createTags = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tagsData = {
            title: req.body.title,
            tags: req.body.tags,
            links: req.body.links,
            description: req.body.description,
        };
        const mongoRes = await TagsModels.createEntity(tagsData);
        res.status(200).send({ data: mongoRes });
        return next(false);

    } catch (err) {
        res.status(500).send({ err, code: 500 });
        return next(false);
    }
};
export const getTags = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const mongoRes = await TagsModels.getEntities({ qryFields: { tags: { "$regex": req.query.tags || "" } } });
        res.status(200).send({ data: mongoRes });
        return next(false);

    } catch (err) {
        res.status(500).send({ err, code: 500 });
        return next(false);
    }
};