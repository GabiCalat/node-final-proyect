import { Notification } from "../models/notifications.models";

const sendNotification = async (req, res, next) => {

    const { to, message } = req.body;
    const { from } = req.authority;

    try {
        const newNotification = await Notification.create({

            message: message,
            to: to,
            from: from
        })
        if (newMessage) return res.json({ msg: "Message added succesfully." })
        return res.json({ msg: "Failed to add message." })
    } catch (error) {
        return next(error);
    }

}

const getAllMsg = async (req, res, next) => {

    const { to } = req.body;
    const { id: from } = req.authority;

    try {
        const messages = await Message.find({
            users: { $all: [from, to] }
        }).sort({ updatedAt: 1 })

        const mappedMessages = messages.map((message) => {
            return {
                fromSelf: message.sender.toString() === from,
                messageText: message.message
            }
        })

        return res.json(mappedMessages)
    } catch (error) {
        return next(error);
    }
}

export { addMsg, getAllMsg }
