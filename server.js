#!/usr/bin/env node
var http = require('http');
var fs = require('fs');
var url = require('url');

//console.log(Object.keys(http))
var port = process.env.PORT || 10024;

var server = http.createServer(function(request, response){

  var temp = url.parse(request.url, true);
  var path = temp.pathname;
  var query = temp.query;


  switch(path){
    case  '/':
      var htmlString = fs.readFileSync('./index.html');
      response.setHeader('Content-Type','text/html');
      response.end(htmlString)		;
      break;
    case '/index.css':
      var cssString = fs.readFileSync('./index.css');
      response.setHeader('Content-Type','text/css');
      response.end(cssString);
      break;
    case '/main.js':
      var jsString = fs.readFileSync('./main.js');
      response.setHeader('Content-Type','application/javascript');
      response.end(jsString);
      break;
    case '/run.js':
      var functionName = query.callback;
      response.end(functionName + '("my password is yyy")');
      break;
    default:
      response.end('404');
      break;
  }

})

server.listen(port);
console.log('监听 10024 成功');
