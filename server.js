const WebSocket = require('ws');
const PORT = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port: PORT });

console.log(`GPS Bulut Relay Sunucusu ${PORT} portunda çalışıyor...`);

wss.on('connection', (ws) => {
    console.log('Yeni bir cihaz/admin panel bağlandı.');

    ws.on('message', (message) => {
        console.log('Konum verisi alındı, admin panellere dağıtılıyor...');
        // Mobilden gelen veriyi bağlı olan tüm Admin Panellere (Web) yayınla (Broadcast)
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });

    ws.on('close', () => {
        console.log('Bir bağlantı ayrıldı.');
    });
});