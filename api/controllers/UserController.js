/**
 * UserController
 *
 * @description :: Server-side logic for managing Places
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
// import {fdc} from "../MyValidation/_validate";

// 'use strict';

var validator = require('sails-custom-validation-messages');
var bcrypt = require('bcrypt');
// var cval = require('../MyValidation/_validate');
//var Place = require('../models/Place.js');
// var User = require('../models/User.js');

module.exports = {

  index: function(req,res,next){
    User.find({}).exec(function (err, users) {
      if(err) return res.json({'status':false, 'errors': err.Errors});
      res.json({'status':true, 'result': users});
    });
  },

  create: async function(req,res,next){

    // if(req.param('password') !== req.param('confirm_password')){
    //   console.log("1");
    //   return res.json({'status':false, 'errors':'کلمات عبور با هم یکسان نمیباشند'});
    // }
    // else {


      // er = cval.fdc(req,User.rule);
      // console.log("final:---------------- \n");
      // console.log(er);

      var exist_user = await User.findOne({username:req.param('username')});
      if(exist_user){
        return res.json({'status':false, 'result':'این نام کاربری قبلا ثبت شده است'})
      }
    bcrypt.hash(req.param('password'),10,function (err, hashed){
      if(err){
        return res.serverError({'err': 'مشکلی در هش کردن کلمه عبور به وجود آمده است'})
      }
      else {
        User.create({
          username: req.param('username'),
          password: hashed,
          type: req.param('type'),
          last_x_map: req.param('last_x_map'),
          last_y_map: req.param('last_y_map'),
        },function (err, new_user) {
          if(err) {
            err = validator(User, err);
            return res.json({'status': false, 'err': err.errors});
          }
          return res.json({'status':true,'result':new_user});
        });
          // .then(function (new_user)
          // {
          //   return res.ok({'user':new_user});
          // })
          // .catch(function (err) {
          //   if(err){
          //     // console.log(err.code);
          //     // console.log(err.invalidAttributes);
          //     err = validator(User,err);
          //     return res.json({'err':err.errors});
          //   }
          // });
      }
    });


    // }
  },

  update: async function(req,res,next){

    // if(req.param('password') !== req.param('confirm_password')){
    //   return res.json({'status':false, 'errors':'کلمات عبور با هم یکسان نمیباشند'});
    // }
    // else {
      var exist_user = await User.findOne({username:req.param('username')});
      if(exist_user){
        return res.json({'status':false, 'result':'این نام کاربری قبلا ثبت شده است'})
      }

      await bcrypt.hash(req.param('password'),10,function (err, hashed) {
        if(err){
          return res.serverError({'err': 'مشکلی در هش کردن کلمه عبور به وجود آمده است'})
        }
        else {
          console.log("1");
          console.log(req.param('id'));
          console.log(hashed);
          User.update({id: req.param('id')},
            {
              password: hashed,
              type: req.param('type'),
            }).exec(function (err, updated_user) {
            if(err){
              return res.json({'status':false, 'errors':err});
            }
            console.log("3");
            return res.json({'status':true, 'result': updated_user});
          });
        }
      })
    // }

  },


  delete: function (req, res, next) {
    User.find({id:req.param('id')}).exec(function (err, user) {
      if(user.length >0){
        User.destroy(req.param('id')).exec(function () {
          res.json({'status':true, 'result': user})
        });
      }
      else {
        return res.json({'status':false, 'errors': 'رکوردی با مشخصات مورد نظر شما ثبت نشده است'})
      }
    });
  },
};

