import { Cliente } from '../models/cliente.model';
import { getCliente } from '../services/external-api.service';

export async function fetchCliente(cliente: Cliente) {
    try {
        const response = await getCliente(cliente);
        return response;
    } catch (error) {
        console.error('Error fetching cliente:', error);
        throw error;
    }
}