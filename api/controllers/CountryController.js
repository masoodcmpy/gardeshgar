/**
 * CountryController
 *
 * @description :: Server-side logic for managing Places
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
'use strict';
// var validator = require('sails-custom-validation-messages');
//var Place = require('../models/Place.js');

module.exports = {

  index: function (req, res, next) {

    Country.find({}).populate('ostans').exec(function (err, Countries) {
      if (err) return res.json({'status': false, 'errors': err.Errors});

      res.json({'status': true, 'result': Countries});
    })
  },

  create: async function (req, res, next) {

    var exist_country = await Country.find({title:req.param('title')});
    if(exist_country){
      return res.json({'status':false, 'result':'این نام کشور قبلا ثبت شده است'})
    }

    await Country.create({
      title: req.param('title'),
    })
      .then(function (new_Country) {
        return res.json({'status': true, 'result': new_Country});
      })
      .catch(function (err) {
        if (err && err.invalidAttributes) {
          err = validator(Country, err);
          return res.json({'status': false, 'errors': err.Errors});
        }
      });

  },

  update: async function (req, res, next) {

    var exist_country = await Country.find({title:req.param('title')});
    if(exist_country){
      return res.json({'status':false, 'result':'این نام کشور قبلا ثبت شده است'})
    }

    await Country.update({'id':req.param('id')})
      .set({
        title: req.param('title'),
      })
      .then(function place_updated(updated_Country){
        res.json({'status':true, 'result':updated_Country});
      })
      .catch(function(err) {
        if (err) {
          err = validator(Country, err);
          return res.json({'status': false, 'errors': err.Errors});
        }

      });
  },

  delete: function (req, res, next) {

    Country.find({id:req.param('id')}).exec(function(err,country){
      if(country.length > 0){
        Country.destroy(req.param('id')).exec(function () {
          res.json({'status':true, 'result':country});
        });
      }
      else {
        return res.json({'status':false,'errors':'رکوردی با مشخصات مورد نظر شما ثبت نشده است'})
      }
    });

  }
};

