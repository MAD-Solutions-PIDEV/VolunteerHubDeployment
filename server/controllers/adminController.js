
const User = require("../models/user");
const adress = require("../models/address");

//List All Users
const getUsers = async (req, res, next) => {
  try {
    const userList = await User.find();
    if (!userList || userList.length === 0) {
      throw new Error("users not found");
    }
    res.status(200).json(userList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//admin can delete user
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const checkIfUserExist = await User.findById(id);
    if (!checkIfUserExist) {
      throw new Error("user not found!");
    }
    const deletedUser = await User.findByIdAndUpdate(
      id, { status: 'inactive' }
    );
    res.status(200).json("user deleted", deletedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Admin can block User
const blockUser = async (req, res, next) => {
  try {
    const { id} = req.params;

    const checkIfUserExist = await User.findById(id);
    if (!checkIfUserExist) {
      throw new Error("user not found!");
    }
    const blockedUser = await User.findByIdAndUpdate(
      id, { status: 'blocked' }
    );
    res.status(200).json("user blocked", blockedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//Admin can validate User
const validateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const checkIfUserExist = await User.findById(id);
    if (!checkIfUserExist) {
      throw new Error("amal!");
    }
    const activatedUser = await User.findByIdAndUpdate(
      id, { status: 'active' }
    );
    res.status(200).json("user activated", activatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {  getUsers,  deleteUser, blockUser, validateUser };