import express from 'express';
import blogRoutes from './modules/blog/index/blog.index';
import authRoutes from './modules/user/index/auth.index';
import userRoutes from './modules/user/index/user.index';

export default (app: express.Application): void => {
  authRoutes(app);
  blogRoutes(app);
  userRoutes(app);
};
