/**
 * FeaturesController
 *
 * @description :: Server-side logic for managing Places
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
'use strict';
// var validator = require('sails-custom-validation-messages');
//var Place = require('../models/Place.js');

module.exports = {

  index: function (req, res, next) {

    Features.find({}).exec(function (err,profile) {
      if(err){
        return res.json({'status':false});
      }
      if(!profile)
        return res.json({'status':false, 'result':null});
      return res.json({'status':true, 'result':profile});
    });
  },

  create: async function (req, res, next) {

    var exist_feature = await Features.findOne({place_owner:req.param('place_id')})
      if(exist_feature){
        return res.json({'status':false, 'result':'قبلا مکانی با این نام ثبت شده است'});
      }
    else {
        await Features.create({
          f1: req.param('f1'),
          f2: req.param('f2'),
          f3: req.param('f3'),
          f4: req.param('f4'),
          f5: req.param('f5'),
          f6: req.param('f6'),
          f7: req.param('f7'),
          f8: req.param('f8'),
          f9: req.param('f9'),
          f10: req.param('f10'),
          f11: req.param('f11'),
          f12: req.param('f12'),
          f13: req.param('f13'),
          f14: req.param('f14'),
          f15: req.param('f15'),
          f16: req.param('f16'),
          f17: req.param('f17'),
          f18: req.param('f18'),
          f19: req.param('f19'),
          f20: req.param('f20'),
          f21: req.param('f21'),
          f22: req.param('f22'),
          f23: req.param('f23'),
          f24: req.param('f24'),
          f25: req.param('f25'),
          f26: req.param('f26'),
          f27: req.param('f27'),
          f28: req.param('f28'),
          f29: req.param('f29'),
          f30: req.param('f30'),
          place_owner: req.param('place_id'),
        }, function (err, new_feature) {
          if (err && err.invalidAttributes) {
            err = validator(Featuers, err);
            return res.json({'status': false, 'errors': err.Errors});
          }
          return res.json({'status': true, 'result': new_feature});
        });
      }
  },

  update: async function (req, res, next) {

    var exist_feature = await Features.findOne({id:req.param('id')})
    if(!exist_feature){
      return res.json({'status':false, 'result':'قبلا مکانی با این مشخصه ثبت نشده است'});
    }

    await Features.update({id:req.param('id')})
      .set({
        f1: req.param('f1'),
        f2: req.param('f2'),
        f3: req.param('f3'),
        f4: req.param('f4'),
        f5: req.param('f5'),
        f6: req.param('f6'),
        f7: req.param('f7'),
        f8: req.param('f8'),
        f9: req.param('f9'),
        f10: req.param('f10'),
        f11: req.param('f11'),
        f12: req.param('f12'),
        f13: req.param('f13'),
        f14: req.param('f14'),
        f15: req.param('f15'),
        f16: req.param('f16'),
        f17: req.param('f17'),
        f18: req.param('f18'),
        f19: req.param('f19'),
        f20: req.param('f20'),
        f21: req.param('f21'),
        f22: req.param('f22'),
        f23: req.param('f23'),
        f24: req.param('f24'),
        f25: req.param('f25'),
        f26: req.param('f26'),
        f27: req.param('f27'),
        f28: req.param('f28'),
        f29: req.param('f29'),
        f30: req.param('f30'),
        place_owner: req.param('place_id'),
      })
      .then(function (new_feature){
        return res.json({'status': true, 'result': new_feature});
      })
      .catch(function(err) {
        if (err && err.invalidAttributes) {
          err = validator(Featuers, err);
          return res.json({'status': false, 'errors': err.Errors});
        }
      });
  },

  delete: function (req, res, next) {

    Features.find({id:req.param('id')}).exec(function(err,features){
      if(features.length > 0){
        Features.destroy({id:req.param('id')}).exec(function () {
          res.json({'status':true, 'result':features});
        });
      }
      else {
        return res.json({'status':false,'errors':'رکوردی با مشخصات مورد نظر شما ثبت نشده است'})
      }
    });

  }
};

