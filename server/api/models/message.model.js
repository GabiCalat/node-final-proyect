import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const messageSchema = new Schema(
    {
        message: {
            text: {
                type: String, required: true
            }
        },
        users: Array,
        sender: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
    },
    {
        timestamps: true,
    }
);

const Message = mongoose.model('Messages', messageSchema);

export { Message }