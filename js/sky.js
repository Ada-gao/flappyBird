(function (Fly) {
  'use strict';
  
  var Sky = function (config) {
    this.img = config.img;
    this.ctx = config.ctx;
    this.x = config.x;
    
    this.y = 0;
    this.imgW = this.img.width;
    // this.frameIndex = 0;
    this.speed = 0.1;
    
  };
  
  Sky.prototype = {
    constructor: Sky,
    
    draw: function (delta) {
      //计算天空经过delta之后的位移：
      this.x -= this.speed * delta;
      if(this.x <= -this.imgW) {
        this.x += this.imgW * 2
      }
      
      this.ctx.drawImage(this.img, this.x, this.y);
    }
  };
  
  Fly.Sky = Sky;
})(Fly);