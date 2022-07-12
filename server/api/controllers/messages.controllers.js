import { Message } from "../models/message.model.js";

const addMsg = async (req, res, next) => {

    const { from, to, message } = req.body;

    try {
        const newMessage = await Message.create({
            message: { text: message },
            users: [from, to],
            sender: from
        })
        if (newMessage) return res.json({ msg: "Message added succesfully." })
        return res.json({ msg: "Failed to add message." })
    } catch (error) {
        return next(error);
    }


}

const getAllMsg = async (req, res, next) => {

    const { from, to } = req.body;

    try {
        const messages = await Message.find({
            users: { $all: [from, to] }
        }).sort({ updatedAt: 1 })

        const mappedMessages = messages.map((message) => {
            return {
                fromSelf: message.sender.toString() === from,
                messageText: message.message.text
            }
        })

        return res.json(mappedMessages)
    } catch (error) {
        return next(error);
    }
}

export { addMsg, getAllMsg }
