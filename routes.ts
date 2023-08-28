import express from 'express';
import authRoutes from './modules/user/auth.index';
import blogRoutes from './modules/blog/blog.index';
import userRoutes from './modules/user/user.index';

export default (app: express.Application): void => {
  authRoutes(app);
  blogRoutes(app);
  userRoutes(app);
};
