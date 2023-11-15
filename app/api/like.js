import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const likeSchema = new Schema ({
    postId: {
        type: String
    },
    username: {
        type: String
    },
    forum: {
        type: String
    }
})

export default mongoose.models.Like || mongoose.model('Like', likeSchema)