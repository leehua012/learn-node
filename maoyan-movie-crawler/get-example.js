var http = require('http');
var https = require('https');
var fs = require('fs');
var url = require('url');

http.createServer((req, res) => {
  var urlObj = url.parse(req.url, true);
  var path = urlObj.pathname;
  var query = urlObj.query;

  

  switch(path) {
    case '/':
      res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
      fs.createReadStream('./index.html').pipe(res);
      break;
    case '/data':
      res.writeHead(200, {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*"
      })

      httpget((data)=> {
        res.end(data);
      });
      break;
    default:
      res.end('404');
  }

}).listen(3000, () => {
  console.log('server is running at port 3000');
})

let httpget = (callback) => {
  let data = '';
  https.get('https://i.maoyan.com/api/mmdb/movie/v3/list/hot.json?ct=%E5%8C%97%E4%BA%AC&ci=1&channelId=4', (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      data += chunk;
      console.log('=====================')
      console.log("Crawling data...")

      // console.log(`Data in response: ${data}`);
    });
    res.on('end', () => {
      console.log('No more data in response.');
      console.log('=====================')
      callback(data);
    });  
})
};