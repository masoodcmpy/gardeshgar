/**
 * OstanController
 *
 * @description :: Server-side logic for managing Places
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
'use strict';
// var validator = require('sails-custom-validation-messages');
//var Place = require('../models/Place.js');

module.exports = {

  index: function (req, res, next) {

    Ostan.find({}).populate('cities').exec(function (err, ostans) {
      if (err) return res.json({'status': false, 'errors': err.Errors});

      res.json({'status': true, 'result': ostans});
    })
  },

  create: async function (req, res, next) {

    var exist_ostan = await Ostan.find({title:req.param('title')});
    if(exist_country){
      return res.json({'status':false, 'result':'این نام استان قبلا ثبت شده است'})
    }
    await Ostan.create({
      title: req.param('title'),
      country_owner: req.param('country')
    })
      .then(function (new_ostan) {
        console.log(new_ostan);
        return res.json({'status': true, 'result': new_ostan});
      })
      .catch(function (err) {
        if (err && err.invalidAttributes) {
          err = validator(Ostan, err);
          return res.json({'status': false, 'errors': err.Errors});
        }
      });

  },

  update: async function (req, res, next) {


    var exist_ostan = await Ostan.find({title:req.param('title')});
    if(exist_country){
      return res.json({'status':false, 'result':'این نام استان قبلا ثبت شده است'})
    }

    await Ostan.update({'id':req.param('id')})
      .set({
        title: req.param('title'),
        country_owner: req.param('country')
      })
      .then(function ostan_updated(updated_ostan){
        res.json({'status':true, 'result':updated_ostan});
      })
      .catch(function(err) {
        if (err) {
          err = validator(Ostan, err);
          return res.json({'status': false, 'errors': err.Errors});
        }

      });
  },

  delete: function (req, res, next) {

    Ostan.find({id:req.param('id')}).exec(function(err,ostan){
      if(ostan.length > 0){
        Ostan.destroy(req.param('id')).exec(function () {
          res.json({'status':true, 'result':ostan});
        });
      }
      else {
        return res.json({'status':false,'errors':'رکوردی با مشخصات مورد نظر شما ثبت نشده است'})
      }
    });

  }
};

