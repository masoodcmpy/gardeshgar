/**
 * Ostan.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    createdAt: false,
    updatedAt: false,

    title: {
      type: 'string',
      // required: true
    },

    cities: {
      collection: 'city',
      via: 'ostan_owner'
    },

    country_owner :{
      model: 'country'
    },
  },

  // validationMessages: {
  //   title: {
  //     required: 'عنوان استان را وارد کنید'
  //   },
  // },
};

