var fs = require('fs');
var path = require('path');

module.exports = {
  'get' : function(req, res){
    var modelName = './upload/picture/';
    var filepath = null;
    if(req.param('name')){
      var filepath = req.param('name').slice(0,req.param('name').length);
    }

    switch(req.param('model')){
      case 'place':
        modelName += 'place/';
        break;
      case 'account':
        modelName += 'account/';
        break;
    }
    // remove this Sync to an Async
    console.log(path.resolve(modelName + filepath));
    fs.exists(path.resolve(modelName + filepath),function (result) {
      if(result){
        return res.sendfile(path.resolve(modelName + filepath));
      }
      else return res.notFound();
    });



  }
}
