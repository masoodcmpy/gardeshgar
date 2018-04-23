/**
 * Comment.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    body: {
      type: 'string',
      columnType: 'text'
    },

    date: {
      type: 'string',
    },

    like: {
      type: 'number',
      columnType: 'integer'
    },

    dis_like: {
      type: 'number',
      columnType: 'integer'
    },

    place_owner: {
      model: 'place'
    },

    user_owner: {
      model: 'user'
    },

    childes: {
      collection: 'comment',
      via: 'parent_owner'
    },

    parent_owner: {
      model: 'comment'
    }

  },

  // validationMessages: {
  //   title: {
  //     required: 'عنوان کشور را وارد کنید'
  //   },
  // },
};

