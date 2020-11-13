import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/companydb',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
    .then(db => console.log('DB IS CONECTED'))
    .catch(error => console.log(error));