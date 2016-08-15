
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

/*
var nunjucks = require('nunjucks');
nunjucks.configure(path.join(__dirname, 'views'), { // 设置模板文件的目录，为views
	autoescape: true,
	express: app
});
app.set('view engine', 'html'); // 模板文件的后缀名字为html
*/

var xtpl = require('xtpl');
//开启express适配 
xtpl.__express = xtpl.renderFile;

app.set('view engine', 'xtpl');


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
