"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Testimonial = exports.Event = exports.Email = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
// Define Mongoose schema and model for events
const eventSchema = new _mongoose.default.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  image: {
    type: String,
    required: true
  } // Add image field to store image URLs
});
const testimonialSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  } // Add image field to store image URLs
});
const emailSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true
  }
});
const Testimonial = exports.Testimonial = _mongoose.default.model("Testimonial", testimonialSchema);
const Event = exports.Event = _mongoose.default.model('Event', eventSchema);
const Email = exports.Email = _mongoose.default.model('Email', emailSchema);