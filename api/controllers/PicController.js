/**
 * PlaceController
 *
 * @description :: Server-side logic for managing Places
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
'use strict';
// var validator = require('sails-custom-validation-messages');
//var Place = require('../models/Place.js');

const path = require('path');
var fs = require('fs');

module.exports = {

  sendpic: async function (req, res, next) {
    fs.exists(path.resolve(path.resolve('./upload/picture/place/' + req.param('name'))), function (result) {
      if(result){
        return res.download(path.resolve('./upload/picture/place/' + req.param('name')));
        return res.ok();
      }
      else {
        return res.json({'status': false});
      }
    });
  }

};

