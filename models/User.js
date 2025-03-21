import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phoneNumber: { type: String, required: true, match: [/^\d{10}$/, "Invalid phone number format"] },
    bloodGroup: { type: String, required: true, enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'] },
    lastDonationDate: { type: Date },
    eligibleToDonate: { type: Boolean, default: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: String, required: true },
    availabilityStatus: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('User', userSchema)