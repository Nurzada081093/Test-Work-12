import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import {randomUUID} from "node:crypto";
import Gallery from "./models/Gallery";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('gallery');
    } catch (e) {
        console.log('Collections were not presents, skipping drop!');
    }

    const [userMolly, userSally, userEmma] = await User.create(
        {
            username: 'Molly',
            password: '123',
            role: 'admin',
            token: randomUUID(),
            displayName: 'Molly Gordon',
            avatar: 'fixtures/Molly_Gordon.jpg',
        },
        {
            username: 'Sally',
            password: '123',
            role: 'user',
            token: randomUUID(),
            displayName: 'Sally Lau',
            avatar: 'fixtures/Sally_Lau.jpg',
        },
        {
            username: 'Emma',
            password: '123',
            role: 'user',
            token: randomUUID(),
            displayName: 'Emma Watson',
            avatar: 'fixtures/Emma_Watson.jpeg',
        },
    );

    await Gallery.create(
        {
            user: userMolly._id,
            title: 'Nature',
            gallery_image: 'fixtures/nature-1.jpg',
        },
        {
            user: userMolly._id,
            title: 'Nature',
            gallery_image: 'fixtures/nature-2.jpg',
        },
        {
            user: userSally._id,
            title: 'Nature',
            gallery_image: 'fixtures/nature-3.jpeg',
        },
        {
            user: userSally._id,
            title: 'Nature',
            gallery_image: 'fixtures/nature-4.jpeg',
        },
        {
            user: userSally._id,
            title: 'Flowers',
            gallery_image: 'fixtures/flowers-1.jpeg',
        },
        {
            user: userSally._id,
            title: 'Flowers',
            gallery_image: 'fixtures/flower-2.webp',
        },
        {
            user: userEmma._id,
            title: 'Flowers',
            gallery_image: 'fixtures/flower-3.webp',
        },
        {
            user: userEmma._id,
            title: 'Flowers',
            gallery_image: 'fixtures/flower-4.webp',
        },
        {
            user: userEmma._id,
            title: 'Flowers',
            gallery_image: 'fixtures/flower-5.webp',
        },
        {
            user: userEmma._id,
            title: 'Sunset',
            gallery_image: 'fixtures/Sunset-1.jpeg',
        },
        {
            user: userEmma._id,
            title: 'Sunset',
            gallery_image: 'fixtures/Sunset-2.jpeg',
        },
        {
            user: userEmma._id,
            title: 'Sunset',
            gallery_image: 'fixtures/sunset-3.webp',
        },
        {
            user: userEmma._id,
            title: 'Sunset',
            gallery_image: 'fixtures/Sunset-4.jpeg',
        },
        {
            user: userEmma._id,
            title: 'Sunset',
            gallery_image: 'fixtures/Sunset-5.jpeg',
        },
    );

    await db.close();
};

run().catch(console.error);