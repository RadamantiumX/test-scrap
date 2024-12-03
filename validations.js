import zod from 'zod'
import { ATTRIBUTES } from './constant.js'

const notValidCharacters = '/.,;:{}"" '

const attrSchema = zod.object({
    attr: zod.string().refine((s)=> !s.includes('/.,;:{}"" '), 'Incorrect attribute')
})

export function validateAttribute(input) {
    return attrSchema.safeParse(input)
}

export async function genericValidation(param) {
    const exist = await ATTRIBUTES.includes(param.toString())
    return exist
}

