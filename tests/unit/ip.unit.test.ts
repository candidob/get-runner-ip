import { describe, it, expect, vi, afterAll } from 'vitest'
import { IPV4_ENDPOINT, IPV6_ENDPOINT } from '../../src/core/constants'
import { getIPv4Address, getIPv6Address } from '../../src/libs/ip'
import * as https from '../../src/libs/https'
import * as ip from '../../src/libs/ip'

const mockHttpsGet = vi.spyOn(https, 'httpsGet')
const mockConsoleWarn = vi.spyOn(console, 'warn')

describe('getIPv4Address unit test', () => {
    it('should return a valid IPv4 address', async () => {
        mockHttpsGet.mockImplementation(async (url: string) => {
            if (url === IPV4_ENDPOINT) {
                return { ip: '127.0.0.1' }
            }
        })

        const address = await getIPv4Address()

        expect(address).toBe('127.0.0.1')
    })

    it('should return an empty string', async () => {
        mockHttpsGet.mockImplementation(async (url: string) => {
            if (url === IPV4_ENDPOINT) {
                return { ip: 'invalid' }
            }
        })

        const address = await getIPv4Address()

        expect(address).toBe('')
    })

    it('should return a valid ipv6 address', async () => {
        mockHttpsGet.mockImplementation(async (url: string) => {
            if (url === IPV6_ENDPOINT) {
                return { ip: '::1' }
            }
        })

        const address = await getIPv6Address()

        expect(address).toBe('::1')
    })

    it('should return an empty string', async () => {
        mockHttpsGet.mockImplementation(async (url: string) => {
            if (url === IPV6_ENDPOINT) {
                return { ip: 'invalid' }
            }
        })

        const address = await getIPv6Address()

        expect(address).toBe('')
    })

    it('should handle ipv6 connectivity error', async () => {
        mockHttpsGet.mockImplementation(async (url: string) => {
            if (url === IPV6_ENDPOINT) {
                const error = new Error(
                    'Network is unreachable'
                ) as NodeJS.ErrnoException
                error.code = 'ENETUNREACH'
                throw error
            }
        })

        await getIPv6Address()

        expect(mockConsoleWarn).toHaveBeenCalledWith(
            '[WARNING] IPv6 connectivity may be unavailable.'
        )

        expect(mockConsoleWarn).toHaveBeenCalledWith(
            '[WARNING] IPv6 Error code:',
            'ENETUNREACH'
        )
    })
})
