import {checkUser, newUser, saveImage, readStreamToDataUrl, createToken, retrieveImage} from "./utility";
import bcrypt from 'bcryptjs';
import {AuthenticationError} from "apollo-server-core";
import {UserModel} from "../db";

const Mutation = {
    async updateUser(parent, {email, gender, age, aboutMe, department}, {db, me}, info) {
        if (!me) throw new AuthenticationError('Not logged in');

        await db.UserModel.findOneAndUpdate({ email }, { gender, age, aboutMe, department});
        const user = db.UserModel.findOne({ email })
        return user;
    },

    async signup(parent, { email, name, password, gender, age, aboutMe, department }, { db }, info) {
        const user = await newUser(db, email, name, password, gender, age, aboutMe, department);
        console.log(user);
        return user ;
    },

    async login(parent, { email }, { db }, info) {
        const user = await db.UserModel.findOne({ email });
        if (!user) {
            throw new Error(`Email: ${email} not found!`)
        } else {
            console.log('create token');
            return {
                token: createToken(user, process.env.SECRET),
                password: user.password
            }
        }
    },

    async uploadFile(parent, { file }, { db, me }, info) {
        if (!me) throw new AuthenticationError('Not logged in');
        const { createReadStream, filename, mimetype, encoding } = await file;
        console.log(me.email);
        const user = await db.UserModel.findOne({ mail:me.email });
        console.log(user);
        console.log("here0");
        const readStream1 = createReadStream();
        const readStream2 = createReadStream();
        console.log("here1");
        const writeStream = await saveImage(db, readStream1, filename);
        console.log("here2");
        user.images.push(writeStream.id);
        console.log("here3");
        await user.save();
        console.log("here");
        return await readStreamToDataUrl(readStream2);
    },

};

export default Mutation;
