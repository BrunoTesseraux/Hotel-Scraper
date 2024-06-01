import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profession: { type: String },
    avatar: { type: String },
    qrcode: { type: String },
    phonenumber: { type: Number },
    bio: { type: String },
    gender: { type: String, enum: ["male", "female", "divers"] },
    birthday: { type: Date },
    website: { type: String },
    sixDigitCode: {
      type: String,
      default: () => Math.random().toString().slice(2, 8),
    },
    // Remove the duplicate property "profession"
    emailVerified: { type: Boolean, default: false },
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    saved: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    activities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activity" }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: "users" }
);

userSchema.methods.toProfileInfo = function () {
  return {
    firstname: this.firstname,
    lastname: this.lastname,
    username: this.username,
    email: this.email,
    profession: this.profession,
    avatar: this.avatar,
    qrcode: this.qrcode,
    bio: this.bio,
    birthday: this.birthday,
    phonenumber: this.phonenumber,
    likes: this.likes,
    saved: this.saved,
    website: this.website,
    gender: this.gender,
    followers: this.followers,
    following: this.following,
    blogs: this.blogs,
    _id: this._id,
    emailVerified: this.emailVerified,
  };
};

userSchema.pre("save", async function () {
  const user = this;

  if (user.isModified("email")) {
    user.email = user.email.toLowerCase();
  }
  if (user.isModified("password")) {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
  }
});

userSchema.statics.findByEmail = function (email) {
  if (typeof email !== "string") return null;
  return this.findOne({ email: email.toLowerCase() });
};

const User = mongoose.model("User", userSchema);
export default User;