import { addKeyword } from "@builderbot/bot"
import { IDatabase } from "~/database/json-database"
import { BaileysProvider as Provider } from "@builderbot/provider-baileys"
import { facturarFlow } from "./factura.flow"


export const welcomeFlow = addKeyword<Provider, IDatabase>(['hi', 'hello', 'hola', 'facturar', 'quiero crear una factura'])
    .addAnswer(`🙌 Hola, bienvenido a este *Chatbot*`)
    .addAnswer(
        [
            'Te comparto los siguientes enlaces de interés:',
            '👉 *facturar* para facturación electronica',
        ].join('\n'),
        { delay: 800, capture: true },
        async (ctx, { fallBack }) => {
            if (!ctx.body.toLocaleLowerCase().includes('facturar')) {
                return fallBack('Debes escribir *facturar*')
            }
            return
        },
        [facturarFlow] // subflow
    )