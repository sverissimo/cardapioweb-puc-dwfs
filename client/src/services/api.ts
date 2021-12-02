export class Api {

    baseUrl: string = 'http://localhost:3333/api'

    async get(params) {
        console.log("🚀 ~ file: api.ts ~ line 6 ~ Api ~ get ~ params", params)
        const
            response = await fetch(`${this.baseUrl}/${params}`)
            , data = await response.json()
        return data
    }

    async post(params: string, body: object) {

        const response = await fetch(`${this.baseUrl}/${params}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })

        const data = await response.json()
        return data
    }
}
