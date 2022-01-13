import {createModel} from "mongoose-gridfs";
import { uuid } from 'uuidv4';
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv-defaults';
import { AuthenticationError } from "apollo-server-core";

dotenv.config();

const checkUser = (db, email, errFunc) => {
    if (!email) throw new Error("Missing user name for " + errFunc);
    return db.UserModel.findOne({ email });
};


// make sure calling checkUser beforehand
const newUser = (db, email, name, password, gender, age, aboutMe, department) => {
    return new db.UserModel({ email, name, password, gender, age, aboutMe, department }).save();
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

const populateImg = async (db, user, numImg) => {
    let readStream;
    const { _id: id, email, name, gender, age, aboutMe, department } = user;
    if (user.images.length === 0) return { id, email, name, gender, age, aboutMe, department, images: []};
    const images = [];
    for (let i = 0; i < numImg; ++i) {
        readStream = await retrieveImage(db, user.images[i]);
        images.push(await readStreamToDataUrl(readStream));
    }
    return { id, email, name, gender, age, aboutMe, department, images};
}

const newChatBox = (db, name) => {
    return new db.ChatBoxModel({ name}).save();
}

const checkChatBox = (db, name, errFunc) => {
    if (!name) throw new Error("Missing chatBox name for " + errFunc);
    return db.ChatBoxModel.findOne({ name });
};

const checkMessage = async (db, from, to, message, errFunc) => {
    const chatBoxName = [from, to].sort().join('$');
    return {
        chatBox: await checkChatBox(db, chatBoxName, errFunc),
        sender: await checkUser(db, from, errFunc),
        to: await checkUser(db, to, errFunc)
    }
};

// make sure calling checkMessage beforehand
const newMessage = async (db, sender, body) => {
    const s = await new db.MessageModel({ sender, body }).save();
    console.log(s);
    return s;
};

export {
    checkUser,
    newUser,
    saveImage,
    readStreamToDataUrl,
    retrieveImage,
    createToken,
    populateImg,
    newChatBox,
    checkMessage,
    newMessage,
    checkChatBox
};
