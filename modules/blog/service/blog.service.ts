import { LOGICAL_ERRORS } from '../../utils/constant';
import BlogCollection from '../collection/blog.collection';
import { BlogId, BlogList, UpdateBlog } from '../interface/blog.interface';

export const createBlog = async (blog: BlogList) => {
  try {
    const newBlog = await BlogCollection.create(blog);
    return newBlog;
  } catch (error) {
    throw error;
  }
};

export const getBlogs = async () => {
  try {
    const allBlogs = await BlogCollection.find().populate('userId');
    return allBlogs;
  } catch (error) {
    throw error;
  }
};

export const getBlog = async ({ id }: BlogId) => {
  try {
    const blog = await BlogCollection.findById(id).populate('userId');

    if (!blog) {
      return LOGICAL_ERRORS.BLOG_NOT_FOUND;
    }

    return blog;
  } catch (error) {
    throw error;
  }
};

export const updateBlog = async ({ id }: BlogId, data: UpdateBlog) => {
  try {
    const updatedBlog = await BlogCollection.findByIdAndUpdate(
      id,
      {
        title: data.title,
        description: data.description,
      },
      {
        new: true,
      }
    ).populate('userId');
    if (!updatedBlog) {
      return LOGICAL_ERRORS.BLOG_NOT_FOUND;
    }

    return updatedBlog;
  } catch (error) {
    throw error;
  }
};

export const deleteBlog = async ({ id }: BlogId) => {
  try {
    const deletedBlog = await BlogCollection.findByIdAndDelete(id);
    if (!deletedBlog) {
      return LOGICAL_ERRORS.BLOG_NOT_FOUND;
    }
    return { msg: 'Deleted!' };
  } catch (error) {
    throw error;
  }
};
