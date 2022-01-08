import fs from 'fs'
import path from 'path'

export const readSqlFile = (filepath: string): string[] => {
    console.log("🚀 ~ file: readSqlFile.ts ~ line 5 ~ filepath", filepath)

    return fs
        .readFileSync(path.join(__dirname, filepath))
        .toString()
        .replace(/\r?\n|\r/g, '')
        .split(';')
        .filter((query) => query?.length);
};
