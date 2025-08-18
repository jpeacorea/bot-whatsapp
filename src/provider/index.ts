import { BaileysProvider } from '@builderbot/provider-baileys'  
import { createReadStream, existsSync, readFileSync } from 'fs'  
import { join } from 'path'  
  
export class CustomQRProviderWithStatus extends BaileysProvider {  
    private connectionStatus = 'disconnected'  
    private connectedUser = null  
      
    constructor(args) {  
        super(args)  
          
        // Escuchar eventos de conexión  
        this.on('ready', () => {  
            this.connectionStatus = 'connected'  
        })  
          
        this.on('host', (host) => {  
            this.connectedUser = host  
            this.connectionStatus = 'connected'  
        })  
          
        this.on('auth_failure', () => {  
            this.connectionStatus = 'disconnected'  
            this.connectedUser = null  
        })  
    }  
  
    indexHome = (req, res) => {  
        try {  
            const botName = req[this.idBotName]  
            const qrPath = join(process.cwd(), `${botName}.qr.png`)  
              
            res.writeHead(200, { 'Content-Type': 'text/html' })  
            res.end(`  
                <!DOCTYPE html>  
                <html lang="es">  
                <head>  
                    <meta charset="UTF-8">  
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">  
                    <title>🤖 Bot WhatsApp - Estado de Conexión</title>  
                    <style>  
                        body {  
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;  
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);  
                            margin: 0;  
                            padding: 20px;  
                            min-height: 100vh;  
                            display: flex;  
                            justify-content: center;  
                            align-items: center;  
                        }  
                        .container {  
                            background: white;  
                            border-radius: 20px;  
                            padding: 40px;  
                            box-shadow: 0 20px 40px rgba(0,0,0,0.1);  
                            text-align: center;  
                            max-width: 500px;  
                            width: 100%;  
                        }  
                        .status-indicator {  
                            display: inline-block;  
                            width: 12px;  
                            height: 12px;  
                            border-radius: 50%;  
                            margin-right: 8px;  
                        }  
                        .status-connected {  
                            background: #4caf50;  
                            box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);  
                        }  
                        .status-disconnected {  
                            background: #f44336;  
                            box-shadow: 0 0 10px rgba(244, 67, 54, 0.5);  
                        }  
                        .status-waiting {  
                            background: #ff9800;  
                            box-shadow: 0 0 10px rgba(255, 152, 0, 0.5);  
                        }  
                        .connection-status {  
                            background: #f5f5f5;  
                            border-radius: 15px;  
                            padding: 20px;  
                            margin: 20px 0;  
                            border-left: 4px solid ${this.getStatusColor()};  
                        }  
                        .user-info {  
                            background: #e8f5e8;  
                            border-radius: 10px;  
                            padding: 15px;  
                            margin: 15px 0;  
                        }  
                        .qr-container {  
                            background: #f8f9fa;  
                            border-radius: 15px;  
                            padding: 20px;  
                            margin: 20px 0;  
                            ${this.connectionStatus === 'connected' ? 'display: none;' : ''}  
                        }  
                        .qr-image {  
                            max-width: 300px;  
                            width: 100%;  
                            height: auto;  
                            border-radius: 10px;  
                        }  
                        .instructions {  
                            color: #666;  
                            margin: 20px 0;  
                            line-height: 1.6;  
                        }  
                        .refresh-btn {  
                            background: #2196f3;  
                            color: white;  
                            border: none;  
                            padding: 10px 20px;  
                            border-radius: 25px;  
                            cursor: pointer;  
                            margin: 10px;  
                        }  
                        .refresh-btn:hover {  
                            background: #1976d2;  
                        }  
                    </style>  
                    <script>  
                        // Auto-refresh cada 5 segundos para actualizar estado  
                        setTimeout(() => location.reload(), 5000);  
                          
                        function manualRefresh() {  
                            location.reload();  
                        }  
                    </script>  
                </head>  
                <body>  
                    <div class="container">  
                        <h1>🤖 Bot WhatsApp</h1>  
                          
                        <div class="connection-status">  
                            <h3>  
                                <span class="status-indicator ${this.getStatusClass()}"></span>  
                                Estado de Conexión: ${this.getStatusText()}  
                            </h3>  
                              
                            ${this.renderConnectionDetails()}  
                        </div>  
                          
                        ${this.renderQRSection(qrPath)}  
                          
                        <button class="refresh-btn" onclick="manualRefresh()">  
                            🔄 Actualizar Estado  
                        </button>  
                          
                        <p style="color: #999; font-size: 12px;">  
                            La página se actualiza automáticamente cada 5 segundos  
                        </p>  
                    </div>  
                </body>  
                </html>  
            `)  
        } catch (e) {  
            this.showErrorPage(res, e)  
        }  
    }  
  
    private getStatusClass(): string {  
        switch (this.connectionStatus) {  
            case 'connected': return 'status-connected'  
            case 'disconnected': return 'status-disconnected'  
            default: return 'status-waiting'  
        }  
    }  
  
    private getStatusColor(): string {  
        switch (this.connectionStatus) {  
            case 'connected': return '#4caf50'  
            case 'disconnected': return '#f44336'  
            default: return '#ff9800'  
        }  
    }  
  
    private getStatusText(): string {  
        switch (this.connectionStatus) {  
            case 'connected': return 'CONECTADO ✅'  
            case 'disconnected': return 'DESCONECTADO ❌'  
            default: return 'ESPERANDO CONEXIÓN ⏳'  
        }  
    }  
  
    private renderConnectionDetails(): string {  
        if (this.connectionStatus === 'connected' && this.connectedUser) {  
            return `  
                <div class="user-info">  
                    <h4>👤 Usuario Conectado:</h4>  
                    <p><strong>Nombre:</strong> ${this.connectedUser.name || 'Sin nombre'}</p>  
                    <p><strong>Teléfono:</strong> +${this.connectedUser.phone || 'No disponible'}</p>  
                    <p><strong>Conectado desde:</strong> ${new Date().toLocaleString()}</p>  
                </div>  
            `  
        } else if (this.connectionStatus === 'disconnected') {  
            return `  
                <div style="color: #f44336;">  
                    <p>❌ No hay ningún dispositivo conectado</p>  
                    <p>Escanea el código QR para conectar</p>  
                </div>  
            `  
        } else {  
            return `  
                <div style="color: #ff9800;">  
                    <p>⏳ Esperando conexión...</p>  
                    <p>Escanea el código QR cuando aparezca</p>  
                </div>  
            `  
        }  
    }  
  
    private renderQRSection(qrPath: string): string {  
        if (this.connectionStatus === 'connected') {  
            return `  
                <div style="background: #e8f5e8; padding: 20px; border-radius: 15px; margin: 20px 0;">  
                    <h3>✅ ¡Bot Conectado y Funcionando!</h3>  
                    <p>El bot está listo para recibir mensajes</p>  
                </div>  
            `  
        }  
  
        if (existsSync(qrPath)) {  
            return `  
                <div class="qr-container">  
                    <h3>📱 Escanea el Código QR</h3>  
                    <img src="data:image/png;base64,${this.getQRBase64(qrPath)}"   
                         alt="QR Code" class="qr-image" />  
                      
                    <div class="instructions">  
                        <p>1. Abre WhatsApp en tu teléfono</p>  
                        <p>2. Ve a <strong>Configuración > Dispositivos vinculados</strong></p>  
                        <p>3. Toca <strong>"Vincular un dispositivo"</strong></p>  
                        <p>4. Escanea este código QR</p>  
                    </div>  
                </div>  
            `  
        } else {  
            return `  
                <div class="qr-container">  
                    <div style="text-align: center; padding: 40px;">  
                        <div style="border: 4px solid #f3f3f3; border-top: 4px solid #ff9800; border-radius: 50%; width: 50px; height: 50px; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>  
                        <h3>⏳ Generando Código QR...</h3>  
                        <p>Por favor espera un momento</p>  
                    </div>  
                </div>  
                <style>  
                    @keyframes spin {  
                        0% { transform: rotate(0deg); }  
                        100% { transform: rotate(360deg); }  
                    }  
                </style>  
            `  
        }  
    }  
  
    private getQRBase64(qrPath: string): string {  
        try {  
            const imageBuffer = readFileSync(qrPath)  
            return imageBuffer.toString('base64')  
        } catch {  
            return ''  
        }  
    }  
  
    private showErrorPage(res: any, error: any) {  
        res.writeHead(500, { 'Content-Type': 'text/html' })  
        res.end(`  
            <html>  
            <head>  
                <title>Error - Bot WhatsApp</title>  
                <meta http-equiv="refresh" content="3">  
            </head>  
            <body style="text-align: center; font-family: Arial; padding: 50px;">  
                <h2>❌ Error en el Bot</h2>  
                <p>Ocurrió un error al cargar la página</p>  
                <p style="color: #666;">La página se recargará automáticamente</p>  
            </body>  
            </html>  
        `)  
    }  
}