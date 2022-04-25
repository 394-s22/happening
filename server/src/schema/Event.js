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
    age: {
        type: Schema.Types.String,
        required: false
    },
    filters: [{
        type: Schema.Types.String,
        required: true
    }],
    rsvp: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }], 
});

EventSchema.statics.create = function(obj) {
    const Event = mongoose.model("Event", EventSchema);
    const event = new Event();
    event.title = obj.title;
    event.location = obj.location;
    event.time = obj.time;
    event.description = obj.description;
    event.pictureUrl = obj.pictureUrl;
    event.age = obj.age;
    event.filters = obj.filters;
    event.rsvp = [];
    return event;
}

module.exports = mongoose.model("Event", EventSchema);
