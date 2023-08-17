import { LOGICAL_ERRORS } from '../../utils/constant';
import UserCollection from '../collection/user.collection';
import { UpdateProfile, UserId, UserList } from '../interface/user.interface';

export const getUsers = async () => {
  try {
    const users = UserCollection.find();

    return users;
  } catch (error) {
    throw error;
  }
};

export const getUser = async ({ id }: UserId) => {
  try {
    const findUser = await UserCollection.findOne({ id });
    if (!findUser) {
      return LOGICAL_ERRORS.USER_NOT_FOUND;
    }

    return findUser;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async ({ id }: UserId, data: UpdateProfile) => {
  try {
    const user = await UserCollection.findByIdAndUpdate(
      id,
      { username: data.username },
      { new: true }
    );
    if (!user) {
      return LOGICAL_ERRORS.USER_NOT_FOUND;
    }

    return user;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async ({ id }: UserId) => {
  try {
    const user = await UserCollection.findByIdAndDelete(id);
    if (!user) {
      return LOGICAL_ERRORS.USER_NOT_FOUND;
    }

    return user;
  } catch (error) {}
};
