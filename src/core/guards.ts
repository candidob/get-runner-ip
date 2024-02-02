import { type IPResponse } from './types'

export function isIPResponse(obj: any): obj is IPResponse {
    return Boolean(obj) && typeof obj.ip === 'string'
}
