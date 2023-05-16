const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getJWTSecret = () => {
  if (NODE_ENV === 'production') {
    return JWT_SECRET;
  }

  return 'dev-secret';
};
