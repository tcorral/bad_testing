(function () {
  'use strict';
  var toString = function (mixed) {
    return {}.toString.call(mixed);
  };
  var traverse = function traverse(obj, newObj){
    var key, item, objString;
    for(key in obj) {
      try{
        if(obj.hasOwnProperty(key)) {
          item = obj[key];
          objString = toString(item);
          switch(objString){
            case '[object Function]':
              newObj[key] = sinon.stub().returns(newObj);
              break;
            case '[object Object]':
              newObj[key] = traverse(item, newObj);
              break;
            case '[object Array]':
              newObj[key] = item.concat();
              break;
            default:
              newObj[key] = item;
              break;
          }
        }
      }catch(er){
        // Trap errors when trying to change read only properties.
      }
    }
    return newObj;
  };
  function adapter(Hydra, sinon) {
    Hydra.testing.setMockLibrary(sinon,
      {
        mockJQuery: function (obj) {
          var newObj;
          var _stub = sinon.stub();
          if(toString(obj) === '[object Function]'){
            newObj = _stub.returns(traverse(obj, _stub));
          }
          return newObj;
        },
        getAllFunctionsStubbed: function (oObj) {
          var root = window || global;
          if(oObj === root.jQuery){
            return this.mockJQuery(oObj);
          }
          var sKey,
            oMock = {},
            oWhatever;
          if(oObj.toString() === 'stub')
          {
            return oObj;
          }
          if (typeof oObj === 'function') {
            if (oObj.prototype) {
              oMock = sinon.stub();
              oMock.prototype = {};
              for(sKey in oObj.prototype){
                oWhatever = oObj.prototype[sKey];
                if (typeof oWhatever === 'function') {
                  if(oWhatever.toString() !== 'stub')
                  {
                    oMock.prototype[sKey] = sinon.stub();
                  }else{
                    oMock.prototype[sKey] = oWhatever;
                  }
                } else {
                  oMock.prototype[sKey] = oWhatever;
                }
              }
            }else{
              return sinon.stub();
            }
            return oMock;
          }
          for (sKey in oObj) {
            oWhatever = oObj[sKey];
            if (typeof oWhatever === 'function') {
              if(oWhatever.toString() !== 'stub')
              {
                oMock[sKey] = sinon.stub();
              }else{
                oMock[sKey] = oWhatever;
              }
            } else {
              oMock[sKey] = oWhatever;
            }
          }
          return oMock;
        }
      });
    return Hydra;
  }

  if (typeof define !== 'undefined') {
    define('sinonjs-hydrajs-testing-helper', ['hydrajs-testing-helper', 'sinon'], adapter);
  } else {
    adapter(Hydra, sinon);
  }
}());