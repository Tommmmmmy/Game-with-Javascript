var Paddle = function(game) {
	var o = game.imageByName('paddle')
	// var o = {
	// 	image: image,
	// 	x: 100,
	// 	y: 200,
	// 	speed: 15,
	// }
	o.x = 100
	o.y = 200
	o.speed = 15
	o.moveLeft = function() {
		o.x -= o.speed;
		if(o.x < 0) {
			o.x = 0
		}
	}
	o.moveRight = function() {
		o.x += o.speed;
		if (o.x > 400 - o.image.width) {
			o.x = 400 - o.image.width
		}
	}
	o.collide = function(ball) {
		// if (ball.y + ball.image.height > o.y) {
		// 	if (ball.x > o.x && ball.x < o.x + o.image.width) {
		// 		return true;
		// 	}
		// }
		// return false;
		var a = o
		var b = ball
		if(aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
			if(aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
				return true
			}
		}
		return false;
	}
	return o
}