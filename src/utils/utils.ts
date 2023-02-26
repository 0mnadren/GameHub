export function randomColorHandler(COLORS: string[]): string {
	let randomIndex = Math.floor(Math.random() * COLORS.length);
	return COLORS[randomIndex];
}
