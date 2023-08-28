import { NextFunction, Request, Response } from 'express';
import {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  updateBlog,
} from './blog.service';

const createBlogHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createBlog({
      ...req.body,
    });

    return res.status(201).json({ msg: 'Create blog successfully!' });
  } catch (error) {
    throw error;
  }
};

const getBlogsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getBlogs();

    return res.status(200).json(result);
  } catch (error) {
    throw error;
  }
};

const getBlogHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result = await getBlog({ id });

    return res.status(200).json(result);
  } catch (error) {
    throw error;
  }
};

const updateBlogHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result = await updateBlog({ id }, { ...req.body });

    return res.status(200).json(result);
  } catch (error) {
    throw error;
  }
};

const deleteBlogHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result = await deleteBlog({ id });

    return res.status(200).json(result);
  } catch (error) {
    throw error;
  }
};

export {
  createBlogHandler,
  getBlogHandler,
  getBlogsHandler,
  updateBlogHandler,
  deleteBlogHandler,
};
