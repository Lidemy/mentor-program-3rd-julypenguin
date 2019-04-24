function stars(n) {
	let stars = ''
	let arr = []
	for (let i=1 ; i<=n ; i++){
		stars += '*'
		arr.push(stars)
	}
	return arr
}

module.exports = stars
