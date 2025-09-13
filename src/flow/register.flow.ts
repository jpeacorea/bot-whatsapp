import { addKeyword, utils } from '@builderbot/bot'
import { IDatabase } from '../database/json-database'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { format } from 'date-fns'
import {es} from 'date-fns/locale'
import { Cliente, Filter } from '../api/models/cliente.model'

import dotenv from 'dotenv';
import { fetchCliente } from '~/api/controllers/cliente.controller';
import { fetchProductos } from '~/api/controllers/producto.controller';
import { Producto } from '~/api/models/producto.model';
import { Procesar } from '~/api/models/procesar.model';
import { fetchPDF, generarFactura } from '~/api/controllers/procesar_orden.controller';
import { PDF } from '~/api/models/descargar_pdf.model'
dotenv.config();

const nombreCliente = "";
let urlDoc = "";

export const registerFlow = addKeyword<Provider, IDatabase>(utils.setEvent('REGISTER_FLOW'))
    .addAnswer(`¿Nombre del Cliente?`, { capture: true }, async (ctx, { state }) => {
        await state.update({ name: ctx.body })
    })
    .addAnswer('¿Cedula del Cliente?', { capture: true }, async (ctx, { state }) => {
        await state.update({ cedula: ctx.body })
    })
    .addAnswer('¿Ingrese el numero de teléfono?', { capture: true }, async (ctx, { state }) => {
        await state.update({ phone: ctx.body })
    })
    .addAnswer('¿Qué producto o servicio deseas incluir? (Ingresa el codigo del producto o servicio)', { capture: true }, async (ctx, { state }) => {
        await state.update({ products: ctx.body })
    })
    .addAnswer(`¿Cuál es el monto?`, { capture: true }, async (ctx, { state }) => {
        await state.update({ mount: ctx.body })
    })
    .addAction(async (_, { flowDynamic, state }) => {
        const cliente = new Cliente(
            1,
            0,
            0,
            'CodigoCliente',
            'Desc',
            [
                new Filter('NombreCliente', 'contains', state.get('name'), '', ''),
                new Filter('Cedula', 'contains', state.get('cedula'), '', ''),
                new Filter('Telefono', 'contains', state.get('phone'), '', '')
            ],
            process.env.TOKEN || '',
            process.env.ENTIDAD || ''
        )

        const getCliente = await fetchCliente(cliente)
        const client = getCliente;
        const dataClient = client.data.data || [];

        const producto = new Producto(
            1,
            0,
            0,
            'CodigoProducto',
            'DESC',
            [
                new Filter('CodigoProducto', 'equals', state.get('products'), '', '')
            ],
            process.env.TOKEN || '',
            process.env.ENTIDAD || ''
        )

        const getProductos = await fetchProductos(producto)
        const product = getProductos;
        const dataProduct = product.data.data;

        if (dataClient.length > 0 || dataProduct.length > 0) {
            const clienteData = dataClient[0];
            const productoData = dataProduct[0];

            const date = new Date();

            const procesar = new Procesar(
                process.env.ENTIDAD || '', // UsuarioCreado
                format(date, "yyyy-MM-dd hh:mm:ss", { locale: es }), // FechaDocumento
                '', // CodigoUnico
                '0', // DescuentoGeneral
                'Pendiente', // Estatus
                clienteData.CodigoCliente, // CodigoCliente
                '', // Latitud
                '', // Longitud
                clienteData.Condicion, // CondicionPago
                clienteData.Plazo, // Plazo
                format(new Date(), "yyyy-MM-dd"), // FechaVencimiento
                'Generado desde chatbot', // Comentarios
                clienteData.Moneda, // Moneda
                '1', // TipoCambio
                '', // FechaEmisionExonera
                '', // TipoDocExonera
                '', // NumDocExonera
                '', // NombreInstituExonera
                '', // PorcCompraExonera
                '', // CodigoInstitucion
                '', // ArtículoExoneracion
                '', // IncisoExoneracion
                clienteData.OrdenCompra, // NumOrdenCompra
                '01', // TipoDoc
                '523901', // CodigoActividadEconomica -> Preguntar sobre su llenado
                '', // CodigoActividadEconomicaReceptor
                '', // TipoOtroDoc
                '0', // TipoReferencia
                '', // FacturaReferenciada
                '0', // CodigoReferencia
                '', // Razon
                '', // ReferenciaManual
                '01', // TipoPago
                '', // BancoPago
                state.get('mount'), // MontoPago
                '', // DocumentoPago
                JSON.stringify({
                    "carrito": [{
                        "codigo": productoData.CodigoProducto,
                        "linea": "",
                        "descripcion": productoData.Descripcion,
                        "cantidadProducto": productoData.cantidadProducto || 1,
                        "precio": state.get('mount'),
                        "descuento": 0,
                        "descuento01": 0,
                        "descuento02": 0,
                        "descuento03": 0,
                        "descuento04": 0,
                        "descuento05": 0,
                        "descuento06": 0,
                        "descuento07": 0,
                        "descuento08": 0,
                        "descuento09": 0,
                        "descuento99": 0,
                        "impuesto": productoData.Impuesto || 13,
                        "impuesto01": productoData.Impuesto01 || 13,
                        "impuesto02": 0,
                        "impuesto03": 0,
                        "impuesto04": 0,
                        "impuesto05": 0,
                        "impuesto06": 0,
                        "impuesto99": 0,
                        "impOrig": productoData.ImpOrig || 13,
                        "exoneraLinea": 0,
                        "tipoExoneracionLinea": "",
                        "codigoInstitucionLinea": "",
                        "nombreInstitucionLinea": "",
                        "fechaEmisionLinea": "",
                        "numeroDocumentoLinea": "",
                        "artículoExoneracionLinea": "",
                        "incisoExoneracionLinea": "",
                        "porcentajeExoneracionLinea": 0,
                        "tipoPagoLinea": "",
                        "VINoSerie": "",
                        "totalLinea": state.get('mount'),
                        "cantidadBonificada": "",
                        "observacion": "",
                        "cabys": productoData.CodigoCabys
                    }]
                }), // Linea
                "{\"lineas\":[]}",
                "{\"facturas\":[]}",
                clienteData.Direccion, // EntregarEn
                '', '', '', '', '', '', // Adicional1-5, Adicional7
                process.env.TOKEN || '', // token
                process.env.ENTIDAD || '', // entidad
                '' // NumConsecutivo
            )

            const procesarResponse = await generarFactura(procesar);

            const pdf = new PDF(
                '01',
                procesarResponse.data.Consecutivo,
                procesarResponse.data.ClaveNumerica,
                process.env.TOKEN || '',
                process.env.ENTIDAD || '',
                'Carta'
            )

            const pdfResponse = await fetchPDF(pdf);
            urlDoc = `${process.env.EXTERNAL_API_URL}/Ordenes/DescargarArchivoPdf?archivo=${pdfResponse.data}&nombre=${procesarResponse.data.ClaveNumerica}`

            await flowDynamic([{
                body: `Factura generada exitosamente a nombre de ${clienteData.NombreCliente}`,
                media: urlDoc,
                delay: 2000,
            }]);
        } else {
            await flowDynamic('No se encontró el cliente o el producto.');
        }
    })
    .addAnswer('Gracias por registrar tu solicitud, cualquier duda de referente a la factura no dude en contactarnos.')