import { IPV4_ENDPOINT, IPV6_ENDPOINT } from '../../src/core/constants'
import { describe, it, expect, vi, afterAll, beforeEach } from 'vitest'
import { setOutputs } from '../../src/index'
import * as https from '../../src/libs/https'
import * as core from '@actions/core'

const mockHttpsGet = vi.spyOn(https, 'httpsGet')
const mockCoreSetOutput = vi.spyOn(core, 'setOutput')
const mockCoreInfo = vi.spyOn(core, 'info')
const consoleSpy = vi.spyOn(console, 'error')

describe('getPublicIPAddresses unit test', () => {
    beforeEach(() => {
        mockHttpsGet.mockClear()
    })

    afterAll(() => {
        vi.clearAllMocks()
    })

    it('should set valid IPv4 and IPv6 addresses', async () => {
        mockHttpsGet.mockImplementation(async (url: string) => {
            if (url === IPV4_ENDPOINT) {
                return { ip: '127.0.0.1' }
            } else if (url === IPV6_ENDPOINT) {
                return { ip: '::1' }
            }
        })

        await setOutputs()

        expect(mockCoreSetOutput).toHaveBeenCalledWith('ipv4', '127.0.0.1')
        expect(mockCoreSetOutput).toHaveBeenCalledWith('ipv6', '::1')

        expect(mockCoreInfo).toHaveBeenCalledWith(`IPv4 address: 127.0.0.1`)
        expect(mockCoreInfo).toHaveBeenCalledWith(`IPv6 address: ::1`)
    })

    it('should return a valid IPv4 address and a empty string for IPv6', async () => {
        mockHttpsGet.mockImplementation(async (url: string) => {
            if (url === IPV4_ENDPOINT) {
                return { ip: '127.0.0.1' }
            } else if (url === IPV6_ENDPOINT) {
                return { ip: 'invalid' }
            }
        })

        await setOutputs()

        expect(mockCoreSetOutput).toHaveBeenCalledWith('ipv4', '127.0.0.1')
        expect(mockCoreSetOutput).toHaveBeenCalledWith('ipv6', '')

        expect(mockCoreInfo).toHaveBeenCalledWith(`IPv4 address: 127.0.0.1`)
        expect(mockCoreInfo).toHaveBeenCalledWith(`IPv6 address: `)
    })

    it('should set a empty string for IPv4 and a valid IPv6 address', async () => {
        mockHttpsGet.mockImplementation(async (url: string) => {
            if (url === IPV4_ENDPOINT) {
                return { ip: 'invalid' }
            } else if (url === IPV6_ENDPOINT) {
                return { ip: '::1' }
            }
        })

        await setOutputs()

        expect(mockCoreSetOutput).toHaveBeenCalledWith('ipv4', '')
        expect(mockCoreSetOutput).toHaveBeenCalledWith('ipv6', '::1')

        expect(mockCoreInfo).toHaveBeenCalledWith(`IPv4 address: `)
        expect(mockCoreInfo).toHaveBeenCalledWith(`IPv6 address: ::1`)
    })

    it('should set empty strings when responses are invalid', async () => {
        mockHttpsGet.mockImplementation(async (url: string) => {
            if (url === IPV4_ENDPOINT) {
                return { ip: 'invalid' }
            } else if (url === IPV6_ENDPOINT) {
                return { ip: 'invalid' }
            }
        })

        await setOutputs()

        expect(mockCoreSetOutput).toHaveBeenCalledWith('ipv4', '')
        expect(mockCoreSetOutput).toHaveBeenCalledWith('ipv6', '')

        expect(mockCoreInfo).toHaveBeenCalledWith(`IPv4 address: `)
        expect(mockCoreInfo).toHaveBeenCalledWith(`IPv6 address: `)
    })

    it('should set empty strings when responses are invalid', async () => {
        mockHttpsGet.mockImplementation(async (url: string) => {
            if (url === IPV4_ENDPOINT) {
                return { noip: 'noip' }
            } else if (url === IPV6_ENDPOINT) {
                return { noip: 'noip' }
            }
        })

        await setOutputs()

        expect(mockCoreSetOutput).toHaveBeenCalledWith('ipv4', '')
        expect(mockCoreSetOutput).toHaveBeenCalledWith('ipv6', '')

        expect(mockCoreInfo).toHaveBeenCalledWith(`IPv4 address: `)
        expect(mockCoreInfo).toHaveBeenCalledWith(`IPv6 address: `)
    })

    it('should set empty strings when responses are invalid', async () => {
        mockHttpsGet.mockImplementation(async (url: string) => {
            if (url === IPV4_ENDPOINT) {
                return 'hello'
            } else if (url === IPV6_ENDPOINT) {
                return 'hello'
            }
        })

        await setOutputs()

        expect(mockCoreSetOutput).toHaveBeenCalledWith('ipv4', '')
        expect(mockCoreSetOutput).toHaveBeenCalledWith('ipv6', '')

        expect(mockCoreInfo).toHaveBeenCalledWith(`IPv4 address: `)
        expect(mockCoreInfo).toHaveBeenCalledWith(`IPv6 address: `)
    })

    it('should set empty strings when requests fail', async () => {
        mockHttpsGet.mockImplementation(async () => {
            throw new Error('Request failed')
        })

        await setOutputs()

        expect(mockCoreSetOutput).toHaveBeenCalledWith('ipv4', '')
        expect(mockCoreSetOutput).toHaveBeenCalledWith('ipv6', '')

        expect(mockCoreInfo).toHaveBeenCalledWith(`IPv4 address: `)
        expect(mockCoreInfo).toHaveBeenCalledWith(`IPv6 address: `)
    })

    it('Should throw an error when getIPv4Address fails', async () => {
        mockCoreSetOutput.mockImplementation(() => {
            throw new Error('a')
        })

        try {
            await setOutputs()
        } catch (error) {
            expect(error.message).toBe('a')
        }
    })

    it('Should handle errors when setOutput fails', async () => {
        mockCoreSetOutput.mockImplementation(() => {
            throw new Error('error')
        })

        await setOutputs()

        expect(consoleSpy).toHaveBeenCalledWith('[ERROR] Error setting outputs')
    })
})
