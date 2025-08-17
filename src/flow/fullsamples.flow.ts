import { addKeyword, utils } from "@builderbot/bot";
import { IDatabase } from "~/database/json-database";
import { BaileysProvider as Provider } from "@builderbot/provider-baileys";
import { join } from "path";


export const fullSamplesFlow = addKeyword<Provider, IDatabase>(['samples', utils.setEvent('SAMPLES')])
    .addAnswer(`💪 Te enviaré muchos archivos...`)
    .addAnswer(`Enviar imagen desde Local`, { media: join(process.cwd(), 'assets', 'sample.png') })
    .addAnswer(`Enviar video desde URL`, {
        media: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTJ0ZGdjd2syeXAwMjQ4aWdkcW04OWlqcXI3Ynh1ODkwZ25zZWZ1dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LCohAb657pSdHv0Q5h/giphy.mp4',
    })
    .addAnswer(`Enviar audio desde URL`, { media: 'https://cdn.freesound.org/previews/728/728142_11861866-lq.mp3' })
    .addAnswer(`Enviar archivo desde URL`, {
        media: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    })