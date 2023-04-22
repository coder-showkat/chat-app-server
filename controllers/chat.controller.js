const Chat = require("../models/chat.model");

exports.createChat = async (req, res) => {
    try {
        const newChat = new Chat({
            members: [req.body.senderId, req.body.receiverId]
        });

        await newChat.save();
        res.send(newChat);
    
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
            members: {$in: [req.params.userId]}
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