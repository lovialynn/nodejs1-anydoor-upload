var formidable = require('formidable'),
    http = require('http'),
    util = require('util'),
    chalk = require('chalk');

http.createServer(function(req, res) {
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    var form = new formidable.IncomingForm();

    form.encoding = 'utf-8';    //设置编辑
    
    form.uploadDir = "uploads/images/";//设置文件存储路径
   
    form.keepExtensions = true; //保留后缀
      
    form.maxFieldsSize = 2 * 1024 * 1024;//设置单文件大小限制  
    

    form.parse(req, function(err, fields, files) {//form.maxFields = 1000;  设置所以文件的大小总和
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    });

    return;
  }

  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form  enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
}).listen(666,()=>{
  const addr = `http://127.0.0.1:666`;
   console.info(`Server started at ${chalk.green(addr)}`)
});