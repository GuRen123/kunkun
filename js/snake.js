//定义蛇的类
function Snake(select){
    this.init = function(){
        //加载地图
        this.map = document.querySelector(select);
        //存储蛇的数组
        this.SnakeList = [];
        //定义蛇行动的方位
        this.direction = 'right';
        //用来标记蛇头的位置
        this.index = this.SnakeList.length;
        //创建一条蛇
        this.createSnake();
    }
    //创建蛇头的函数
    this.createSnakeHead = function(){
        //定义坐标
        var poS = {x:0,y:0}
        //获取数组当中的第0位找到蛇头
        var head = this.SnakeList[this.index - 1];
        if(head){
            //如果有蛇头那么新创建的蛇头放到原先蛇头的后面
            //方位
            switch(this.direction){
                case 'left': poS.x = head.offsetLeft - 20;
                            poS.y = head.offsetTop;break;
                case 'right': poS.x = head.offsetLeft + 20;
                            poS.y = head.offsetTop;break;
                case 'top': poS.y = head.offsetTop - 20;
                            poS.x = head.offsetLeft;break;
                case 'bottom': poS.y = head.offsetTop + 20;
                            poS.x = head.offsetLeft;break;
                default:break;
            }
            head.className = 'Snake-body';
        }        
        //创建一个蛇头
        var SnakeHead = document.createElement('div');
        //定义样式
        SnakeHead.className = 'Snake-head';
        //存入数组
        this.SnakeList.push(SnakeHead);
        this.index = this.SnakeList.length;
        // 给蛇头定义坐标
        SnakeHead.style.left = poS.x + 'px';
        SnakeHead.style.top = poS.y+ 'px';

        this.map.appendChild(SnakeHead);
    }
    //创建一条蛇
    this.createSnake = function(){
        for(var i=0;i<4;i++){
            this.createSnakeHead();
        }
    }
    //蛇的移动
    this.move = function(){
        //添加蛇头
        this.createSnakeHead();
        //删除蛇尾
        //从数组中删除最后一条尾巴(反着来的)
        var body = this.SnakeList.splice(0,1);
        //更新一下数组长度
        this.index = this.SnakeList.length;
        //从地图上删去
        body[0].remove();

        
    }
    // 是否吃到食物了
    this.isEet = function(x,y){
        //获取蛇头
        var head = this.SnakeList[this.index-1];
        if(head.offsetLeft == x && head.offsetTop == y){
            return true;
        }
        return false;
    }

    //是否撞墙
    this.isDidQ = function(){
        //获取蛇头
        var head = this.SnakeList[this.index-1];
        //获取地图最大值
        var MaxWidth = this.map.clientWidth;
        var MaxHeight = this.map.clientHeight;
        if(head.offsetLeft < 0 || head.offsetLeft > MaxWidth - 20 || head.offsetTop < 0 || head.offsetTop > MaxHeight - 20){
            return true;
        }
        return false;
    }

    //是否撞到自身
    this.isDid = function(){
        //获取蛇头
        var head = this.SnakeList[this.index - 1];
        //判断蛇头是否撞向自身
        for(var i=0;i<this.SnakeList.length - 1;i++){
            if(head.offsetLeft == this.SnakeList[i].offsetLeft && head.offsetTop == this.SnakeList[i].offsetTop){
                return true;
                break;
            }
        }
        return false;   
    }
    this.init();
}