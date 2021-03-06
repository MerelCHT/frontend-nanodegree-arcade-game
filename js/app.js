// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = (Math.floor(Math.random()*3)+1)*83-20;
    this.speed = Math.random()*100+300;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-princess-girl.png';
    this.x = 202;
    this.y = 83*4-10;
    this.hp = new Lives();
}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Checks whether the player is still within the bounds of the game canvas. If not, the player is put back
//to his/her starting position. 
Player.prototype.update = function() {
    if (this.x < 0 || this.x > 404 || this.y > 83*5 || this.y < 73 )  {
        console.log("out of bounds!");
        this.x = 202;
        this.y = 83*4-10;
        allEnemies = new Array();
    }
}

Player.prototype.handleInput = function(direction) {
    switch (direction) {
        case 'left':
            this.x -= 101;
            break;
        case 'right':
            this.x += 101;
            break;
        case 'up':
            this.y -= 83;
            break;
        case 'down':
            this.y += 83;
            break;
    }
}

//The number of lives a player has is initiliased to 3. 
var Lives = function(){
    this.sprite = 'images/Heart.png';
    this.value = 3;
}

//The 3 lives the player has are drawn in a black box as 3 hearts. 
Lives.prototype.render = function() {
  ctx.fillRect(0, 0, 150, 45);
  for (var x = 0, i = 0; i < this.value; i++)
  {
    ctx.drawImage(Resources.get(this.sprite), x, -25);
    x += 50;
  }
}

//Whenever a player gets hit by an enemy, he/she loses 1 live. 
Lives.prototype.update = function(){
        this.value -= 1;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = new Array();
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
