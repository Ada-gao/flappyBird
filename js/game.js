/**
 * Created by 高原 on 2017/6/10.
 */
(function (Fly) {
  'use strict';
  
  var Game = function (config) {
    console.log( this );
    // this.ctx = config.ctx;
    
    this.imgsArr = ['birds', 'land', 'sky', 'pipe1', 'pipe2'];
    this.isStart = true;
    this.delta = 0;
    this.lastFrameTime = new Date();
    this.currFrameTime;
  
    this.roles = [];
    this.hero = null;
    
    this.createCanvas(config.id);
  };
  
  Game.prototype = {
    constructor: Game,
    
    //开始游戏：
    start: function () {
      var that = this;
      Fly.loadImages(this.imgsArr, function (imgsList) {
        //匀加速公式：
        //s = v * t + 1/2 * a *t *t;
        //v 是初始速度  speed
        //t 是间隔时间  delta
        //a 是加速度
        //s 是位移
        //v0 初始速度：v = v0 + a * t;
        that.init(imgsList);
        
        that.render(imgsList);
        
        that.bindEvent();
        
      });
  
    },
    
    //初始化游戏中的角色：
    init: function (imgsList) {
      var i;
      var context = this.ctx;
      var imgSky = imgsList.sky;
      var imgLand = imgsList.land;
  
      //1 新建一个小鸟对象：
      this.hero = Fly.factory('Bird', {
        img: imgsList.birds,
        ctx: context
      });
  
      //2 新建两个天空对象：
      for(i = 0; i < 2; i++) {
        var sky = Fly.factory('Sky', {
          img: imgSky,
          ctx: context,
          x: i * imgSky.width
        });
        this.roles.push(sky);
      }
  
      //3 新建六个管道对象：
      for(i = 0; i < 6; i++) {
        var pipe = Fly.factory('Pipe', {
          imgTop: imgsList.pipe2,
          imgBottom: imgsList.pipe1,
          ctx: context,
          x: 300 + i * imgsList.pipe1.width * 3,
          pipeSpace: 200
        });
        this.roles.push(pipe);
      }
  
      //4 新建四个陆地对象：
      for(i = 0; i < 4; i++) {
        var land = Fly.factory('Land', {
          img: imgLand,
          ctx: context,
          x: i * imgLand.width,
          y: imgSky.height - imgLand.height
        });
        this.roles.push(land);
      }
    },
    
    //绑定事件：
    bindEvent: function () {
      var that = this;
      this.ctx.canvas.addEventListener('click', function () {
        that.hero.changeSpeed( -0.3 );
      })
    },
    
    //渲染游戏：
    render: function (imgsList) {
      var that = this;
      console.log( that );
      var context = that.ctx;
      var cvW = context.canvas.width;
      var cvH = context.canvas.height;
      var imgSky = imgsList.sky;
      var imgLand = imgsList.land;
      
      
      (function renderGame() {
        context.beginPath();
        context.save();
        context.clearRect(0, 0, cvW, cvH);
    
        that.currFrameTime = new Date();
    
        that.delta = that.currFrameTime - that.lastFrameTime;
        that.lastFrameTime = that.currFrameTime;
    
        /* //绘制天空：这样写必须要写两个
         sky.draw( delta );*/
    
        //绘制游戏角色：
        that.roles.forEach(function (role) {
          role.draw( that.delta );
        });
    
        //绘制小鸟：
        that.hero.draw( that.delta );
    
        //检测碰撞
//				context.isPointInPath(100, 100);
        if (that.hero.y <= 0 || that.hero.y >= (imgSky.height - imgLand.height) || context.isPointInPath(that.hero.x, that.hero.y)) {
          that.isStart = false;
        }
    
        //恢复状态
        context.restore();
    
        if(that.isStart) {
          requestAnimationFrame( renderGame );
        }
      })();
    },
    
    //创建canvas：
    createCanvas: function (id) {
      var cv = document.createElement('canvas');
      cv.height = 600;
      cv.width = 800;
      cv.style.border = '1px solid red';
      var container = document.getElementById(id) || document.body;
      container.appendChild(cv);
  
      this.ctx = cv.getContext('2d');
  
    }
  };
  
  Fly.Game = Game;
  
})(Fly);