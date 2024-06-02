import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      Unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,  
    },
    pic: {
      type: String,
      default:
        "https://www.pngkey.com/png/detail/115-1150152_default-profile-picture-avatar-png-green.png",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timeStamp: true }
);

const User = mongoose.model("User", userSchema);

export default User;
