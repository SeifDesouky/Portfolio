const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;
const cors=require('cors')
const homeRoutes = require('./Routes/HomeRoutes');
const educationRoutes = require('./Routes/EducationRoutes');
const skillRoutes = require('./Routes/SkillRoutes');
const projectRoutes = require('./Routes/ProjectRoutes');
const contactRoute=require('./Routes/contactRoute')
mongoose.connect("mongodb+srv://dossseif5:ouKIWETvOm2Pgj3X@cluster0.fzp9en0.mongodb.net/Portfolio?retryWrites=true&w=majority&appName=Cluster0").then(_ => console.log("Database connected")).catch((err => {
    console.log(err);
}))

app.use(cors())
app.use(express.json());
app.use('/images',express.static('./uploads/images'))
app.use('/projectImg',express.static('./uploads/projectsImg'))
app.use('/files',express.static('./uploads/CV'))
app.use('/api/home', homeRoutes)
app.use('/api/education', educationRoutes)
app.use('/api/skills', skillRoutes)
app.use('/api/project',projectRoutes)
app.use('/api/contact',contactRoute)


app.listen(port, () => {
    console.log(`server is running at port: ${port}`);
})
