import { Login } from '../models/login.model';
import {getLogin} from '../services/external-api.service'

export async function login(usuario: number, password: number, mantenerSesion: number) {
        try {
            const login = new Login(usuario, password, mantenerSesion );
            
            const token = getLogin(login);
            return token;
        } catch (error) {
            console.error('Login error:', error);
        }
}