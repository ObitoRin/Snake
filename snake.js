//自调用函数---小蛇对象
(function () {
    var elements = [];//存放小蛇每个身体部分的

    //小蛇的构造函数 有宽 高 方向
    function Snake(width, height, direction) {
        //小蛇的每个部分的宽和高
        this.width = width || 20;
        this.height = height || 20;
        this.body = [
            {x: 3, y: 2, color: "red"},   //头
            {x: 2, y: 2, color: "orange"},//身体
            {x: 1, y: 2, color: "orange"},//身体
        ];
        //方向
        this.direction = direction || "right";
    }

    //在原型中添加方法---把小蛇添加到地图中显示
    Snake.prototype.init = function (map) {
        //每次显示之前先删除之前的小蛇
        remove();
        //循环遍历 创建div
        for (var i = 0; i < this.body.length; i++) {
            var obj = this.body[i];//每个对象
            //创建每个身体部分
            var div = document.createElement("div");
            //追加到地图中
            map.appendChild(div);
            div.style.position = "absolute";
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            //横纵坐标
            //div.style.left=this.body[i].x;
            div.style.left = obj.x * this.width + "px";
            div.style.top = obj.y * this.height + "px";
            //颜色
            div.style.backgroundColor = obj.color;
            //方向
            //把每个身体部分添加到elements数组中---目的是为了删除
            elements.push(div);
        }
    };

    //在原型中添加方法---小蛇动起来
    Snake.prototype.move = function (food, map) {
        //改变小蛇身体的位置
        var i = this.body.length - 1;//2
        for (; i > 0; i--) {
            //索引为2(最后一块)的身体的横纵坐标=索引为1(倒数第二块)的身体的横纵坐标;
            //索引为1(倒数第二块)的身体的横纵坐标;=索引为0(第一块)的身体的横纵坐标;
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }

        //改变蛇头的位置
        switch (this.direction) {
            case "right" :
                this.body[0].x += 1;
                break;
            case "left" :
                this.body[0].x -= 1;
                break;
            case "top" :
                this.body[0].y -= 1;
                break;
            case "bottom" :
                this.body[0].y += 1;
                break;
        }

        //判断有没有吃到食物
        //获取蛇头的横纵坐标
        var headX = this.body[0].x * this.width;
        var headY = this.body[0].y * this.height;
        //判断蛇头的横纵坐标和食物的横纵坐标是不是相等
        if (headX == food.x && headY == food.y) {
            //复制一个蛇尾
            var last = this.body[this.body.length - 1];

            //添加到body中
            this.body.push({
                x: last.x,
                y: last.y,
                color: last.color
            });
            //把食物删除  重新显示一个食物
            food.init(map);
        }

    };

    //私有函数-----删除小蛇
    function remove() {
        //从蛇尾开始删  倒着删
        //删除map中的小蛇的每个div,同时删除elements数组中的每个元素,elements数组中和map中小蛇的身体个数是一致的
        var i = elements.length - 1;
        for (; i >= 0; i--) {
            var ele = elements[i];//所有的身体
            //通过身体找到的父级元素map来删除子级元素身体
            ele.parentNode.removeChild(ele);
            //删除数组中的身体
            elements.splice(i, 1);
        }
    }

    //把Snake暴露给window,外部可以访问
    window.Snake = Snake;
}());