/**
 * CityController
 *
 * @description :: Server-side logic for managing Places
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
'use strict';
// var validator = require('sails-custom-validation-messages');
//var Place = require('../models/Place.js');

module.exports = {

  index: function (req, res, next) {

    Profile.findOne({user_owner:req.param('user_id')}).exec(function (err,profile) {
      if(err){
        return res.json({'status':false});
      }
      if(!profile)
        return res.json({'status':false, 'result':null});
      return res.json({'status':true, 'result':profile});
    });
  },

  create: async function (req, res, next) {

    var exist_profile = await Profile.findOne({user_owner:req.param('user_id')});
    if(exist_profile){
      return res.json({'status':false, 'result':'برای این کاربر پروفایل ثبت شده است'})
    }
    await Profile.create({
      fname: req.param('fname'),
      lname: req.param('lname'),
      mobile: req.param('mobile'),
      email: req.param('email'),
      desc: req.param('desc'),
      user_owner: req.param('user_id'),

    },function(err,new_profile){
      if (err && err.invalidAttributes) {
        err = validator(City, err);
        return res.json({'status': false, 'errors': err.Errors});
      }
      return res.json({'status': true, 'result': new_profile});
    });
  },

  update: async function (req, res, next) {

    var exist_profile = await Profile.findOne({user_owner:req.param('user_id')});
    if(!exist_profile){
      return res.json({'status':false, 'result':'برای این کاربر پروفایل ثبت نشده است'})
    }

    await Profile.update({user_owner:req.param('user_id')})
      .set({
        fname: req.param('fname'),
        lname: req.param('lname'),
        mobile: req.param('mobile'),
        email: req.param('email'),
        desc: req.param('desc'),
        user_owner: req.param('user_id'),
      })
      .then(function (updated_profile){
        res.json({'status':true, 'result':updated_profile});
      })
      .catch(function(err) {
        if (err) {
          err = validator(City, err);
          return res.json({'status': false, 'errors': err.Errors});
        }

      });
  },

  delete: function (req, res, next) {

    Profile.find({user_owner:req.param('user_id')}).exec(function(err,profile){
      if(profile.length > 0){
        Profile.destroy({user_owner:req.param('user_id')}).exec(function () {
          res.json({'status':true, 'result':profile});
        });
      }
      else {
        return res.json({'status':false,'errors':'رکوردی با مشخصات مورد نظر شما ثبت نشده است'})
      }
    });

  }
};

