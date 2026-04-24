import mongoose from 'mongoose';

const domainSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  status: { type: String, enum: ['Actif', 'En attente', 'Expiré'], default: 'En attente' },
  expiryDate: { type: Date },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  price: { type: Number, required: true, default: 9.99 }
}, { timestamps: true });

export default mongoose.model('Domain', domainSchema);
