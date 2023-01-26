const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = "SCOOTER_JWT_SECRET";
const JWT_EXPIRES_IN = 86400;

const { STATUSES } = require("./constants");
const databaseUtility = require("./DatabaseUtility");

module.exports.signIn = ({ email, password }) => {
  const userData = databaseUtility.getProfile();
  if (!userData) {
    return {
      status: STATUSES.ERROR,
      message: "User not found!",
    };
  }
  const passwordIsValid = bcrypt.compareSync(password, userData.password);
  if (!passwordIsValid) {
    return {
      status: STATUSES.ERROR,
      message: "Password is incorrect!",
    };
  }
  const token = jwt.sign({ userId: userData.id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN, // 24 hours 86400
  });
  const user = {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    roleId: userData.roleId,
  };
  return {
    status: STATUSES.SUCCESS,
    data: {
      user: user,
      token: token,
    },
  };
};
