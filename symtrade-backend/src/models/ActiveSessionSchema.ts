import mongoose from 'mongoose';

const ActiveSessionSchema = new mongoose.Schema({
  token: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const ActiveSession = mongoose.model('ActiveSession', ActiveSessionSchema);

export default ActiveSession;