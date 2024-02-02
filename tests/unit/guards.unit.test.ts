import { describe, it, expect } from 'vitest'
import { isIPResponse } from '../../src/core/guards'

describe('isIPResponse', () => {
    it('should return true for valid IPResponse', () => {
        const validIPResponse = { ip: '127.0.0.1' }
        expect(isIPResponse(validIPResponse)).toBe(true)
    })

    it('should return false for invalid IPResponse', () => {
        const invalidIPResponse = { id: 1234 }
        expect(isIPResponse(invalidIPResponse)).toBe(false)

        const invalidIPResponse2 = { notIp: '127.0.0.1' }
        expect(isIPResponse(invalidIPResponse2)).toBe(false)
    })

    it('should return false for undefined and null', () => {
        expect(isIPResponse(null)).toBe(false)
        expect(isIPResponse(undefined)).toBe(false)
    })
})
