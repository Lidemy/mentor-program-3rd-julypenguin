function isPalindromes(str) {
	let arr = []
	for (let i=0 ; i<str.length ; i++) {
		arr.unshift(str[i]) 
	}

	let palindromes = arr.reduce((accu, value) => accu + value)
	return palindromes === str
}

module.exports = isPalindromes
