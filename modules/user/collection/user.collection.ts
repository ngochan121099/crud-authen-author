import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    require: true,
  }
});

const UserCollection = mongoose.model('users', userSchema);

export default UserCollection;
