const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // we use the unique property here so that a second person cannot make an account from the same mail id
    },
    password: {
      type: String,
      // Googleauth does not require the password that is why required:true is not mentioned
    },
  },
  {
    timestamps: true, // itt akes care of that when was the user created and when was its data last updated , all of that stuff
  }
);

const userModel = mongoose.model("user" , userSchema);

module.exports = userModel;
