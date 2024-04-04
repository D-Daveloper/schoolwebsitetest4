import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import multer from 'multer';
import {Testimonial, Event, Email} from "./models/eventDB.js"
import { log } from 'console';
import methodOverride  from "method-override"

config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;

app.use(methodOverride("_method"))
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());
bodyParser.urlencoded({ extended: true })

// Connect to MongoDB
const start = async() => {
  try {
      await mongoose.connect(process.env.MONGODB, {})
      .then(() => console.log("connected"))
      app.listen(port, () => {
          console.log(`Server is running on port ${port}`);
      });
  }
  catch(e){
      console.log(e.message)
  }
}
start()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/pictures')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

// Set up multer for file uploads
const upload = multer({ storage });

// Load emails from JSON file on server start
let emails = [];
try {
    const data = fs.readFileSync('emails.json');
    emails = JSON.parse(data);
} catch (err) {
    console.error('Error reading emails:', err);
}

function getEmail(req, res, next) {
    let input_value = req.body.Email;
    // console.log(input_value);
    next();
};
app.use(getEmail);

app.get('/', async(req, res) => {
  try{
    const testimonials = await Testimonial.find()
    res.render('index',{ testimonial: testimonials});
  }catch(e){
    console.log(e.message)
  }
});

app.get('/about', (req, res) => {
    res.render('about');
});
  
app.get('/login', (req, res) => {
      res.render("login");
  });

app.post("/login",(req,res) =>{
  if (req.body["username"] === process.env.USERNAE && req.body["password"] === process.env.PASSWORD) {
    res.render("admin");  
    }else{
        res.render("login")
    }
});
app.get('/events', async(req, res) => {
  try {
    const event = await Event.find();
    if (!event) {
      throw new Error('Event not found');
    }
    res.render('events', { event: event });
    // console.log('Event found:', event);
  } catch (err) {
    console.log(err.message);
  }
});

//routes for events
app.get('/addEvent', (req, res) => {
    res.render('add');
  });
app.post('/addEvent', upload.single('eventImage'), async (req, res) => {
    const { title, description, date } = req.body;
    const image = req.file ? req.file.filename : ''; // Store the uploaded image filename
  
    const newEvent = new Event({
      title: title,
      description: description,
      date: date,
      image: image,
    });
  
    try{
      await newEvent.save()
      res.sendStatus(201)
      console.log("done")
    } catch(e){
      console.log(e.message)
    }
  });
app.get('/viewEvents', async (req, res) => {
  const events = await Event.find()
  res.render("viewEvent", {event: events});
});

app.get('/editEvents/:eventId', async (req, res) => {
  const eventId = req.params.eventId;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      throw new Error('Event not found');
    }
    res.render('editEvents', { event: event });
    console.log('Event found:', event);
  } catch (err) {
    console.log(err.message);
    res.redirect('/viewEvents');
  }
});
app.put('/event/:eventId', upload.single('eventImage'), async (req, res) => {
  const eventId = req.params.eventId;
  const { title, description, date,eventImage} = req.body;
  const image = req.file ? req.file.filename : '';
  // console.log(req.file)

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      throw new Error('Event not found');
    }

    // Update specific fields of the event if they are provided in the request
    if (title) event.title = title;
    if (description) event.description = description;
    if (date) event.date = date;
    if (req.file) {
      event.image = req.file.filename; // Use the path to the uploaded image file
    }
    console.log(req.file.filename)

    // Save the updated event to the database
    await event.save();

    res.sendStatus(201);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/deleteEvents/:eventId', async (req, res) => {
  const eventId = req.params.eventId;
  try {
    const event = await Event.findByIdAndDelete(eventId);
    if (!event) {
      throw new Error('Event not found');
    }
    res.sendStatus(201)
  } catch (err) {
    console.error(err.message);
    res.redirect('/viewEvents'); // Redirect to event list page if error occurs
  }
});

// routes for the testimonials
app.get('/admin/addTestimonial', (req, res) => {
  res.render('addTestimonial');
});

app.post('/addTestimonial', upload.single('testimonialImage'), async (req, res) => {
  const { name, description} = req.body;
  const image = req.file ? req.file.filename : ''; // Store the uploaded image filename

  const newTestimonial = new Testimonial({
    name: name,
    description: description,
    image: image,
  });

  try{
    await newTestimonial.save()
    res.sendStatus(201)
    console.log("done")
  } catch(e){
    console.log(e.message)
  }
});
app.get('/admin/viewTestimonial', async (req, res) => {
  const testimonial = await Testimonial.find()
  res.render("viewTestimonials", {testimonial: testimonial});
});

app.get('/editTestimonial/:testimonialId', async (req, res) => {
  const testimonialId = req.params.testimonialId;
  try {
    const testimonial = await Testimonial.findById(testimonialId);
    if (!testimonial) {
      throw new Error('Event not found');
    }
    res.render('editTestimonial', { testimonial: testimonial });
    console.log('Event found:', testimonial);
  } catch (err) {
    console.log(err.message);
    res.redirect('/admin/viewTestimonial');
  }
});

// PUT route to update an event
app.put('/editTestimonial/:testimonialId', upload.single('testimonialImage'), async (req, res) => {
  const testimonialId = req.params.testimonialId;
  const { name, description} = req.body;
  const image = req.file ? req.file.filename : '';
  // console.log(req.file)

  try {
    const testimonial = await Testimonial.findById(testimonialId);
    if (!testimonial) {
      throw new Error('Event not found');
    }

    // Update specific fields of the event if they are provided in the request
    if (name) testimonial.name = name;
    if (description) testimonial.description = description;
    if (req.file) {
      testimonial.image = req.file.filename; // Use the path to the uploaded image file
    }
    console.log(req.file.filename)

    // Save the updated testimonial to the database
    await testimonial.save();

    res.sendStatus(201);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete('/deleteTestimonial/:testimonialId', async (req, res) => {
  const testimonialId = req.params.testimonialId;
  try {
    const testimonial = await Testimonial.findByIdAndDelete(testimonialId);
    if (!testimonial) {
      throw new Error('Event not found');
    }
    res.sendStatus(201)
  } catch (err) {
    console.error(err.message);
    res.redirect('/viewTestimonials'); // Redirect to event list page if error occurs
  }
});
app.post('/subscribe', async (req, res) => {
    const { email } = req.body;
    // Check if the email is empty or already exists in the array
    if (!email || emails.includes(email)) {
        res.status(400).send('Invalid email or duplicate email.');
        return;
    }
    const newEmail = new Email({
      name: email,
    });
  
    try{
      await newEmail.save()
      res.sendStatus(201)
      console.log("done")
    } catch(e){
      console.log(e.message)
    }
    emails.push(email); 
    saveEmailsToJson(); // Save emails to JSON file
    // res.send('Subscription successful!');
});
app.get("/viewEmails", async (req,res) => {
  try{
    const emails = await Email.find()
    res.render("emails", {email:emails})
  }catch(e){
    console.log(e.message)
  };
})

app.get('/admin', (req, res) => {
    res.render("login");
});


// Function to save emails to JSON file
function saveEmailsToJson() {
    fs.writeFile('emails.json', JSON.stringify(emails), (err) => {
        if (err) {
            console.error('Error saving emails:', err);
        } else {
            console.log('Emails saved successfully!');
        }
    });
}


// Routes
app.get('/admin', (req, res) => {
  // Fetch all events from the database
  Event.find({}, (err, events) => {
    if (err) {
      console.log(err);
    } else {
      res.render('admin', { events: events });
    }
  });
});



