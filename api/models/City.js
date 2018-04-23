/**
 * City.js
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



    ostan_owner :{
      model: 'ostan'
    },

    places: {
      collection: 'place',
      via: 'city_owner'
    }
  },

  // validationMessages: {
  //   title: {
  //     required: 'عنوان شهر را وارد کنید'
  //   },
  // },
};

