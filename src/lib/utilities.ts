// 半角英数字判定
export function isAlphaNumeric(str: string): boolean {
	return /^[0-9a-zA-Z]+$/.test(str);
}

export function markdownParser(doc: string) {}
