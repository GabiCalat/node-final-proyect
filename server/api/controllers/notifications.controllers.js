import { Notification } from "../models/notifications.models.js";

const sendNotification = async (req, res, next) => {

    const { to, type, jobId } = req.body;
    const { from } = req.authority;

    try {
        const newNotification = await Notification.create({

            jobId: jobId,
            type: type,
            to: to,
            from: from
        })
        if (newNotification) return res.json("Notification send succesfully.")
        return res.json({ msg: "Failed to add send notification." })
    } catch (error) {
        return next(error);
    }

}

const getUserNotificationsById = async (req, res, next) => {

    const { id: to } = req.authority;

    try {
        const notifications = await Notification.find({ to: to})
        .sort({ updatedAt: -1 })

        return res.json(notifications)
    } catch (error) {
        return next(error);
    }
}

export {sendNotification, getUserNotificationsById }
