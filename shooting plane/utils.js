// var e = (sel) => document.querySelector(sel) 
// //arrow function
// // var funcName = (params) => params + 2
// // funcName(2);
// // 4
// var log = function(s) {
// 	e('#id-text-log').value += '\n' + s
// }
var log = console.log.bind(console)

var imageFromPath = function(path) {
	var img = new Image()
	img.src = path
	return img
}

var rectIntersects = function(a, b) {
	if(b.y > a.y && b.y < a.y + a.image.height) {
		if(b.x > a.x && b.x < a.x + a.image.width) {
			return true
		}
	}
	return false
}

var aInb = function(x, x1, x2) {
		return x >= x1 && x <= x2
}

const randomBetween = function(start, end) {
	var n = Math.random() * (end - start + 1)
	return Math.floor(n + start)
}