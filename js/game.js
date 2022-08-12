//游戏控制
function Gameplay(select,fen,end){
    this.map;
    this.food;
    this.snake;
    this.scoreboard;
    this.fen = 0;
    this.speed = 0;
    //初始化
    this.init = function(){
        this.map = document.querySelector(select);
        //创建食物和蛇的实例
        this.food = new Food(select);
        this.snake = new Snake(select);
        this.scoreboard = document.querySelector(fen);
        this.endImg = document.querySelector(end);
        this.ngm = document.querySelector('#ngm');
    }

    //开始游戏
    this.game = function(diff){
        //每次开始之前先清除多余的定时器
        clearInterval(this.timer);
        //判定难度
        if(diff === '简单'){
            this.speed = 100;
        }
        if(diff === '中等'){
            this.speed = 80;
        }
        if(diff === '困难'){
            this.speed = 60;
        }
        if(diff === '地狱'){
            this.speed = 24;
        }
        //禁用开始按钮
        // var btn = document.querySelectorAll('.btn')[0];
        // btn.disabled = true;
        

        // this.timer = setInterval(this.snake.move,1000);
        this.timer = setInterval(() => {
            // 移动蛇
            this.snake.move();
            //判断是否吃到食物
            if(this.snake.isEet(this.food.x,this.food.y)){
                //增加蛇的长度
                this.snake.createSnakeHead();
                //分数+1
                this.fen++;
                //更新计分板
                this.scoreboard.innerText = this.fen;
                //播发音频
                this.startMP3(this.ngm);
                // 更新食物的坐标
                this.food.zuobiao();
                //更新食物的位置
                this.food.posFood();
                
            }
            // 判断是否撞墙
            if(this.snake.isDidQ()){
                this.end(diff);
            }
            //判断是否撞到自己
            if(this.snake.isDid()){
                this.end(diff);
            }
        }, this.speed);


    }


    //改变方位
    this.changeDirection = function(type){
        
        if(type == 39 && this.snake.direction != 'left'){
            this.snake.direction ='right';
        }
        if(type == 38 && this.snake.direction != 'bottom'){
            this.snake.direction ='top';
        }
        if(type == 40 && this.snake.direction != 'top'){
            this.snake.direction ='bottom';
        }
        if(type == 37 && this.snake.direction != 'right'){
            this.snake.direction ='left';
        }


        // switch (type) {
        //     case 'w' || 'W': this.snake.direction = 'top';break;
        //     case 's' || 'S': this.snake.direction = 'bottom';break;
        //     case 'a' || 'A': this.snake.direction = 'left';break;
        //     case 'd' || 'D': this.snake.direction = 'right';break;
        //     default:
        //         break;
        // }
    }
    //游戏结束
    this.end = function(diff){
        clearInterval(this.timer);
        this.endImg.style.display = 'block';
        var btn = document.querySelectorAll('.btn')[0];
        btn.disabled = true;
        if(diff == '地狱' && this.fen >=10){
            alert('一眼丁真鉴定为：真癌粉！');
        }
    }

    //重新开始
    this.restart = function(){
        window.location.reload();
    }

    //更新速度(占时不会)
    var ChangeSpeed = function(diff){
        if(diff == '简单'){
            var changeS = this.speed - (this.fen * 10);
        }
        if(diff == '中等'){
            var changeS = this.speed - (this.fen * 5);
        }
        if(diff == '困难'){
            var changeS = this.speed - (this.fen * 3);
        }
        if(diff == '地狱'){
            var changeS = this.speed - (this.fen * 2);
        }
        return changeS;

    }

    //播发音频
    this.startMP3 = function(src){
        var mp3 = src;
        mp3.play();
    }

    //获取地址
    this.location = function(){
        var str = window.location.href;
        reg = /index.html/;
        var newstr = str.slice(0,str.search(reg));
        return newstr;
    }

    //暂停
    this.pasue = function(){
        clearInterval(this.timer);
    }
    
    this.init();
}


