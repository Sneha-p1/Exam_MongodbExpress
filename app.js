const express = require('express');
const path = require('path');
const app = express();

const mongoose=require('mongoose')
const sample =require ('./Models/appointment.js')

const dotenv=require('dotenv')
dotenv.config();

const uri=process.env.mongodb_uri;
mongoose.connect(
    uri
);const database=mongoose.connection;

database.on("error",(error)=>
{
    console.log(error);
});
database.once("connected",()=>
{
    console.log("Database connected")
})

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/add', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'patientAdd.html'));
});

app.get('/addpatient', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'patientbook.html'));
});



app.post('/submit-form',  async (req, res) => {
   
    try{
        const data=req.body;
        console.log(data);
        const details=await sample.create(data)          
        res.status(201).redirect('/addpatient');
    }
    catch(error){
        console.log(error)
        res.status(500).json()
    }

});

app.get('/addpatient', (req,res) => {
    res.json(appointments);
})


app.put('/appointment/:id', async (req, res) => {
    try {
      const updatedAppointment = await Appointment.Update(
        { tokenId: req.params.tokenId },
        req.body,
        { new: true }
      );
      res.json(updatedAppointment);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  app.delete('/appointment/:id', async (req, res) => {
    try {
      await Appointment.deleteOne({ tokenId: req.params.tokenId });
      res.json({ message: 'Appointment deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


app.get("/appointment/:id", (req, res) => {


  res.sendFile(path.join(__dirname, 'public', 'search.html'));
  
});

app.get('/api/appointment/:id',async (req, res) => {
    const id = req.params.id;
   

    const details = await sample.findOne({TokenID: id});

   console.log("details",details);
 
 
    res.json(details);
});


const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})