const Message = require("../models/message.model");

exports.addMessage = async (req, res) => {
    try {
        const newMessage = new Message({
            chatId: req.body.chatId,
            senderId: req.user._id,
            text: req.body.text,
        })
        await newMessage.save();
        res.send(newMessage);
    } catch (error) {
        res.status(500).send({
            status: 500,
            error: error.message,
        })
    }
}


exports.getMessage = async (req, res) => {
    const chatId = req.params.chatId;
    try {
        const messages = await Message.find({chatId});

        res.send(messages);
    } catch (error) {
        res.status(500).send({
            status: 500,
            error: error.message,
        })
    }
}