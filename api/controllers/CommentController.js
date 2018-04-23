/**
 * CommentController
 *
 * @description :: Server-side logic for managing Places
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
'use strict';
// var validator = require('sails-custom-validation-messages');
//var Place = require('../models/Place.js');

var nestedPop = require('nested-pop');

module.exports = {

  index: function (req, res, next) {
    Comment.find({}).exec(function (err, comments) {
      if(err) return res.json({'status':false});
      return res.json({'status':true, result:comments});
    })
  },

  single: function(req,res,next){
    // This is fine unless `User` and its `videos` are in different databases.
    // User.find().populate('videos', { limit: 15, sort: 'rating desc' }).exec(...);

    Comment.find({place_owner:req.param('comment_id')})
      .populate('childes')
      .then(function(comments) {

        return nestedPop(comments, {
          dog: [
            'childes'
          ]
        }).then(function(comments) {
          return res.json({'status':true, 'result':comments});
        }).catch(function(err) {
          throw err;
        });

      }).catch(function(err) {
      throw err;
    });



    // Comment.find({}).populate('childes').exec(function (err, comment) {
    //   if(err || !comment){
    //     return res.json({'status':false});
    //   }
    //   return res.json({'status':true, 'result': comment});
    // })
  },

  create: async function (req, res, next) {

    // var exist_place = await Place.findOne({title:req.param('title')});
    // if(exist_place){
    //   return res.json({'status':false, 'result':'این اسم مکان قبلا ثبت شده است'})
    // }

    await Comment.create({
      body: req.param('body'),
      date: req.param('date'),
      like: req.param('like') || 0,
      dis_like: req.param('dis_like') || 0,
      parent_owner: req.param('parent'),
      place_owner: req.param('place'),
      user_owner: req.param('user'),
    })
      .then(function (new_comment) {
        return res.json({'status': true, 'result': new_comment});
      })
      .catch(function (err) {
        if (err && err.invalidAttributes) {
          // err = validator(Comment, err);
          return res.json({'status': false, 'errors': err.Errors});
        }
      });

  },

  // update: async function (req, res, next) {
  //
  //   var exist_place = await Place.find({title:req.param('title')});
  //   if(exist_place){
  //     return res.json({'status':false, 'result':'این اسم مکان قبلا ثبت شده است'})
  //   }
  //
  //   await Place.update({'id':req.param('id')})
  //     .set({
  //       title: req.param('title'),
  //       body: req.param('body'),
  //       address: req.param('address'),
  //       x_map: req.param('x_map'),
  //       y_map: req.param('y_map'),
  //       like: req.param('like'),
  //       dis_like: req.param('dis_like'),
  //       visited: req.param('visited'),
  //       emtiaz: req.param('emtiaz'),
  //       tags: req.param('tags'),
  //       city_owner: req.param('city'),
  //       user_owner:req.param('user')
  //     })
  //     .then(function place_updated(updated_place){
  //       res.json({'status':true, 'result':updated_place});
  //     })
  //     .catch(function(err) {
  //       if (err) {
  //         err = validator(Place, err);
  //         return res.json({'status': false, 'errors': err.Errors});
  //       }
  //
  //     });
  // },

  delete: function (req, res, next) {

    Comment.find({id:req.param('comment_id')}).exec(function(err,comment){
      if(comment.length > 0){
        Comment.destroy(req.param('id')).exec(function () {
          res.json({'status':true, 'result':place});
        });
      }
      else {
        return res.json({'status':false,'errors':'رکوردی با مشخصات مورد نظر شما ثبت نشده است'})
      }
    });

  }
};

