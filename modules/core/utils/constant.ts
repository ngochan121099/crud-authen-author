const LOGICAL_ERRORS = {
  SOMETHING_WRONG: {
    msg: 'Something is wrong',
    statusCode: 500,
  },
  UNAUTHENTICATED: {
    msg: 'Unauthenticated!',
    statusCode: 401,
  },
  UNAUTHORIZATION: {
    msg: 'Unautherization',
    statusCode: 403,
  },
  EXISTED_USER: {
    msg: 'Existed user!',
    statusCode: 404,
  },
  USER_NOT_FOUND: {
    msg: 'User not found!',
    statusCode: 404,
  },
  EXISTED_USERNAME: {
    msg: 'Existed username',
    statusCode: 404,
  },
  WRONG_PASSWORD: {
    msg: 'Wrong password',
    statusCode: 401,
  },
  SAME_OLD_PASSWORD: {
    msg: 'New password cannot be the same as the old one!',
    statusCode: 400,
  },
  INVALID_TOKEN: {
    msg: 'Invalid token',
    statusCode: 401,
  },
  BLOG_NOT_FOUND: {
    msg: 'Blog not found',
    statusCode: 404,
  },
};

const CONSTANT_RESPONSE = {
  SUCCESS: "Successfully!",
  UPDATE: "Updated!",
  DELETE: "Deleted!"
}

const PAGINATION = {
  PAGE: 1,
  LIMIT: 10,
};

export { LOGICAL_ERRORS, CONSTANT_RESPONSE, PAGINATION };
