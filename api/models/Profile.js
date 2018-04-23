/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    fname: {
      type: 'string',
      // required: true
    },

    lname: {
      type: 'string',
      // required: true
    },

    mobile: {
      type: 'string',
      // required: true
    },

    email: {
      type: 'string',
      // required: true
    },

    desc: {
      type: 'string',
      columnType: 'text',
    },

    user_owner: {
      model: 'user',
      // unique: true
    }

  },

  // validationMessages: {
  //   fname: {
  //     required: 'نام را وارد کنید'
  //   },
  //
  //   lname: {
  //     required: 'فامیلی را وارد کنید'
  //   },
  //
  //   mobile:{
  //     required: 'شماره همراه را وارد کنید'
  //   },
  //
  //   email: {
  //     required: 'رایانامه(ایمیل) را وارد کنید'
  //   },
  // }
};

