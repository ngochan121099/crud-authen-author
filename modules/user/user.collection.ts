import mongoose from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
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

userSchema.plugin(mongooseAggregatePaginate);
const UserCollection = mongoose.model('users', userSchema);

export default UserCollection;
