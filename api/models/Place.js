/**
 * Place.js
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

    body: {
      type: 'string',
      columnType: 'text',
      // required: true
    },

    address: {
      type: 'string',
      columnType: 'text',
      // required: true
    },

    x_map: {
      type: 'number',
      columnType: 'float'
      //required: true
    },

    y_map: {
      type: 'number',
      columnType: 'float'
      //required: true
    },

    like: {
      type: 'number',
      columnType: 'integer'
      //required: true
    },

    dis_like: {
      type: 'number',
      columnType: 'integer'
      //required: true
    },

    visited: {
      type: 'number',
      columnType: 'integer'
      //required: true
    },

    emtiaz: {
      type: 'number',
      columnType: 'integer'
      //required: true
    },

    tags: {
      type: 'string',
      //required: true
    },

    user_owner:{
      model: 'user'
    },

    city_owner:{
      model: 'city'
    },

    pictures: {
      collection: 'placepicture',
      via: 'place_owner'
    },

    patoghs: {
      collection: 'patogh',
      via: 'place_owner'
    },

    features: {
      collection: 'features',
      via: 'place_owner'
    },

    hozores: {
      collection: 'hozor',
      via: 'place_owner'
    }

  },

  // validationMessages : {
  //   title:{
  //     required: 'فیلد عنوان را پر کنید',
  //     alpha: 'فقط باید حروف را وارد کنید'
  //   },
  //   body:{
  //     required: 'فیلد توضیحات را پر کنید',
  //     alpha: 'فقط باید حروف را وارد کنید'
  //   },
  //   address:{
  //     required: 'فیلد آدرس را پر کنید',
  //     alpha: 'فقط باید حروف را وارد کنید'
  //   },
  // },
};

