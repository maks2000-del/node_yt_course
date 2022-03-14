const express = require ('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log('listening port ' + PORT.toString());
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({ extended: false }));

app.use(express.static('styles'));

app.get('/', (req, res) => {
    const title = 'Home';
    res.render(createPath('index'), {title} );
});

app.get('/contacts', (req, res) => {
    const title = 'Contacts';
    const contacts = [
        { name: 'YouTube', link: 'http://youtube.com/YauhenKavalchuk' },
        { name: 'Twitter', link: 'http://github.com/YauhenKavalchuk' },
        { name: 'GitHub', link: 'http://twitter.com/YauhenKavalchuk' },
      ];
    res.render(createPath('contacts'), {contacts, title});
});

app.post('/add-post', (req, res) => {
    const { title, author, text } = req.body;
    const post = {
        id: new Date(),
        date: new Date().toLocaleDateString(),
        title,
        author,
        text
    }
    res.render(createPath('post'), {post, title});
});

app.get('/add-post', (req, res) => {
    const title = 'Add post';
    res.render(createPath('add_post'), {title} );
});

app.get('/posts/:id', (req, res) => {
    const title = 'Post';
    const post = {
        id: '1', 
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.',
        title: 'Post title',
        date: '05.05.2021',
        author: 'Yauhen',
      };
      res.render(createPath('post'), { title, post });
});

app.get('/posts', (req, res) => {
    const title = 'Posts';
    const posts = [
        {
            id: '1', 
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.',
            title: 'Post title',
            date: '05.05.2021',
            author: 'Yauhen',
        }
    ];
    res.render(createPath('posts'), {title, posts} );
});

app.get('/about-us', (req, res) => {
    res.redirect('/contacts')
});

app.use((req, res) => {
    const title = 'Error';
    res
        .status(404)
        .render(createPath('error'), {title} );
});