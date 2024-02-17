import mongoose from 'mongoose';

const { Schema } = mongoose;

const interventionSchema = new Schema(
    {
        nom: String,
        prenom: String,
        email: String,
        telephone: String,
        adresse_postale: String,
        message: String,
        inquiry_type: String,
        status_inquiry: {
            type: String,
            default: 'non_consulte'
        }
    },
    {
        timestamps: true,
    }
);

const Intervention = mongoose.models.Intervention || mongoose.model('Intervention', interventionSchema);

export default Intervention;
