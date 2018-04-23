/**
 * Patogh.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    createdAt: false,
    updatedAt: false,

    place_owner: {
      model: 'place',
    },

    user_owner: {
      model: 'user',
    }

  },

  // validationMessages: {
  //   title: {
  //     required: 'عنوان کشور را وارد کنید'
  //   },
  // },
};

