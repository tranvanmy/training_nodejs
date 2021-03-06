const express = require('express')
const app = new express()
const ejs = require('ejs')
app.set('view engine', 'ejs')
const expressSession = require('express-session');


const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.raw());
app.use(expressSession({
    secret: 'keyboard cat'
   }))

const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')


const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')



const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test_my_database', { useNewUrlParser: true })

const fileUpload = require('express-fileupload')
app.use(fileUpload())



//Đăng ký thư mục public.....
app.use(express.static('public'))

const customMiddleWare = (req, res, next) => {
    console.log('Custom middle ware called')
    next()
}
app.use(customMiddleWare)

const validateMiddleware = require("./middleware/validationMiddleware");
app.use('/posts/store', validateMiddleware)

//Tao server
app.listen(4000, () => {
    console.log('OK. App listening on port 4000')
})

global.loggedIn = null;
app.use("*", (req, res, next) => {
 loggedIn = req.session.userId;
 next()
});


app.get('/', homeController)

app.get('/posts/new',newPostController)

app.get('/post/:id', getPostController)

app.post('/posts/store', storePostController)

app.get('/auth/register', newUserController)

app.post('/users/register', storeUserController)

app.get('/auth/login', loginController);

app.post('/users/login',loginUserController)

app.get('/auth/logout', logoutController)

app.get('/posts/new', authMiddleware, newPostController)

app.post('/posts/store', authMiddleware, storePostController)

app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)

app.use((req, res) => res.render('notfound'));
