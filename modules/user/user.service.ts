import {
  CONSTANT_RESPONSE,
  LOGICAL_ERRORS,
  PAGINATION,
} from '../core/utils/constant';
import UserCollection from './user.collection';
import { UpdateProfile, UserId } from './user.interface';

const getUsers = async () => {
  try {
    const aggregate = UserCollection.aggregate([
      {
        $project: {
          username: 1,
          role: 1,
        },
      }
    ])
    const paginate = {
      page: PAGINATION.PAGE,
      limit: PAGINATION.LIMIT,
    };
    const users = await UserCollection.aggregatePaginate(aggregate, paginate);

    return users;
  } catch (error) {
    throw error;
  }
};

const getUser = async ({ id }: UserId) => {
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

const updateProfile = async ({ id }: UserId, data: UpdateProfile) => {
  try {
    const user = await UserCollection.findByIdAndUpdate(
      id,
      { username: data.username },
      { new: true }
    );
    if (!user) {
      return LOGICAL_ERRORS.USER_NOT_FOUND;
    }

    return CONSTANT_RESPONSE.UPDATE;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async ({ id }: UserId) => {
  try {
    const user = await UserCollection.findByIdAndDelete(id);
    if (!user) {
      return LOGICAL_ERRORS.USER_NOT_FOUND;
    }

    return CONSTANT_RESPONSE.DELETE;
  } catch (error) {}
};

export { getUsers, getUser, updateProfile, deleteUser };
