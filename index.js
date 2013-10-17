var restify = require('restify');
var fs      = require('fs');

var PWD     = process.env.PWD;
var HIP_DIR = PWD + '/hipchat_export/';

function getRooms(req, res, next) {
  fs.readFile(HIP_DIR + '/rooms/list.json', {
    encoding: 'utf-8'
  }, function(err, list) {
    if(err) throw err;
    res.send(JSON.parse(list));
    return next();
  });
}

function showRoom(req, res, next) {
  fs.readdir(HIP_DIR + '/rooms/' + req.params.roomName, function(err, list) {
    if(err) throw err;
    res.send(list);
    return next();
  });
}

function getMsg(req, res, next) {
  var roomName = req.params.roomName;
  var day      = req.params.day;
  fs.readFile(HIP_DIR + '/rooms/' + roomName + '/' + day + '.json', function(err, msg) {
    if(err) throw err;
    res.send(JSON.parse(msg));
  });
  /* res.send(req.parmas.day); */
  return next();
}

var server = restify.createServer({
  name: 'hipchatHistoryViewer'
});

server.get('/room', getRooms);
server.get('/room/:roomName', showRoom);
server.get('/room/:roomName/msg/:day', getMsg);

server.listen(8008);
