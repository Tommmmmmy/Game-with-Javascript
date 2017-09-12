class GuaScene {
	constructor(game) {
		this.game = game
		this.debugModeEnabled = true 
		this.elements = []
		this.enemy = []
	}
	static new(game) {
		var i = new this(game)
		return i
	}
	addElement(guaImage) {
		guaImage.scene = this
		this.elements.push(guaImage)
	}
	addEnemies(guaImage) {
		guaImage.scene = this
		this.enemy.push(guaImage)
	}
	draw() {
		for (var i = 0; i < this.elements.length; i++) {
			var e = this.elements[i]
			this.game.drawImage(e)
		}
		for (var i = 0; i < this.enemy.length; i++) {
			var e = this.enemy[i]
			this.game.drawImage(e)
		}
	}
	update() {
		if(this.debugModeEnabled) {
			for (var i = 0; i < this.elements.length; i++) {
			    var e = this.elements[i]
			    e.debug && e.debug()
	    	}
		}
		for (var i = 0; i < this.elements.length; i++) {
			var e = this.elements[i]
			e.update()
		}
		for (var i = 0; i < this.enemy.length; i++) {
			var e = this.enemy[i]
			e.update()
		}
	}
}

