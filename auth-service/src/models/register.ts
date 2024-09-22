import mongoose from 'mongoose';

const lenderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  identification: { type: String, required: true },
  birthDate: { type: Date, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const Lender = mongoose.model('Lender', lenderSchema);

