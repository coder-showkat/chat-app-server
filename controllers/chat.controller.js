const Chat = require("../models/chat.model");
const User = require("../models/user.model");

exports.createChat = async (req, res) => {
    const email = req.params.email;
    try {
        const findUser = await User.findOne({email});
        if (!findUser) throw new Error("No user by this email");
        const newChat = new Chat({
            members: [req.user._id, findUser._id]
        });

        await newChat.save();
        res.status(201).send(newChat);
    
    } catch (error) {
        res.status(500).send({
            status: 500,
            error: error.message,
        })
    }

}


exports.userChats = async (req, res) => {
    try {
        const chat = await Chat.find({
            members: {$in: [req.user._id]}
        })

        res.send(chat);
    } catch (error) {
        res.status(500).send({
            status: 500,
            error: error.message,
        })
    }
}


exports.findChat = async (req, res) => {
    try {
        const chat = await Chat.findOne({
            members: {$all: [req.params.firstId, req.params.secondId]}
        });
        
        res.send(chat);
    } catch (error) {
        res.status(500).send({
            status: 500,
            error: error.message,
        })
    }
}