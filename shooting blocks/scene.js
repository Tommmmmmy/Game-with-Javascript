var Scene = function(game) {
	var s = {
		game: game,
	}
	//Initialization
	var paddle = Paddle(game)
	var ball = Ball(game)
	var score = 0
	var blocks = loadLevel(game, 1)
	game.registerAction('a', function(){
		paddle.moveLeft()
	})
	game.registerAction('d', function(){
		paddle.moveRight()
	})
	game.registerAction('f', function(){
		ball.fire()
	})
	var leftDown = false;
	var rightDown = false;
	window.addEventListener('keydown', function(event){
		var k = event.key
		if(k == 'a'){
			leftDown = true
		} else if (k == 'd') {
			rightDown = true
		}
	})
	window.addEventListener('keyup', function(event){
		var k = event.key
		if(k == 'a'){
			leftDown = false
		} else if (k == 'd') {
			rightDown = false
		}
	})
	window.paused = false
	window.addEventListener('keydown', function(event){
		var k = event.key
		if(k == 'p'){
			paused = !paused;
		} else if ('1234567'.includes(k)) {
			blocks = loadLevel(game, Number(k))
		}
	})
	s.draw = function() {

		game.drawImage(paddle)
		game.drawImage(ball)
		for (var i = 0; i < blocks.length; i++) {
			var block = blocks[i]
			if (block.alive) {
				game.drawImage(block)
			}
		}
		//draw labels
		game.context.fillText('分数: ' + score, 10, 290)
	}
	s.update = function() {
		if(window.paused) {
			return
		}
		ball.move()
		//判断死亡
		if(ball.y > paddle.y) {
			//跳转到游戏结束的场景
			var end = SceneEnd.new(game)
			game.replaceScene(end)
			return
		}
		//判断相撞
		if(paddle.collide(ball)){
			ball.reverse()
		}
		//ball与block相撞
		for (var i = 0; i < blocks.length; i++) {
			var block = blocks[i]
			if(block.collide(ball)) {
				block.kill()
				ball.reverse()
				//update scores
				score += 100
			} 
		}
	}
	var enableDrag = false
	//mouse event
	game.canvas.addEventListener('mousedown', function(event) {
		var x = event.offsetX
		var y = event.offsetY
		//检查是否点中了ball
		if(ball.hasPoint(x, y)) {
			//设置拖拽状态
			enableDrag = true
		}
	})
	game.canvas.addEventListener('mousemove', function(event) {
		var x = event.offsetX
		var y = event.offsetY
		if(enableDrag) {
			ball.x = x
			ball.y = y
		}
	})
	game.canvas.addEventListener('mouseup', function(event) {
		enableDrag = false
	})
	return s
}