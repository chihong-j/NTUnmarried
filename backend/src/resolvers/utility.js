import {createModel} from "mongoose-gridfs";
import { uuid } from 'uuidv4';
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv-defaults';
import { AuthenticationError } from "apollo-server-core";

dotenv.config();

const checkUser = (db, name, errFunc) => {
    console.log(db)
    if (!name) throw new Error("Missing user name for " + errFunc);
    return db.UserModel.findOne({ name });
};


// make sure calling checkUser beforehand
const newUser = (db, email, name, gender, age, password) => {
    return new db.UserModel({ email, name, gender, age, password }).save();
};

const saveImage = async (db, readStream, filename) => {
    const options = ({ filename: filename, contentType: 'image/png' });
    const instance = await db.container[0].write(options, readStream);
    return instance;
}

const retrieveImage = async (db, _id) => {
    return new Promise((resolve, reject) => {
        resolve(db.container[0].read({_id}));
    })
}

const readStreamToDataUrl = async (readStream) => {
    const buffers = [];
    readStream.on('readable', function(buffer) {
        for (;;) {
            let buffer = readStream.read();
            if (!buffer) { break; }
            buffers.push(buffer);
        }
    });

    return await new Promise((resolve, reject) => {
        readStream.on('end', function() {
            let buffer = Buffer.concat(buffers);
            resolve(`data:image/png;base64,${buffer.toString('base64')}`)
        })
    })
}

const createToken = ({ email }, secret) => jwt.sign({ email }, secret, { expiresIn: '1d' });

export {
    checkUser,
    newUser,
    saveImage,
    readStreamToDataUrl,
    retrieveImage,
    createToken
};