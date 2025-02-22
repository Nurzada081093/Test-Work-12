import express from "express";
import {Error} from "mongoose";
import User from "../models/User";
import {OAuth2Client} from "google-auth-library";
import config from "../config";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";

const client = new OAuth2Client(config.google.clientId);

const userRouter = express.Router();

userRouter.post("/google", async (req, res, next) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: req.body.credential,
            audience: config.google.clientId,
        });

        const payload = ticket.getPayload();

        if (!payload) {
            res.status(400).send({error: "Invalid credential. Google login error!"});
            return;
        }

        const email = payload.email;
        const id = payload.sub;
        const displayName = payload.name;
        const avatar = payload.picture;

        if (!email) {
            res.status(400).send({error: "No enough user data to continue!"});
            return;
        }

        let user = await User.findOne({googleId: id});

        if (!user) {
            user = new User({
                username: email,
                password: crypto.randomUUID(),
                googleId: id,
                displayName,
                avatar,
            });
        }

        user.generateToken();
        await user.save();
        res.send({user, message: 'Login with Google success!'});
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});

userRouter.post("/register", imagesUpload.single('avatar'), async (req, res, next) => {

    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            displayName: req.body.displayName,
            avatar: req.file && 'images' + req.file.filename,
        });

        user.generateToken();

        await user.save();
        res.send(user);
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});

userRouter.post("/sessions", async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username});

        if (!user) {
            res.status(400).send({error: "This username not found!"});
            return;
        }

        const isMatch = await user.checkPassword(req.body.password);

        if (!isMatch) {
            res.status(400).send({error: "This passwords is wrong!"});
            return;
        }

        user.generateToken();
        await user.save();

        res.send({
            message: "Username and password are correct!",
            user
        });

    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});

userRouter.delete('/sessions', auth, async (req, res, next) => {
    let reqWithAuth = req as RequestWithUser;
    const authUser = reqWithAuth.user;

    try {
        const user = await User.findOne({_id: authUser._id});
        if (user) {
            user.generateToken();
            await user.save();
            res.send({message: 'Success logout'});
        }
    } catch (e) {
        next(e);
    }
});

export default userRouter;