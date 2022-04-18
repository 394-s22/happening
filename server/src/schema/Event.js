const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EventSchema = new Schema({
    title: {
        type: Schema.Types.String,
        required: true
    },
    location: {
        type: Schema.Types.String,
        required: true
    },
    time: {
        type: Schema.Types.Number,
        required: true
    },
    description: {
        type: Schema.Types.String,
        required: true
    },
    pictureUrl: {
        type: Schema.Types.String,
        required: true
    },
    groupSize: {
        type: Schema.Types.String,
        required: false
    },
    meta: {
        type: Schema.Types.Object,
        required: true
        
    },

});
AccountSchema.statics.create = function(obj) {
    const Account = mongoose.model("Account", AccountSchema);
    const account = new Account();
    account.email = obj.email;
    account.password = obj.password;
    account.communities = obj.communities;
    account.upvotes = obj.upvotes;
    account.downvotes = obj.downvotes;
    return account;
}
module.exports = mongoose.model("Account", AccountSchema);