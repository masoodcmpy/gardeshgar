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

    Hozor.find({}).exec(function (err, hozores) {
      if (err) return res.json({'status': false, 'errors': err.Errors});

      res.json({'status': true, 'result': hozores});
    })
  },

  create: async function (req, res, next) {

    // var exist_ostan = await Ostan.find({title:req.param('title')});
    // if(exist_country){
    //   return res.json({'status':false, 'result':'این نام استان قبلا ثبت شده است'})
    // }
    await Hozor.create({
      place_owner: req.param('place'),
      user_owner: req.param('user')
    })
      .then(function (new_hozor) {
        return res.json({'status': true, 'result': new_hozor});
      })
      .catch(function (err) {
        if (err && err.invalidAttributes) {
          // err = validator(Patogh, err);
          return res.json({'status': false, 'errors': err.Errors});
        }
      });

  },

  update: async function (req, res, next) {


    await Hozor.findOne({id:req.param('id')}).exec(function (err,exist_hozor) {
      if(err)
        return res.json({"status":false});
      if(! exist_hozor){
        return res.json({'status':false, 'result':'رکوردی با این مشخصه یافت نشد'});
      }
      else {
        Hozor.update({'id':req.param('id')})
          .set({
            place_owner: req.param('place'),
            user_owner: req.param('user')
          })
          .then(function (updated_hozor){
            res.json({'status':true, 'result':updated_hozor});
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

    Hozor.find({id:req.param('id')}).exec(function(err,hozor){
      if(hozor.length > 0){
        Hozor.destroy(req.param('id')).exec(function () {
          res.json({'status':true, 'result':hozor});
        });
      }
      else {
        return res.json({'status':false,'errors':'رکوردی با مشخصات مورد نظر شما ثبت نشده است'})
      }
    });

  }
};

