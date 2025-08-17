import { login } from './api/controllers/login.controller';
import dotenv from 'dotenv';
dotenv.config();

import { main } from './flow'
import fs from 'fs';

main()

const response = await login(116880458, 234, 0);
if (response.data.usuario.Token) {
    console.log('Login successful:', response.data.usuario.Token);
    if (!process.env.TOKEN) {
        fs.appendFileSync('.env', `\nTOKEN=${response.data.usuario.Token}`);
    }
}