(function (Fly) {
  'use strict';
  var Land = function (config) {
    this.img = config.img;
    this.ctx = config.ctx;
    this.x = config.x;
    this.y = config.y;
  
    // this.y = this.ctx.height - this.img.height;
    this.imgW = this.img.width;
    this.speed = 0.1;
  };
  
  Land.prototype.draw = function (delta) {
    //计算经过delta之后陆地的位移：
    this.x -= this.speed * delta;
    if (this.x <= -this.imgW) {
      this.x += this.imgW * 4
    }
    
    this.ctx.drawImage(this.img, this.x, this.y);
  };
  
  Fly.Land = Land;
  
})(Fly);