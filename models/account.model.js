const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt")
const accountSchema = new Schema(
  {
    id: Schema.Types.ObjectId,
    firstname: {
      type: String,
      required: [true, "name is required"],
    },
    lastname: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
      validate: {
        validator: function (v) {
          return /[a-z][0-9]*@gmail.com/.test(v);
        },
        message: (props) => `${props.value} is not a valid email`,
      },
    },
    phone: {
      type: Number,
      unique: true,
      required: [true, "name is required"],
    },
    password: {
      type: String,
      require: [true, "password field is required"],
      validate: {
        validator: function (v) {
          return v.length >= 6 && /\d+/.test(v);
        },
        message: () =>
          `password must be 6 characters long and must contain a number`,
      },
    },
  },
  { timestamps: true }
);

accountSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

accountSchema.methods.comparePassword = function (plaintext, callback) {
  return callback(null, bcrypt.compareSync(plaintext, this.password));
};

const Account = mongoose.model("User", accountSchema);
module.exports = { Account };
