var createError = require('http-errors');
const express = require('express');
var path = require('path');
const cookieParser = require('cookie-parser');
var logger = require('morgan');

const swaggerUi = require('swagger-ui-express');
const swaggerJSdoc = require('swagger-jsdoc')
const yamljs = require("yamljs")

const bodyParser = require("body-parser");


// get router methods with require
const indexRouter = require('./routes/index');
const userRoutes = require('./routes/users');
const serviceRouter = require('./routes/testService');
const tokenAuthMiddleware = require('./middlewares/tokenAuth')
const { tokenAuth } = tokenAuthMiddleware;

var app = express();

const cors = require("cors");

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
	extended: true,
}));
app.use(bodyParser.json());

const options = {
	definition: {
		openapi: '3.0.0',
        info: {
			title: 'Node JS API Project for Express',
            version: '1.0.0'
        },
        servers: [
			{
				url: 'http://localhost:3000/'    
            }
        ]
    },
    apis: [`${__dirname}/routes/*.js`]
};

const swaggerAuthOptions = {
	swaggerOptions: {
		basicAuth: {
			name: "Authorization",
			schema: {
				type: 'basic',
				in: 'header'
			},
			value: 'Basic <user:password>'
		}
	}
}

const swaggerDocument = yamljs.load('./yaml/swagger_config.yaml')

const swaggerSpec = swaggerJSdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerAuthOptions));


app.use('/', indexRouter);
app.use('/api/users', userRoutes);
app.use('/api/services', tokenAuth, serviceRouter);


// app.listen(PORT, () => console.log(`Server is connected on ${PORT}`))

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

module.exports = app;