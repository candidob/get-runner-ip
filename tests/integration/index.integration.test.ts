import { describe, it, vi, beforeEach, expect } from 'vitest'
import { setOutputs } from '../../src/index'
import * as core from '@actions/core'

const mockCoreSetOutput = vi.spyOn(core, 'setOutput')
const mockCoreInfo = vi.spyOn(core, 'info')

describe('setOutputs integration test', () => {
    beforeEach(() => {
        mockCoreSetOutput.mockClear()
        mockCoreInfo.mockClear()
    })

    it('should return valid IPv4 and IPv6 addresses', async () => {
        await setOutputs()

        expect(mockCoreSetOutput).toHaveBeenCalledTimes(2)
        expect(mockCoreInfo).toHaveBeenCalledTimes(2)
    })
})
