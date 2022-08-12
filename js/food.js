//定义食物的类
function Food(select){
    this.init = function(){
        //获取地图
        this.map = document.querySelector(select);
        //定义食物的坐标
        this.x = 0;
        this.y = 0;

        //创建食物
        this.fooddiv = document.createElement('div');
        this.fooddiv.className = 'food';
        //添加到地图中
        this.map.appendChild(this.fooddiv);
        //更新食物的位置
        this.posFood();
    }

    this.posFood = function(){
        //获取地图的格子数
        var countLeft = this.map.clientWidth / 20;
        var countTop = this.map.clientHeight / 20;
        //随机数
        this.x = Math.floor(Math.random() * countLeft) * 20;
        this.y = Math.floor(Math.random() * countTop) * 20;
        //更新食物位置
        this.fooddiv.style.left = this.x  + 'px';
        this.fooddiv.style.top = this.y  + 'px';
    }

    this.init();
}