/**
 * PlaceController
 *
 * @description :: Server-side logic for managing Places
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
'use strict';
// var validator = require('sails-custom-validation-messages');
//var Place = require('../models/Place.js');


module.exports = {

  index: function (req, res, next) {

    Place.find({
      where:{},
      limit:2,
      skip: req.param('skip') || 0
    }).populate('pictures').exec(function (err, places) {
      if (err || !places) return res.json({'status': false, 'errors': err.Errors});
      for(var i = 0 ; i<places.length ; i++){
        places[i]['body'] = places[i]['body'].substr(0, 100) + " ...";
        places[i]['pictures'] = places[i]['pictures'][0]
      }
      return res.json({'status': true, 'result': places});
    })
  },

  single: function(req,res,next){
    Place.findOne({id:req.param('place_id')}).populate('pictures').populate('features').exec(function (err, place) {
      if(err || !place){
        return res.json({'status':false});
      }
      return res.json({'status':true, 'result': place});
    })
  },

  create: async function (req, res, next) {

    // var exist_place = await Place.findOne({title:req.param('title')});
    // if(exist_place){
    //   return res.json({'status':false, 'result':'این اسم مکان قبلا ثبت شده است'})
    // }

    await Place.create({
      title: req.param('title'),
      body: req.param('body'),
      address: req.param('address'),
      x_map: req.param('x_map'),
      y_map: req.param('y_map'),
      like: req.param('like') || 0,
      dis_like: req.param('dis_like') || 0,
      visited: req.param('visited') || 0,
      emtiaz: req.param('emtiaz') || 0,
      tags: req.param('tags'),
      city_owner: req.param('city'),
      user_owner:req.param('user')
    })
    .then(function (new_place) {
        return res.json({'status': true, 'result': new_place});
      })
    .catch(function (err) {
        if (err && err.invalidAttributes) {
          err = validator(Place, err);
          return res.json({'status': false, 'errors': err.Errors});
        }
      });

  },

  update: async function (req, res, next) {

    var exist_place = await Place.find({title:req.param('title')});
    if(exist_place){
      return res.json({'status':false, 'result':'این اسم مکان قبلا ثبت شده است'})
    }

    await Place.update({'id':req.param('id')})
      .set({
        title: req.param('title'),
        body: req.param('body'),
        address: req.param('address'),
        x_map: req.param('x_map'),
        y_map: req.param('y_map'),
        like: req.param('like'),
        dis_like: req.param('dis_like'),
        visited: req.param('visited'),
        emtiaz: req.param('emtiaz'),
        tags: req.param('tags'),
        city_owner: req.param('city'),
        user_owner:req.param('user')
      })
      .then(function place_updated(updated_place){
        res.json({'status':true, 'result':updated_place});
        })
      .catch(function(err) {
        if (err) {
          err = validator(Place, err);
          return res.json({'status': false, 'errors': err.Errors});
        }

      });
  },

  delete: function (req, res, next) {

    Place.find({id:req.param('id')}).exec(function(err,place){
      if(place.length > 0){
        Place.destroy(req.param('id')).exec(function () {
          res.json({'status':true, 'result':place});
        });
      }
      else {
        return res.json({'status':false,'errors':'رکوردی با مشخصات مورد نظر شما ثبت نشده است'})
      }
    });

  }
};

