(function (window) {
  'use strict';
  var FlyObj = {};
  
  //角度转弧度：
  FlyObj.toRadian = function (angle) {
    return angle / 180 * Math.PI;
  };
  
  //加载图片：
  FlyObj.loadImages = function (srcList, callback) {
    var count = 0;
    var imgsObj = {};
    
    srcList.forEach(function (srcStr) {
      var img = new Image();
      img.src = './images/'+ srcStr +'.png';
      imgsObj[srcStr] = img;
      
      img.onload = function () {
        count++;
        if (count >= srcList.length) {
          callback( imgsObj );
        }
      }
    })
  };
  
  //工厂模式：
  FlyObj.factory = function (type, option) {
    switch (type) {
      case 'Bird':
        return new FlyObj.Bird(option);
      case 'Sky':
        return new FlyObj.Sky(option);
      case 'Land':
        return new FlyObj.Land(option);
      case 'Pipe':
        return new FlyObj.Pipe(option);
    }
   
  };
  
  window.Fly = FlyObj;
})(window);