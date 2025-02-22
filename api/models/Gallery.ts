import mongoose from "mongoose";

const Schema = mongoose.Schema;

const GallerySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    gallery_image: {
        type: String,
        required: [true, 'Image is required'],
    }
});

const Gallery = mongoose.model("Gallery", GallerySchema);
export default Gallery;