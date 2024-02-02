import https from 'https'

export async function httpsGet(url: string, timeout = 5000): Promise<unknown> {
    return await new Promise((resolve, reject) => {
        const req = https.get(url, (res) => {
            let data = ''

            res.on('data', (chunk) => {
                data += chunk
            })

            res.on('end', () => {
                try {
                    resolve(JSON.parse(data))
                } catch (error) {
                    reject(error)
                }
            })

            res.on('error', (err) => {
                reject(err)
            })
        })

        req.setTimeout(timeout, () => {
            req.destroy()
            reject(new Error('Request timed out'))
        })

        req.on('error', (err) => {
            reject(err)
        })
    })
}
