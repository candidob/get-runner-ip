import * as core from '@actions/core'
import { getIPv4Address, getIPv6Address } from './libs/ip'

export async function setOutputs(): Promise<void> {
    try {
        const ipv4Address = await getIPv4Address()
        const ipv6Address = await getIPv6Address()

        core.setOutput('ipv4', ipv4Address)
        core.setOutput('ipv6', ipv6Address)

        core.info(`IPv4 address: ${ipv4Address}`)
        core.info(`IPv6 address: ${ipv6Address}`)

        console.log('[NOTICE] IPv4 address: ', ipv4Address)
        console.log('[NOTICE] IPv6 address: ', ipv6Address)
    } catch (error) {
        console.error('[ERROR] Error setting outputs')
    }
}
