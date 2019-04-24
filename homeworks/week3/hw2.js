function alphaSwap(str) {
	let alphaSwap = ''
	for (let i=0 ; i<str.length ; i++) {
		if (str[i] < 'Z') {
			alphaSwap += str[i].toLowerCase()
		}else {
			alphaSwap += str[i].toUpperCase()
		}
	}
	return alphaSwap
}

module.exports = alphaSwap
