const express = require ('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const postRoutes = require('./routes/post_routes');
const contactRoutes = require('./routes/contact_routes');
const createPath = require('./helpers/create_path');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;
const db = 'mongodb+srv://admin:adminadmin@cluster0.9mpww.mongodb.net/node-block?retryWrites=true&w=majority';

mongoose
    .connect(db)
    .then((res) => console.log('Connected to db'))
    .catch((error) => console.log(error));

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log('listening port ' + PORT.toString());
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({ extended: false }));

app.use(express.static('styles'));

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    const title = 'Home';
    res.render(createPath('index'), {title} );
});

app.use(postRoutes);
app.use(contactRoutes);

app.use((req, res) => {
    const title = 'Error';
    res
        .status(404)
        .render(createPath('error'), {title} );
}); 