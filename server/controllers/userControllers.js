const User = require("../models/user");
const Address = require("../models/address");
const bcrypt = require('bcrypt');
const Role = require("../models/role");
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      email,
      gender,
      status,
      image,
      phone,
      birthday,
      address,
      password,
      Skills,
      availableServices,
      languageSpoken,
    } = req.body;

    const checkUserExist = await User.findById(id);
    if (!checkUserExist) {
      throw new Error("user not found");
    }

    if (checkUserExist.status === "blocked") {
      throw new Error("User is blocked");
    }

     const updatedAddress = await Address.findOneAndUpdate(
       { _id: checkUserExist.address[0] },
       {
         firstAddress: address.firstAddress,
         secondAddress: address.secondAddress,
         country: address.country,
         zipCode: address.zipCode,
         state: address.state,
       },
       { new: true, upsert: true }
     );
  
     let hashedPassword;
     if (password) {
       const salt = await bcrypt.genSalt(10);
       hashedPassword = await bcrypt.hash(password, salt);
     }
    
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          firstName,
          lastName,
          image,
          email,
          gender,
          status,
          phone,
          birthday,
          availableServices,
          languageSpoken,
          Skills,
          password:hashedPassword || checkUserExist.password,
          address: updatedAddress._id,
       
        },
      },
      { new: true }
    ).populate("address");
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const updateHost = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      email,
      gender,
      status,
      image,
      phone,
      birthday,
      address,
      password,
      availableServices,
      languageSpoken,
      skills,
      hasAnimals,
      musicAllowed,
      doesSmoke,
    } = req.body;

    const checkUserExist = await User.findById(id);
    if (!checkUserExist) {
      throw new Error("user not found");
    }

    if (checkUserExist.status === "blocked") {
      throw new Error("User is blocked");
    }

     const updatedAddress = await Address.findOneAndUpdate(
       { _id: checkUserExist.address[0] },
       {
         firstAddress: address.firstAddress,
         secondAddress: address.secondAddress,
         country: address.country,
         zipCode: address.zipCode,
         state: address.state,
       },
       { new: true, upsert: true }

     );
    const updatedRole = await Role.findOne({ name: "host" });

  
     let hashedPassword;
     if (password) {
       const salt = await bcrypt.genSalt(10);
       hashedPassword = await bcrypt.hash(password, salt);
     }
    
    const updateHost = await User.findByIdAndUpdate(
      
      id,
      {
        $set: {
          firstName,
          lastName,
          image,
          email,
          gender,
          status,
          phone,
          birthday,
          availableServices,
          languageSpoken,
          skills,
          password:hashedPassword || checkUserExist.password,
          address: updatedAddress._id,
          roles : updatedRole._id,
          hasAnimals,
          musicAllowed,
          doesSmoke,

       
        },
        
      },
      { new: true }
    ).populate("address")
    res.status(200).json(updateHost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const getUser = async (req, res) => {
  try {
    const user = await User.find();
    if (!user || user.length === 0) {
      throw new Error("user not found");
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getHost = async (req, res) => {
  try {
    const host = await Role.find({ name : "host" });
    
    const user = await User.find({ roles : host[0]._id });
    if (!user || user.length === 0) {
      throw new Error("Host not found");
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("address").populate("roles").populate("rank");
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findById(id);
    if (!role) {
      throw new Error("role not found");
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const addFavoriteHost = async (req, res, next) => {
  try {
    const { idHost } = req.body;
    const { id } = req.params; 



    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { $addToSet: { favoriteHost: idHost } }, // Use $addToSet to add the ID to the array if it doesn't already exist
      { new: true } // Return the updated user object
    );

    return res.status(200).json({ message: 'User added to favorite host list', user: updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



const removeFavoriteHost = async (req, res, next) => {
  try {
    const { idHost } = req.body;
    const { id } = req.params;

    // Update the user's favorite host list and save the changes
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { $pull: { favoriteHost: idHost } }, // Use $pull to remove the ID from the array
      { new: true } // Return the updated user object
    );

    return res.status(200).json({ message: 'User removed from favorite host list', user: updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = { getUser, updateUser, getById,getHost,updateHost,getRoleById ,addFavoriteHost,removeFavoriteHost};
