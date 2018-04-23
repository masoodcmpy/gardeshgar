var validator = require('validator');
module.exports = {
  fdc: function (data, rule) {
    var errs = [];
    // console.log(data.param('username'));
    console.log("rule= ----------------  \n");
    var keys = Object.keys(rule);
    console.log(keys + "\n");
    for(let i=0;i<keys.length;i++){
      for(let j=1;j<rule[keys[i]].length;j++){
        console.log(keys[i] + ": " + rule[keys[i]][j]);
        if(rule[keys[i]][j] == "required") {
          // this._required(data, keys[i]) ? errs.ad(rule[keys[i]][0] + " را وارد کنید") : null;
          if(this._required(data, keys[i]))
            errs[keys[i]] = rule[keys[i]][0] + " را وارد کنید";
          continue;
        }
        if(rule[keys[i]][j] == "alpha"){
          if(! this._isAlpha(data,keys[i]))
            errs[keys[i]] = 'فیلد' + rule[keys[i]][0] + 'فقط باید شامل حروف الفبا باشد';
          continue;
        }
      }
    }
    return errs;

  },

  _required: function (data,field_name) {
    if(data.param(field_name) === undefined)
      return true;
    return false;
  },

  _isAlpha: function (data,field_name) {

    try{
      return validator.isAlpha(data.param(field_name));
    }
    catch (e) {
      return false;
    }
  }
}

