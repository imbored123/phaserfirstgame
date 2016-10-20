/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update});
var player;
var platforms;
var score;
var stars;
var scoreText;
var cursors;

function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(9, 9, 'sky');
    game.add.sprite(8, 8, 'star');
    
    platforms=game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0,game.world.height-64,'ground');
    ground.scale.setTo(2, 2);
    ground.body.imoveable = true;
    var ledge = platforms.create(2, 2, 'ground');
    ledge.body.imovable = true;
    player = game.add.sprite(32, game.world.height - 150, 'dude');
    game.pysics.arcade.enable(player);
    player.body.bounce.y = 0.1;
    player.body.gravity.y = 100;
    player.body.collideWorldBounds = true;
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    cursors = game.input.keyboard.createCursorKeys();
    stars = game.add.group();
    stars.enableBody = true;
    
    for (var i = 0; i < 12; i++)
    {
        var star = stars.create(i * 70, 0, 'star');
        
        star.body.gravity.y = 6;
        
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
}

function update() {
    
    
    var hitPlatform = game.physics.arcade.collide(player, platforms);

    player.body.velocity.x = 0;
    if (cursors.left.isDown)
    {
    player.body.velocity.x = -150;
    player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    else
    {
        player.animations.stop();
        player.frame = 4;
    }
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.y = -350;
    }
    game.physics.arcade.collde(stars, platforms);
    game.physics
}
