const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

app.use(cors({
  origin:

      "https://6825df6ef9d997b9b6782f7d--remarkable-gecko-91f84a.netlify.app/",
    

  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Handle preflight requests explicitly (optional but safe)
app.options('*', cors());


app.use(express.json());

app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error("MongoDB error:", err);
  });
module.exports=app;