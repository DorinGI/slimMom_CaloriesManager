import mongoose from 'mongoose';

const DailyLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  products: [
    {
      name: { type: String, required: true },
      calories: { type: Number, required: true },
    },
  ],
});

const DailyLog = mongoose.model('DailyLog', DailyLogSchema);

export default DailyLog;
