import { NextFunction, Request, Response } from 'express';
import {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  updateBlog,
} from '../service/blog.service';

export const createBlogHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createBlog({
      title: req.body.title,
      description: req.body.password,
      userId: req.body.userId,
    });

    return res.status(201).json({ msg: 'Create blog successfully!' });
  } catch (error) {
    throw error;
  }
};

export const getBlogsHandler = async (
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

export const getBlogHandler = async (
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

export const updateBlogHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result = await updateBlog(
      { id },
      { title: req.body.title, description: req.body.description }
    );

    return res.status(200).json(result);
  } catch (error) {
    throw error;
  }
};

export const deleteBlogHandler = async (
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
