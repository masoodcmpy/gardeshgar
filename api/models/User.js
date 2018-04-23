/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt');

module.exports = {

  attributes: {

    username: {
      type: 'string',
      //required: true,
      //alphanumericdashed: true,
      // unique: true
    },

    password: {
      type: 'string',
      //required: true
    },

    type: {
      type: 'number',
      columnType: 'integer'
    },

    last_x_map: {
      type: 'number',
      columnType: 'float',
      allowNull: true
    },

    last_y_map: {
      type: 'number',
      columnType: 'float',
      allowNull: true
    },

    places :{
      collection: 'place',
      via: 'user_owner'
    },

    patoghs: {
      collection: 'patogh',
      via: 'user_owner'
    },

    hozores: {
      collection: 'hozor',
      via: 'user_owner'
    }
    // profile: {
    //   collection: 'profile',
    //   via: 'user_owner'
    // }

  },

  // rule :{
  //   username: ['نام کاربری','required','unique','alpha'],
  //   password: ['کلمه عبور','required','max:10'],
  //   type: ['نوع کاربر','required','max']
  // },

  // validationMessages: {
  //
  //   username:{
  //     required: 'فیلد نام کاربری را پر کنید',
  //     // alphanumericdashed: 'فقط باید حروف و اعداد و زیرخط را وارد کنید',
  //     unique: 'این نام کاربری قبلا ثبت شده است',
  //     UsageError: 'ssssssssssssssssss'
  //   },
  //
  //   password: {
  //     required: 'فیلد کلمه عبور را وارد کنید'
  //   }
  //
  // },

  // beforCreate: function (values, cb) {
  //   if(values.password != values.confirm_password){
  //     return cb.json({'status':false,'errors':'کلمه های عبور با هم یکسان نمیباشند'});
  //   }
  //   else {
  //     bcrypt.hash(values.password,10,function (err, hash) {
  //       if(err) return cb(err);
  //       values.password = hash;
  //       cb();
  //     });
  //   }
  // },

  // beforeUpdate: function (values, cb) {
  //   if(values.password != values.confirm_password){
  //     return cb.json({'status':false,'errors':'کلمه های عبور با هم یکسان نمیباشند'});
  //   }
  //   else {
  //     bcrypt.hash(values.password,10,function (err, hash) {
  //       if(err) return cb(err);
  //       values.password = hash;
  //       cb();
  //     });
  //   }
  // },
};

