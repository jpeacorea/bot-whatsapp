import { addKeyword } from '@builderbot/bot'
import { IDatabase } from '../database/json-database'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { registerFlow } from './register.flow'

export const facturarFlow = addKeyword<Provider, IDatabase>('facturar').addAnswer(
    [
        'Para más información puedes visitarnos al siguiente enlace:', 
        '📄 https://www.edi.co.cr \n', 
        '¿Quieres continuar? *si*'].join('\n'),
    { capture: true },
    async (ctx, { gotoFlow, flowDynamic }) => {
        if (ctx.body.toLocaleLowerCase().includes('si')) {
            return gotoFlow(registerFlow)
        }
        await flowDynamic('Gracias, que tengas un buen día!, si necesitas ayuda puedes escribir *facturar*')
        return
    }
)