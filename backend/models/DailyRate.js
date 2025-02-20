import mongoose from 'mongoose';

const DailyRateSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dailyRate: { type: Number, required: true },
  notAllowedProducts: { type: [String], required: true },
  summaries: { type: [Object], default: [] },
});

const DailyRate = mongoose.model('DailyRate', DailyRateSchema);
export default DailyRate;
