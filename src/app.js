import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import pkg from '../package.json';
import {createRoles} from './helpers/initialSetup';
import productsRoutes from './routes/productsRoutes';
import authRoutes from './routes/authRoutes';
import usersRoutes from './routes/userRoutes';
const app = express();
createRoles();
app.set('pkg',pkg);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}))
app.get('/', (req, res) => {
    res.json({
        name:app.set('pkg').name,
        author:app.get('pkg').author,
        description: app.get('pkg').description,
        version:app.get('pkg').version,
    })
});
app.use('/api/products',productsRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/users',usersRoutes);

export default app;