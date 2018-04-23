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

    City.find({}).populate('places').exec(function (err, all_city) {
      if (err) return res.json({'status': false, 'errors': err.Errors});

      res.json({'status': true, 'result': all_city});
    })
  },

  create: async function (req, res, next) {

    var exist_city = await City.find({title:req.param('title')});
    if(exist_city){
      return res.json({'status':false, 'result':'این نام شهر قبلا ثبت شده است'})
    }
    await City.create({
      title: req.param('title'),
      ostan_owner: req.param('ostan')
    },function(err,new_city){
      if (err && err.invalidAttributes) {
        err = validator(City, err);
        return res.json({'status': false, 'errors': err.Errors});
      }
      return res.json({'status': true, 'result': new_city});
    });

      // .then(function (new_city) {
      //   console.log(new_city);
      //   return res.json({'status': true, 'result': new_city});
      // })
      // .catch(function (err) {
      //   if (err && err.invalidAttributes) {
      //     err = validator(City, err);
      //     return res.json({'status': false, 'errors': err.Errors});
      //   }
      // });

  },

  update: async function (req, res, next) {
    //console.log("id is=     " + req.param('id'));
    var exist_city = await City.find({title:req.param('title')});
    if(exist_city){
      return res.json({'status':false, 'result':'این نام شهر قبلا ثبت شده است'})
    }

    await City.update({'id':req.param('id')})
      .set({
        title: req.param('title'),
        ostan_owner: req.param('ostan')
      })
      .then(function city_updated(updated_city){
        res.json({'status':true, 'result':updated_city});
      })
      .catch(function(err) {
        if (err) {
          err = validator(City, err);
          return res.json({'status': false, 'errors': err.Errors});
        }

      });
  },

  delete: function (req, res, next) {

    City.find({id:req.param('id')}).exec(function(err,city){
      if(city.length > 0){
        City.destroy(req.param('id')).exec(function () {
          res.json({'status':true, 'result':city});
        });
      }
      else {
        return res.json({'status':false,'errors':'رکوردی با مشخصات مورد نظر شما ثبت نشده است'})
      }
    });

  }
};

