const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const data = require('./data.json');


const client = new Client();

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('qr', qr);
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});



client.on('message', async (msg) => {
    console.log('msg', msg.body);
    if (msg.body == '!ping') {
        msg.reply('pong');
    }

    if(msg.body.includes('Paspor ')) {
        const [, no_pemeriksaan] = msg.body.split(' ');
        const contact = await msg.getContact();
        const name = contact.pushname;
        const pemeriksaan = data.find(x => x.no_pemeriksaan === no_pemeriksaan);
        msg.reply(`Sdr/Sdri. ${name}, Silakan tunggu sejenak, data sedang dicari.`);
        msg.reply(`No. permohonan ${pemeriksaan.no_pemeriksaan}. an. ${pemeriksaan.nama_lengkap} siap diambil.`);
    }
});

client.initialize();