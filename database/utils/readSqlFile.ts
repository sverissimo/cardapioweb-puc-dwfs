import fs from 'fs'
import path from 'path'

export const readSqlFile = (filepath: string): string[] => {
    return fs
        .readFileSync(path.join(__dirname, filepath))
        .toString()
        .replace(/\r?\n|\r/g, '')
        .split(';')
        .filter((query) => query?.length);
};
