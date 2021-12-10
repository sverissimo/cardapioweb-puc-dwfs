export class Api {

    baseUrl: string = 'http://localhost:3333/api'
    headers: HeadersInit = {
        'Content-Type': 'application/json',
    }

    async get(params) {
        const
            response = await fetch(`${this.baseUrl}/${params}`)
            , data = await response.json()
        return data
    }


    async post(params: string, body: object) {

        const response: Response = await fetch(`${this.baseUrl}/${params}`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(body)
        })
            .catch(err => {
                console.log("🚀 ~ file: api.ts ~ line 23 ~ Api ~ post ~ err", err)
                return response
            })

        //Envia a mensagem de erro customizada no servidor
        if (response.status <= 200 || response.status > 299)
            return response.text()

        const data = await response.json()
        return data
    }


    async put(params: string, body: object) {

        const response: Response = await fetch(`${this.baseUrl}/${params}`, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(body)
        })

        //Envia a mensagem de erro customizada no servidor
        if (response.status <= 200 || response.status > 299)
            return response.text()

        const data = await response.json()
        return data
    }


    async delete(params: string) {

        const response = await fetch(`${this.baseUrl}/${params}`, {
            method: 'DELETE',
            headers: this.headers,
        })

        return response.text()
    }
}
