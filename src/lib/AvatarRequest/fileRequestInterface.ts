export interface result {
	error: string | null; // エラー
}

export interface fileuploadInput {
	file: File; // ファイル
	filename: string; // ファイル名
}

export interface downloadFileOutput {
	fileUrl: string | null;
	error: string | null;
}

export abstract class fileRequestInterface {
	abstract uploadFile(fileuploadData: fileuploadInput): Promise<result>;
	abstract donwlodFile(filepath: string): Promise<downloadFileOutput>;
	abstract deleteFile(filename: string): Promise<result>;
}
