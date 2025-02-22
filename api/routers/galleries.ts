import express from "express";
import {Error} from "mongoose";
import Gallery from "../models/Gallery";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import {IImage} from "../types";
import permit from "../middleware/permit";

const galleryRouter = express.Router();

galleryRouter.get('/', async (req, res, next) => {
    const authorIdQuery = req.query.author;

    try {
        const filter = authorIdQuery ? {user: authorIdQuery} : {};
        const images = await Gallery.find(filter).populate('user', '_id displayName role avatar googleId');
        res.send(images);
    } catch (e) {
        next(e);
    }
});

galleryRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;

    if (!req.params.id) {
        res.status(404).send({error: 'Image id not found!'});
    }

    try {
        const image = await Gallery.findById(id).populate('user', '_id displayName role avatar');

        if (!image) {
            res.status(404).send({error: 'Image not found'});
        }

        res.send(image);
    } catch (e) {
        next(e);
    }
});

galleryRouter.post('/', imagesUpload.single('gallery_image'), auth, async (req, res, next) => {
    let expressReq = req as RequestWithUser;
    const user = expressReq.user;

    const newGalleryImage: IImage = {
        user,
        title: req.body.title,
        gallery_image: req.file && 'images' + req.file.filename,
    };

    try {
        const galleryImage = new Gallery(newGalleryImage);
        await galleryImage.save();
        res.send(galleryImage);
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});

galleryRouter.delete("/:id", auth, permit('admin', 'user'), async (req, res, next) => {
    let expressReq = req as RequestWithUser;
    const imageId = expressReq.params.id;
    const user = expressReq.user;

    try {
        const image = await Gallery.findById(imageId);

        if (!image) {
            res.status(404).send({error: 'This image not found!'});
            return;
        }

        if (user._id.toString() === image.user._id.toString()) {
            await image.deleteOne();
            res.send({message: `This image was successfully deleted by ${user.displayName}!`});
            return;
        }

        if (user.role === 'admin') {
            await image.deleteOne();
            res.send({message: "This image was successfully deleted by admin!"});
            return;
        }

        res.status(403).send({error: 'Your role is not admin! You don\'t have access to delete this album!'});
    } catch (error) {
        next(error);
    }
});

export default galleryRouter;