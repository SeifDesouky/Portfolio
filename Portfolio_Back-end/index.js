const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const homeRoutes = require('./Routes/HomeRoutes');
const educationRoutes = require('./Routes/EducationRoutes');
const skillRoutes = require('./Routes/SkillRoutes');
const serviceRoutes = require("./Routes/serviceRoute");
const projectRoutes = require('./Routes/ProjectRoutes');
const contactRoute = require('./Routes/contactRoute');

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected"))
  .catch(err => console.log(err));

app.use(cors());
app.use(express.json());

app.use('/images', express.static('./uploads/images'));
app.use('/projectImg', express.static('./uploads/projectsImg'));
app.use('/files', express.static('./uploads/CV'));

app.use('/api/home', homeRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/skills', skillRoutes);
app.use("/api/services", serviceRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/contact', contactRoute);

// app.use(express.static(path.join(__dirname, '../portfolio/dist/portfolio/browser')));

// app.get(/.*/, (req, res) => {
//   res.sendFile(path.join(__dirname, '../portfolio/dist/portfolio/browser/index.html'));
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
