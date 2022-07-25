import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const notificationsSchema = new Schema(
    {
        from: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
        to: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
        jobId: { type: mongoose.Types.ObjectId, ref: 'Job', required: true },
        view_status: { type: Boolean, required: true },
        type: { type: String, required: true }
    },
    {
        timestamps: true,
    }
);

const Notification = mongoose.model('Notification', notificationsSchema);

export { Notification }