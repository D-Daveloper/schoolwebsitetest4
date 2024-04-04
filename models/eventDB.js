import mongoose from "mongoose";


// Define Mongoose schema and model for events
const eventSchema = new mongoose.Schema({
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
    }, // Add image field to store image URLs
  });
const testimonialSchema = new mongoose.Schema({
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
    }, // Add image field to store image URLs
  });
const emailSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
  });

  const Testimonial = mongoose.model("Testimonial", testimonialSchema);
  const Event = mongoose.model('Event', eventSchema);
  const Email = mongoose.model('Email', emailSchema);
  export { Testimonial, Event, Email };



