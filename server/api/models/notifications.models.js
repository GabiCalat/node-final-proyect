import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const notificationsSchema = new Schema(
    {
        from: { type: mongoose.Types.ObjectId, ref: 'User', required: false },
        to: { type: mongoose.Types.ObjectId, ref: 'User', required: false },
        jobId: { type: mongoose.Types.ObjectId, ref: 'Job', required: false },
        type: { type: String, required: true }
    },
    {
        timestamps: true,
    }
);

const Notification = mongoose.model('Notification', notificationsSchema);

export { Notification }