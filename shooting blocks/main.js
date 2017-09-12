var loadLevel = function(game, n) {
	n -= 1
	var level = levels[n]
	var blocks = []
	for(var i = 0; i < level.length; i++) {
		var p = level[i]
		var b = Block(game, p)
		blocks.push(b)
	}
	return blocks
}
var enableDebugMode = function(game, enable) {
	if(!enable) {
		return
	}
	//change the speed
	document.querySelector('#id-input-speed').addEventListener('input', function(event){
		var input = event.target
		window.fps = Number(input.value)
	})
}
var _main = function() {
	var images = {
		ball: 'ball.png',
		block: 'block.png',
		paddle: 'bilibili.png',
	}
	var game = GuaGame.instance(30, images, function(game) {
		var scene = SceneTitle.new(game)
		game.runWithScene(scene)
	})
	enableDebugMode(game, true)
}
_main()