//自调用函数---游戏对象
(function () {
    var that = null;//该变量的目的就是为了保存游戏Game的实例对象

    //游戏的构造函数
    function Game(map) {
        this.food = new Food();//食物
        this.snake = new Snake();//小蛇
        this.map = map;//地图
        that = this;//保存当前的实例对象到that变量中----此时that就是this
    }

    //添加原型方法---设置小蛇和食物显示在地图上
    Game.prototype.init = function () {
        //食物显示在地图上
        this.food.init(this.map);
        //小蛇显示在地图上
        this.snake.init(this.map);
        /* setInterval(function (){
             //小蛇显示在地图上
             that.snake.init(that.map);
             //小蛇移动
             that.snake.move(that.food, that.map);
         },200);*/
        //调用小蛇自动跑起来的方法
        this.runSnake(this.food, this.map);
        //调用按键的方法
        this.bindKey();
    };

    //添加原型方法---小蛇自动跑起来的方法
    Game.prototype.runSnake = function (food, map) {
        //自动的移动
        var timeId = setInterval(function () {
            //移动小蛇
            this.snake.move(food, map);
            //显示小蛇
            this.snake.init(map);
            //横坐标最大值
            var maxX = map.offsetWidth / this.snake.width;//40
            //纵坐标最大值
            var maxY = map.offsetHeight / this.snake.height;//30
            //蛇头的横坐标
            var headX = this.snake.body[0].x;
            //蛇头的纵坐标
            var headY = this.snake.body[0].y;
            //蛇头的横坐标小于0或者大于最大横坐标
            if (headX < 0 || headX >= maxX) {
                //说明撞墙了 停止定时器
                clearInterval(timeId);
                alert("游戏结束");
            }
            //蛇头的纵坐标小于0或者大于最大纵坐标
            if (headY < 0 || headY >= maxY) {
                //说明撞墙了 停止定时器
                clearInterval(timeId);
                alert("游戏结束");
            }
        }.bind(that), 150);
    };

    //添加原型方法---获取用户键盘按键的值 改变小蛇移动的方向
    Game.prototype.bindKey = function () {
        document.addEventListener("keydown", function (e) {
            switch (e.keyCode) {
                case 37:
                    this.snake.direction = "left";
                    break;
                case 38:
                    this.snake.direction = "top";
                    break;
                case 39:
                    this.snake.direction = "right";
                    break;
                case 40:
                    this.snake.direction = "bottom";
                    break;
            }
        }.bind(that), false);
    };
    window.Game=Game;
}());