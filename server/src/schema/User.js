const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: Schema.Types.String,
    required: true
  },
  rsvp: [{
    type: Schema.Types.ObjectId,
    ref: "Event",
    required: true
  }]
});

UserSchema.statics.create = function(obj) {
  const User = mongoose.model("User", UserSchema);
  const user = new User();
  user.email = obj.email;
  user.rsvp = obj.rsvp ? obj.rsvp : [];
  return user;
}

module.exports = mongoose.model("User", UserSchema);
