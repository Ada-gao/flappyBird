/**
 * Created by 高原 on 2017/6/10.
 */
(function (Fly) {
  'use strict';
  
  var Pipe = function (config) {
    this.imgTop = config.imgTop;
    this.imgBottom = config.imgBottom;
    this.ctx = config.ctx;
    this.x = config.x;
    this.pipeSpace = config.pipeSpace;
  
    this.imgW = this.imgTop.width;
    this.imgH = this.imgTop.height;
    this.speed = 0.1;
    this.topY = 0;
    this.bottomY = 0;
  
    //重新随机生成管道的高度：
    this.initPipeHeight();
  };
  
  Pipe.prototype.draw = function (delta) {
    this.x -= this.speed * delta;
    if (this.x <= -this.imgW * 3) {
      this.x += this.imgW * 3 * 6;
      
      //重新随机生成管道的高度：
      this.initPipeHeight();
    }

    this.ctx.drawImage(this.imgTop, this.x, this.topY);
    this.ctx.drawImage(this.imgBottom, this.x, this.bottomY);
    
    // this.ctx.beginPath();必须要在所有对象的大画布中清除路径才行
    this.ctx.rect(this.x, this.topY, this.imgW, this.imgH);
    this.ctx.rect(this.x, this.bottomY, this.imgW, this.imgH);
    this.ctx.fill();
  
    // 错误写法：
    // this.ctx.fill(this.imgTop, this.x, this.topY);
    // this.ctx.fill(this.imgBottom, this.x, this.topY);
    
  };
  
  //随机生成管道的高度：
  Pipe.prototype.initPipeHeight = function () {
    var  pipeTopHeight = Math.random()*200 + 50;
    
    //下面管道的y坐标：
    this.bottomY = pipeTopHeight + this.pipeSpace;
    
    //上面管道的y坐标：
    this.topY = pipeTopHeight - this.imgTop.height;
  };
  
  Fly.Pipe = Pipe;
})(Fly);