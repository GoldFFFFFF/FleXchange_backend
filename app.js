const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const User = require('./models/User')
var request = require('request');
const session = require('express-session')
const { setRouter, setRouter2 } = require('./routes');
const { mongoURL, port } = require('./config');

const app = express();

mongoose.connect(mongoURL, {
  useCreateIndex: true,
  useNewUrlParser: true,
}).then(() => console.log('Database is connect'));

app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('publicimage'));
var path = require("path");
var fs = require("fs");
var formidable = require('formidable');
app.listen("3000", function () {
  console.log("服务启动")
});

app.use(session({
  secret: 'ce9a9f917a6e591f7b1191bf1c00ebab',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: true
}))

app.post('/onlogin', function (req, res, next) {
  let code = req.query.code
  request.get({
    url: 'https://api.weixin.qq.com/sns/jscode2session',
    json: true,
    qs: {
      grant_type: 'authorization_code',
      appid: 'wx3b53c988625f40c6',
      secret: 'ce9a9f917a6e591f7b1191bf1c00ebab',
      js_code: code
    }
  }, (err, response, data) => {
    if (response.statusCode == 200) {
      console.log(req.query.username)
      console.log(req.query.imgUrl)
      res.json({
        openid:data.openid,
        session_key:data.session
      })
      finduser(req, data.openid)
    } else {
      console.log('[error]', err)
      res.json(err)
    }
  })
})
app.post("/findid", function (req, res){
   
})
//拦截请求
app.post("/image", function (req, res) {

  var form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  console.log(__dirname)
  form.uploadDir = path.join(__dirname + "/../upload");
  console.log(form.uploadDir)
  form.keepExtensions = true;//保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024;

  //处理图片
  form.parse(req, function (err, fields, files) {
    let components = []
    const filess = fs.readdirSync(form.uploadDir)
    filess.forEach(function (item, index) {
      let stat = fs.lstatSync(form.uploadDir + "/" + item)
      if (stat.isDirectory() == false) {
        components.push(item)
      }
    })
    for (i = 0; i < components.length; i++) {
      if (components[i].substr(0, 6) == "upload") {
        var imageName = components[i];
      }
    }
    var filename = "test.jpeg";
    var nameArray = filename.split('.');
    var type = nameArray[nameArray.length - 1];
    var name = '';
    for (var i = 0; i < nameArray.length - 1; i++) {
      name = name + nameArray[i];
    }
    var date = new Date();
    var time = '_' + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes() + "_" + date.getSeconds();
    var avatarName = name + time + '.' + type;
    var newPath = form.uploadDir + "/" + avatarName;
    fs.renameSync(form.uploadDir + "/" + imageName, newPath);  //重命名
    res.send(avatarName)
  })
});

const finduser = function (req, data) {
  User.find({ username: req.query.username }).then(resultmessage => {
    if (resultmessage.length==0) {
      console.log("new user created")
      newUser(req, data)
    }
    else {
      resultmessage
    }
  }) 
}

const newUser = function (req, data) {
  User.create({username: req.query.username, imgUrl: req.query.imgUrl, openid: data.openid}).then(newUser => res.json({
    User: newUser,
    logmessage: 'new user create',
  })).catch((err) => {
    res.status(400).json({
      logmessage: 'Error',
    });
    throw new Error(err);
  });
}

setRouter(app);
setRouter2(app);