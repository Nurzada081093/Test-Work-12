import mongoose, {HydratedDocument, Model} from "mongoose";
import bcrypt from "bcrypt";
import {randomUUID} from "node:crypto";
import {UserData} from "../types";

interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

type UserModel = Model<UserData, {}, UserMethods>;

const Schema = mongoose.Schema;

const  HASHING_PASSWORD = 10;

const UserSchema = new Schema<HydratedDocument<UserData>, UserModel, UserMethods>({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        validate: {
            validator: async function (this:HydratedDocument<UserData> , value: string): Promise<boolean> {
                if (!this.isModified('username')) return true;
                const user: UserData | null = await User.findOne({username: value});
                return !user;
            },
            message: 'This username is already in taken!',
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        default: 'user',
        enum: ['user', 'admin'],
    },
    token: {
        type: String,
        required: [true, 'Token is required'],
    },
    displayName: {
        type: String,
        required: [true, 'Display name is required'],
    },
    googleId: {
        type: String,
        default: null,
    },
    avatar: {
        type: String,
        required: [true, 'Avatar is required'],
    },
});

UserSchema.pre("save", async function (next) {

    if (!this.isModified("password")) return next();

    const hashingPassword = await bcrypt.genSalt(HASHING_PASSWORD);
    this.password = await bcrypt.hash(this.password, hashingPassword);
    next();
});

UserSchema.methods.checkPassword = function (password:string) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
    this.token = randomUUID();
};

UserSchema.set('toJSON', {
    transform: (_doc, ret, _options) => {
        delete ret.password;
        return ret;
    }
});

const User = mongoose.model('User', UserSchema);
export default User;