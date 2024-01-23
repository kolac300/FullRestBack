const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName: {
        type: Array,
        required: false
    },
    how_active: {
        type: Array,
        required: false
    },
    how_many_fruits: {
        type: Array,
        required: false
    },
    how_often_alcohol: {
        type: Array,
        required: false
    },
    specific_nutritional: {
        type: Array,
        required: false
    },
    hours_you_sleep: {
        type: Array,
        required: false
    },
    are_you_smoking: {
        type: Array,
        required: false
    },
    time_front_screen: {
        type: Array,
        required: false
    },
    placeOfResidence: {
        type: Array,
        required: false
    },
    deseases: {
        type: Array,
        required: false
    },
    incompatibilities: {
        type: Array,
        required: false
    },
    medication: {
        type: Array,
        required: false
    },
    which_medicine: {
        type: Array,
        required: false
    },
    age: {
        type: Array,
        required: false
    },
    sex: {
        type: Array,
        required: false
    },
    female_journey_1: {
        type: Array,
        required: false
    },
    pregnant_or_breastfeeding: {
        type: Array,
        required: false
    },
    female_journey_2: {
        type: Array,
        required: false
    },
    male_journey_1: {
        type: Array,
        required: false
    },
    wish_to_improve: {
        type: Array,
        required: false
    },
    male_journey_2: {
        type: Array,
        required: false
    },
    taking_supplements: {
        type: Array,
        required: false
    },
    often_supplements: {
        type: Array,
        required: false
    },
    be_aware: {
        type: Array,
        required: false
    },
    journey_3: {
        type: Array,
        required: false
    },
    that_is_all: {
        type: Array,
        required: false
    },
    userSessionID: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
const User = mongoose.model('User', userSchema)

module.exports = User