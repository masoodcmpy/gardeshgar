/**
 * PatoghController
 *
 * @description :: Server-side logic for managing Places
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
'use strict';
// var validator = require('sails-custom-validation-messages');
//var Place = require('../models/Place.js');

module.exports = {

  index: function (req, res, next) {

    Patogh.find({}).exec(function (err, patoghs) {
      if (err) return res.json({'status': false, 'errors': err.Errors});

      res.json({'status': true, 'result': patoghs});
    })
  },

  create: async function (req, res, next) {

    // var exist_ostan = await Ostan.find({title:req.param('title')});
    // if(exist_country){
    //   return res.json({'status':false, 'result':'این نام استان قبلا ثبت شده است'})
    // }
    await Patogh.create({
      place_owner: req.param('place'),
      user_owner: req.param('user')
    })
      .then(function (new_patogh) {
        return res.json({'status': true, 'result': new_patogh});
      })
      .catch(function (err) {
        if (err && err.invalidAttributes) {
          // err = validator(Patogh, err);
          return res.json({'status': false, 'errors': err.Errors});
        }
      });

  },

  update: async function (req, res, next) {


    await Patogh.findOne({id:req.param('id')}).exec(function (err,exist_patogh) {
      if(err)
        return res.json({"status":false});
      if(! exist_patogh){
        return res.json({'status':false, 'result':'رکوردی با این مشخصه یافت نشد'});
      }
      else {
        Patogh.update({'id':req.param('id')})
          .set({
            place_owner: req.param('place'),
            user_owner: req.param('user')
          })
          .then(function (updated_patogh){
            res.json({'status':true, 'result':updated_patogh});
          })
          .catch(function(err) {
            if (err) {
              // err = validator(Patogh, err);
              return res.json({'status': false, 'errors': err.Errors});
            }

          });
      }
    });


  },

  delete: function (req, res, next) {

    Patogh.find({id:req.param('id')}).exec(function(err,patogh){
      if(patogh.length > 0){
        Patogh.destroy(req.param('id')).exec(function () {
          res.json({'status':true, 'result':patogh});
        });
      }
      else {
        return res.json({'status':false,'errors':'رکوردی با مشخصات مورد نظر شما ثبت نشده است'})
      }
    });

  }
};

