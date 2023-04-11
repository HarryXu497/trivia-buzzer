export function * randomId() {
	while (true) {
		const numbers = new Array<number>(4)
			.fill(0)
			.map(_ => Math.floor(Math.random() * 26) + 65);

		yield String.fromCharCode(...numbers);
	}
}