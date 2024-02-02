import { isIPv4, isIPv6 } from 'net'
import { httpsGet } from '../libs/https'
import { IPV4_ENDPOINT, IPV6_ENDPOINT } from '../core/constants'
import { isIPResponse } from '../core/guards'

export async function getIPv4Address(): Promise<string> {
    try {
        const responseIPv4 = await httpsGet(IPV4_ENDPOINT)
        if (isIPResponse(responseIPv4) && isIPv4(responseIPv4.ip)) {
            console.log('[NOTICE] Successfully obtained IPv4 address.')
            return responseIPv4.ip
        }
    } catch (error) {
        console.warn('[WARNING] IPv4 address could not be obtained.', error)
    }
    return ''
}

export async function getIPv6Address(): Promise<string> {
    try {
        const responseIPv6 = await httpsGet(IPV6_ENDPOINT)
        if (isIPResponse(responseIPv6) && isIPv6(responseIPv6.ip)) {
            console.log('[NOTICE] Successfully obtained IPv6 address.')
            return responseIPv6.ip
        }
    } catch (error) {
        if (error instanceof Error) {
            const systemError = error as NodeJS.ErrnoException
            if (systemError.code === 'ENETUNREACH') {
                console.warn('[WARNING] IPv6 connectivity may be unavailable.')
                console.warn('[WARNING] IPv6 Error code:', systemError.code)
            }

            console.warn('[WARNING] IPv6 address could not be obtained.', error)
        }
    }
    return ''
}
