const mongoose = require('mongoose')
require('dotenv').config()
const app = require('./app')

const PORT = process.env.PORT || 3000


// CONNECT DATABASE
const mongo_url = process.env.MONGODB_URL
mongoose.connect(mongo_url)
mongoose.connection.on('connected', ()=>{
    console.log('DB connection successful!')
})
mongoose.connection.on('error', (err)=>{
    console.log('Something was wrong with DB connection')
})


app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});