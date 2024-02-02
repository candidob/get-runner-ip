import { describe, it, expect } from 'vitest'
import { httpsGet } from '../../src/libs/https'

describe('httpsGet integration test', () => {
    it('should return data from a real URL', async () => {
        const data = await httpsGet(
            'https://jsonplaceholder.typicode.com/posts/1'
        )

        // Check that the returned data has the expected structure
        expect(data).toHaveProperty('id')
        expect(data).toHaveProperty('title')
        expect(data).toHaveProperty('body')
    })

    it('should throw an error for an invalid URL', async () => {
        await expect(httpsGet('qwerty')).rejects.toThrow()
    })
})
