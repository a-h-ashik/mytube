import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true 
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    avater: {
      type: String, //Cloudnary URL
      required: true,
    },
    coverImage: {
      type: String, //Cloudnary Url
    },
    watchHistory: [
      {
      type: Schema.Types.ObjectId,
      ref: "Vedio",
      }
    ],
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    }
  }, {timestamps: true}
);

userSchema.pre("save", async function(next) {
  if (this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } else {
    return next();
  }
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expireIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  );
}

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expireIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  );
}
export const User = mongoose.model("User", userSchema);