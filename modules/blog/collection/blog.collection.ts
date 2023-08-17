import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "users",
  }
});

const BlogCollection = mongoose.model('blogs', blogSchema);

export default BlogCollection;
