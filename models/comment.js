import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const commentSchema = new Schema ({
    postId: { type: String },
    content: { type: String },
    username: { type: String },
    postingtime: {
        type: Date,
        default: Date.now,
        get(value) {
            var offset = 8; 
            var utc = value.getTime() + (value.getTimezoneOffset() * 60000);
            var date = new Date(utc + (3600000 * offset));
            return date.toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
        },
        immutable: true,
    }
});

export default mongoose.models.Comment || mongoose.model('Comment', commentSchema);