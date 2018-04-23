/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'GET /images/:model/:name' : 'MediaController.get', //custom assets controller

//************************************************************************************************
  /*
    send request for each picture of place
    parameter: {
      name: name of picture related to place (pic_address field in DB)
    }
  */
  'GET /placepic': 'PicController.sendpic',


  /*
    send request to upload each picture of place
    parameter: {
      pic: picture that you want to upload
      date
      desc: description
      place_id : id of place
    }
  */
  'POST /place/upload': 'PlacePictureController.create',

//************************************************************************************************

//************************************************************************************************
  /*
    send request to get all places

    imagin we have to variable: limit and skip
    limit : Which means to display a few items per page?
    skip: default is 0.  But in each request you must do skip = skip + limit   and send to server

    parameter: {
      skip: skip + limit
    }
  */
  'GET /place/all': 'PlaceController.index',

  /*
    send request to get single place
    parameter: {
      place_id: id of place that you want fetch
    }
  */
  'POST /place/single/:place_id': 'PlaceController.single',

  /*
    send request to create new place
    parameter: {
      title,body,address,x_map,y_map,like,dis_like,visited,emtiaz,tags,
      city : id of city,
      user : id of user
    }
  */
  'POST /place/create': 'PlaceController.create',


  /*
    send request to update an place
    parameter: {
      title,body,address,x_map,y_map,like,dis_like,visited,emtiaz,tags,
      city : id of city,
      user : id of user
    }
  */
  'PATCH /place/:id': 'PlaceController.update',


  /*
   send request to delete an place
   parameter: {
     id: id of place that you want to delete
   }
 */
  'DELETE /place/:id': 'PlaceController.delete',
//************************************************************************************************

//************************************************************************************************
  'GET /country/all': 'CountryController.index',
  'POST /country/create': 'CountryController.create',
  'PATCH /country/:id': 'CountryController.update',
  'DELETE /country/:id': 'CountryController.delete',
//************************************************************************************************


//************************************************************************************************
  'GET /ostan/all': 'OstanController.index',
  'POST /ostan/create': 'OstanController.create',
  'PATCH /ostan/:id': 'OstanController.update',
  'DELETE /ostan/:id': 'OstanController.delete',
//************************************************************************************************


//************************************************************************************************
  'GET /city/all': 'CityController.index',
  'POST /city/create': 'CityController.create',
  'PATCH /city/:id': 'CityController.update',
  'DELETE /city/:id': 'CityController.delete',
//************************************************************************************************


//************************************************************************************************
  'GET /user/all': 'UserController.index',
  'POST /user/create': 'UserController.create',
  'PATCH /user/:id': 'UserController.update',
  'DELETE /user/:id': 'UserController.delete',
//************************************************************************************************


//************************************************************************************************
  'Get /profile/:user_id': 'ProfileController.index',
  'POST /profile/create': 'ProfileController.create',
  'PATCH /profile/:user_id': 'ProfileController.update',
  'DELETE /profile/:user_id': 'ProfileController.delete',
//************************************************************************************************


//************************************************************************************************
  'GET /features/all': 'FeaturesController.index',
  'POST /features/create': 'FeaturesController.create',
  'PATCH /features/:id': 'FeaturesController.update',
  'DELETE /features/:id': 'featuresController.delete',
//************************************************************************************************

  'GET /patogh/all': 'PatoghController.index',
  'POST /patogh/create': 'PatoghController.create',
  'PATCH /patogh/:id': 'PatoghController.update',
  'DELETE /patogh/:id': 'PatoghController.delete',

//************************************************************************************************

  'GET /hozor/all': 'HozorController.index',
  'POST /hozor/create': 'HozorController.create',
  'PATCH /hozor/:id': 'HozorController.update',
  'DELETE /hozor/:id': 'HozorController.delete',

//************************************************************************************************
  'GET /comment/all': 'CommentController.index',
  'POST /comment/single/:comment_id': 'CommentController.single',
  'POST /comment/create': 'CommentController.create',
  //'PATCH /comment/:id': 'CommentController.update',
  'DELETE /comment/:id': 'CommentController.delete',
//************************************************************************************************
/***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝



  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
