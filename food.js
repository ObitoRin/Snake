//自调用函数---食物对象
(function () {
    var elements = [];//用来保存每个小方块食物
    //小方块食物就是一个对象,有宽,有高,有颜色,有横纵坐标,先定义构造函数,然后创建对象
    function Food(x, y, width, height, color) {
        //横纵坐标默认是0
        this.x = x || 0;
        this.y = y || 0;
        //宽高默认是20
        this.width = width || 20;
        this.height = height || 20;
        this.color = color || "yellow";
    }

    //为原型添加方法,把小方块显示在地图上
    //因为食物要在地图上显示,所以需要地图的这个参数(map---就是页面上的.class=map的这个div)
    Food.prototype.init = function (map) {
        //先删除地图中的小方块食物,再显示小方块再地图上
        remove();
        //创建小方块元素
        var div = document.createElement("div");
        //小方块追加到地图中
        map.appendChild(div);
        //设置小方块的样式
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.backgroundColor = this.color;
        //先脱离文档流
        div.style.position = "absolute";
        //产生随机横纵坐标
        this.x = parseInt(Math.random() * (map.offsetWidth / this.width)) * this.width;
        this.y = parseInt(Math.random() * (map.offsetHeight / this.height)) * this.height;
        div.style.left = this.x + "px";
        div.style.top = this.y + "px";
        //把小方块添加到数组elements中
        elements.push(div);
    };

    //私有函数,删除小方块食物
    function remove() {
        //elements数组中有这个小方块食物
        for (var i = 0; i < elements.length; i++) {
            var ele = elements[i];//小方块食物
            //找到小方块食物的父级地图,再删除地图的子级小方块食物
            ele.parentNode.removeChild(ele);
            //再把数组elements中的小方块食物也删除
            elements.splice(i, 1);
        }
    }

    //把小方块构造函数暴露给window,成为全局对象
    window.Food = Food;
}());