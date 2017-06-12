(function (Fly) {
  'use strict';
  
  var Bird = function (config) {
    this.img = config.img;
    this.ctx = config.ctx;
    
    this.imgW = this.img.width / 3;
    this.imgH = this.img.height;
    this.frameIndex = 0;
    this.x = 100;
    this.y = 100;
    this.speed = 0;
    this.a = 0.0005;
    
    this.maxAngle = 45;
    this.maxSpeed = 0.5;
    this.angle = 0;
  };
  
  Bird.prototype = {
    constructor: Bird,
    
    draw: function (delta) {
      //计算小鸟经过 delta 之后的位置：
      this.speed = this.speed + this.a * delta;
      this.y +=  this.speed * delta + 1/2 * this.a * Math.pow(delta, 2);
  
  
      this.angle = this.speed / this.maxSpeed * this.maxAngle;
      if(this.speed > this.maxSpeed) {
        this.angle = this.maxAngle
      }else if(this.speed < -this.maxSpeed) {
        this.angle = -this.maxAngle
      }
      
      //先平移再旋转：
      this.ctx.translate(this.x, this.y);
      this.ctx.rotate(Fly.toRadian(this.angle));
      
      this.ctx.drawImage(this.img, this.imgW * this.frameIndex++, 0, this.imgW, this.imgH, -1/2 * this.imgW, -1/2 * this.imgH, this.imgW, this.imgH);
      
      this.frameIndex %= 3;
    },
    
    //改变速度：
    changeSpeed: function (speed) {
      this.speed = speed;
    }
  };
  
  Fly.Bird = Bird
})(Fly);