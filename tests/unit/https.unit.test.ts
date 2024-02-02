import { describe, it, expect } from 'vitest'
import { httpsGet } from '../../src/libs/https'
import nock from 'nock'

describe('httpsGet unit test', () => {
    it('returns data when request is successful', async () => {
        const mockData = { key: 'value' }
        nock('https://httpsgetunittest.com').get('/').reply(200, mockData)

        const data = await httpsGet('https://httpsgetunittest.com/')
        expect(data).toEqual(mockData)
    })

    it('throws an error when request fails', async () => {
        nock('https://httpsgetunittest.com').get('/').reply(500)

        await expect(
            httpsGet('https://httpsgetunittest.com/')
        ).rejects.toThrow()
    })
})
