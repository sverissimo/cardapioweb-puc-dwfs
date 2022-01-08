import fs from 'fs'
import path from 'path'
import { QueryRunner } from 'typeorm'

export class PopulateDB {

    table: string;

    readSqlFile(filepath: string): string[] {
        return fs
            .readFileSync(path.join(__dirname, filepath))
            .toString()
            .replace(/\r?\n|\r/g, '')
            .split(';')
            .filter((query) => query?.length)
    }

    async insertJSON(queryRunner: QueryRunner, pathToFile: string) {
        const
            jsonData = this.readSqlFile(pathToFile)
            , data = JSON.parse(jsonData.toString())
            , columns = Object.keys(data[0])
            , valuePlaceHolders = columns
                .map((el, i) => `$${i + 1}`)
                .join()

        for (let row of data) {
            const values = Object.values(row)
            await queryRunner.query(
                `INSERT INTO ${this.table} (${columns}) 
                values (${valuePlaceHolders}) ON CONFLICT DO NOTHING;`, values
            )
        }

    }
}