import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    originalPassword: {
        String
    },
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
    },
},
{ timestamps: true }
);

const User = mongoose.models.User||mongoose.model('User', userSchema);
export default User;