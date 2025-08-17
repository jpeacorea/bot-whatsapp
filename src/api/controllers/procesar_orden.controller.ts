import { PDF } from "../models/descargar_pdf.model";
import { Procesar } from "../models/procesar.model";
import { getPDF, ProcesarOrden } from "../services/external-api.service";

export async function generarFactura(procesar: Procesar) {
    try {
        const response = await ProcesarOrden(procesar);
        return response;
    } catch (error) {
        console.error('Error during procesar request:', error);
        throw error;
    }
}

 export async function fetchPDF(pdf: PDF) {
     try {
         const response = await getPDF(pdf);
         return response;
     } catch (error) {
         console.error('Error during pdf request:', error);
         throw error;
     }
 }
