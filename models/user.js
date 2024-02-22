import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        id: String,
        name: String,
        email: String,
        image: String,
        role: String,
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
