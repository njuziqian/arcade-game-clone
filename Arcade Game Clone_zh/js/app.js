// 这是我们的玩家要躲避的敌人 
var Enemy = function () {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;//甲虫都从最左边出现
    this.y = (Math.floor(Math.random() * 10 + 1) % 3) * 83 + 55;//随机初始化甲虫的行位置
    this.speed = Math.floor(Math.random() * 200 + 100);//随机初始化甲虫的移动速度
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function (dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    if (this.x > 505) {//甲虫离开屏幕后重新初始位置
        this.y = (Math.floor(Math.random() * 10 + 1) % 3) * 83 + 55;
        this.x = 0;
    }
    else
        this.x += dt * this.speed;//甲虫在屏幕中向右移动
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数

var Player = function () {
    this.Photo = 'images/char-boy.png';
    /*
    初始化玩家位置，每次都在中间
    */
    this.x = 101 * 2;
    this.y = 101 * 4;

};
//根据玩家键盘方向键更新玩家的位置，并判断玩家是否胜利或死亡
Player.prototype.update = function (keyup) {
    /*
    每次移动一格，不能移出屏幕
    */
    if (keyup == 'left') {
        this.x -= 101;
        if (this.x <= 10)
            this.x = 10;
    }
    else if (keyup == 'up') {
        this.y -= 83;
        if (this.y <= -18)
            this.y = -18;
    }
    else if (keyup == 'right') {
        this.x += 101;
        this.x = Math.min(404, this.x);
    }
    else if (keyup == 'down') {
        this.y += 83;
        this.y = Math.min(404, this.y);
    }
    if (this.GameOver()) {//碰到虫子死了或者赢了都重新开始，位置随机
        this.x = 101 * (Math.floor(Math.random() * 10 + 1) % 3);
        this.y = 101 * 4;
    }
    if (this.Win()) {//胜利到达河边回到初始位置
        this.x = 101 * 2;
        this.y = 101 * 4;
    }
};
//如果玩家到达河边则胜利
Player.prototype.Win = function () {
    if (this.y <= 0)
        return true;
    else
        return false;
};
//如果玩家碰到虫子则死亡
Player.prototype.GameOver = function () {
    var px = this.x;
    var py = this.y;
    var dead = false;
    allEnemies.forEach(function (enemy) {
        if (px - enemy.x < 42 && px - enemy.x > -42 && Math.abs(py - enemy.y) < 30)
            dead = true;
    })
    return dead;
};
//用来在屏幕上画出玩家
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.Photo), this.x, this.y);
};
//根据玩家输入更新玩家位置
Player.prototype.handleInput = function (keyup) {
    this.update(keyup);
};
// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies = [];
//实例化4个敌人
for (var i = 1; i < 5; i++) {
    allEnemies.push(new Enemy());
}
//实例化玩家
var player = new Player();

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
