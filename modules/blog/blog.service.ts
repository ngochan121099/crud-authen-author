import mongoose from 'mongoose';
import { CONSTANT_RESPONSE, LOGICAL_ERRORS, PAGINATION } from '../core/utils/constant';
import BlogCollection from './blog.collection';
import { BlogId, BlogList, UpdateBlog } from './blog.interface';

const createBlog = async (blog: BlogList) => {
  try {
    const newBlog = await BlogCollection.create(blog);
    return newBlog;
  } catch (error) {
    throw error;
  }
};

const getBlogs = async () => {
  try {
    const findBlogs = BlogCollection.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'author',
        },
      },
      {
        $project: {
          title: 1,
          description: 1,
          'author.username': 1,
          'author._id': 1,
        },
      },
    ]);

    const pagination = {
      page: PAGINATION.PAGE,
      limit: PAGINATION.LIMIT,
    };

    const blogs = await BlogCollection.aggregatePaginate(findBlogs, pagination);

    return blogs;
  } catch (error) {
    throw error;
  }
};

const getBlog = async ({ id }: BlogId) => {
  try {
    const findBlog = BlogCollection.aggregate(
      [
        {
          $match: { _id: new mongoose.Types.ObjectId(id) },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'author',
          },
        },
        {
          $project: {
            title: 1,
            description: 1,
            views: 1,
            likes: 1,
            is_deleted: 1,
            'author.username': 1,
            'author._id': 1,
          },
        },
      ],
    );
    if (!findBlog) {
      return LOGICAL_ERRORS.BLOG_NOT_FOUND;
    }

    return findBlog;
  } catch (error) {
    throw error;
  }
};

const updateBlog = async ({ id }: BlogId, data: UpdateBlog) => {
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

const deleteBlog = async ({ id }: BlogId) => {
  try {
    const deletedBlog = await BlogCollection.findByIdAndDelete(id);
    if (!deletedBlog) {
      return LOGICAL_ERRORS.BLOG_NOT_FOUND;
    }
    return { msg: CONSTANT_RESPONSE.DELETE };
  } catch (error) {
    throw error;
  }
};

export { getBlogs, getBlog, createBlog, updateBlog, deleteBlog };
