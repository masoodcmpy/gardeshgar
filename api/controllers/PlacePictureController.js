/**
 * PlacePictureControllerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var fs = require('fs');
var os = require('os');
const path = require('path');

module.exports = {

create: async function (req, res, next) {

  var pic_name = null;
  // upload picture
  if(req._fileparser.upstreams.length){
    await req.file('pic').upload({
      dirname: path.resolve('./upload/picture/place/')
    },function (err, file) {
      pic_name = file[0]['fd'].split('\\').reverse()[0];
      if(err){
        return res.json({'status':false});
      }
      if(file){
        PlacePicture.create({
          pic_address:pic_name,
          date: req.param('date'),
          like: 0,
          dis_like: 0,
          desc: req.param('desc'),
          place_owner: req.param('place_id')
        }, function (err, new_placepic) {
          if(err){
            return res.json({'status':false})
          }
          return res.json({'status':true, 'result': 'تصویر با موفقیت آپلود شد'});
        });
      }
    });
  }
  else {
    return res.json({'status':false, 'error': 'تصویر ارسالی به درستی دریافت نشد دوباره امتحان کنید'})
  }
}
};

