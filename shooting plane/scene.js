const config = {
	player_speed: 10,
	enemy_speed: 5,
	bullet_speed: 5,
	fire_cooldown: 9,
} //全局变量，与html中的data-value对应

const enemy = []

class Bullet extends GuaImage {
	constructor(game, scene) {
		super(game, 'bullet')
		this.setup()
		this.scene = scene
	}
	setup() {
		this.speed = 10
		this.crash = false;
		this.timeStamp = 3;
	}
	collide(enemy) {
		this.enemy = enemy
		var a = this
		var b = this.enemy
		if(aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
			if(aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
				return true
			}
		}
		return false;
	}
	update() {
		this.speed = config.bullet_speed
		this.y -= this.speed
		var array = this.scene.enemy
		for (var i = 0; i < array.length; i++) {
			if(this.collide(array[i])) {
				this.crash = true
			}
			if(this.crash) {
				// while(this.timeStamp >= 0) {
					if(this.timeStamp == 3) {
						var temp = GuaImage.new(this.game, 'down1')
						temp.x = array[i].x
						temp.y = array[i].y
						array[i] = temp
						this.timeStamp--
					}
					else if(this.timeStamp == 2) {
						var temp = GuaImage.new(this.game, 'down2')
						temp.x = array[i].x
						temp.y = array[i].y
						array[i] = temp
						this.timeStamp--
					}
					else if(this.timeStamp == 1) {
						var temp = GuaImage.new(this.game, 'down3')
						temp.x = array[i].x
						temp.y = array[i].y
						array[i] = temp
						this.timeStamp--
					}
					else if(this.timeStamp == 0) {
						array[i] = Enemy.new(this.game)
						this.crash = false
						this.timeStamp = 3
					}
					
				// }
				
			}
		}
		
	}
	
}

class Player extends GuaImage {
	constructor(game, scene) {
		super(game, 'player')
		this.scene = scene
		this.setup()
	}
	setup() {
		this.speed = 5
		this.cooldown = 0
	}
	update() {
		this.speed = config.player_speed
		if(this.cooldown > 0) {
			this.cooldown--
		}
	}
	fire() {
		if(this.cooldown == 0) {
			this.cooldown = config.fire_cooldown
			var x = this.x + this.w / 2
		    var y = this.y
		    var b = Bullet.new(this.game, this.scene)
		    b.x = x
		    b.y = y
		    this.scene.addElement(b)
		}
	}
	moveLeft() {
		this.x -= this.speed
	}
	moveRight() {
		this.x += this.speed
	}
	moveUp() {
		this.y -= this.speed
	}
	moveDown() {
		this.y += this.speed
	}
}

class Enemy extends GuaImage {
	constructor(game) {
		// var type = randomBetween(0, 4)
		// var name = 'enemy' + type
		super(game, 'enemy')
		this.setup()
		enemy.push(this)
	}
	setup() {
		this.x = randomBetween(0, 350)
		this.y = -randomBetween(0, 200)
		this.speed = randomBetween(2, 5)
	}
	update() {
		this.y += this.speed
		if(this.y > 600) {
			this.setup()
		}
	}
}

class Scene extends GuaScene {
	constructor(game) {
		super(game)
	    this.setup()
	    this.setupInputs()
	}
	static new(game) {
		var i = new this(game)
		return i
	}
	setup() {
		var game = this.game
		this.numberOfEnemy = 10
		this.bg = GuaImage.new(game, 'sky')
		// this.player = GuaImage.new(game, 'player')
		// this.player.x = 150
		// this.player.y = 400

		// this.game.registerAction('a', function(){
		// 	paddle.moveLeft()
		// })
		// this.game.registerAction('d', function(){
		// 	paddle.moveRight()
		// })
		// this.game.registerAction('f', function(){
		// 	ball.fire()
		// })
		this.player = Player.new(game, this)
		this.player.x = 150
		this.player.y = 400
		this.addElement(this.bg)
		this.addElement(this.player)

		this.addEnemy()
	}
	addEnemy() {
		for (var i = 0; i < this.numberOfEnemy; i++) {
			var e = Enemy.new(this.game)
			this.addEnemies(e)
		}
	}
	setupInputs() {
		var g = this.game
		var s = this
    	g.registerAction('a', function(){
		    s.player.moveLeft()
    	})
	    g.registerAction('d', function(){
		    s.player.moveRight()
	    })
	    g.registerAction('w', function(){
		    s.player.moveUp()
	    })
	    g.registerAction('s', function(){
		    s.player.moveDown()
	    })
	    g.registerAction('b', function(){
		    s.player.fire()
	    })
	}
	update() {
		super.update()
	}
	// draw() {
		
	// }	
}

