import express from 'express';
import {
  createBlogHandler,
  deleteBlogHandler,
  getBlogHandler,
  getBlogsHandler,
  updateBlogHandler,
} from '../controller/blog.controller';
import verifyToken from '../../user/middleware/verify.middleware';

const blogRoutes = (app: express.Application): void => {
  app.get('/blog/allblogs', getBlogsHandler);
  app.get('/blog/:id', getBlogHandler);
  app.post('/blog/create', createBlogHandler);
  app.put('/blog/:id', verifyToken, updateBlogHandler);
  app.delete('/blog/:id', verifyToken, deleteBlogHandler);
};

export default blogRoutes;
