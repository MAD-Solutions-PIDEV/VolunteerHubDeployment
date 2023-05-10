const User = require("../models/user");
const Address = require("../models/address");
var bcrypt = require("bcryptjs");
var crypto = require("crypto");
var nodemailer = require("nodemailer");
const resetPassword = async (req, res) => {
  try {
    const { email, password, resetPasswordCode } = req.body;

    // Verify reset password code
    const user = await User.findOne({ email, resetPasswordCode });
    if (!user) {
      throw new Error("Invalid reset password code");
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    
    // Update the user's password 
    await User.findByIdAndUpdate(user._id, {
      $set: {
        password: hashedPassword,
      },
      $unset: {
        resetPasswordCode: 1,
        resetPasswordExpires: 1,
      },
    });

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { resetPassword };
