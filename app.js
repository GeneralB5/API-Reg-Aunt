import express, { json, urlencoded } from "express"
import handlebars from "express-handlebars"
import Routes from "./routes/index.js"
import path from "path"
import { connectDb } from "./config/connectDb.js"
import __dirname from "./utils/dirName.js"
const app = express()
app.use(json({limit:'50mb'}))
app.use(urlencoded({limit:'50mb',extended:true}))
connectDb()
//public
app.use(express.static(path.join(__dirname + '/public')))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs',handlebars.engine({
  extname : 'hbs'}))
app.set('view engine','hbs')
app.set('views', __dirname + '/views')
app.use(( err, req, res, next)=>{
    console.error(err.stack)
    res.status(500).send('error de server')
})
 
app.use(Routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app
