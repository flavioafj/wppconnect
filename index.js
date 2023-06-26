// Supports ES6
// import { create, Whatsapp } from '@wppconnect-team/wppconnect';
const wppconnect = require('@wppconnect-team/wppconnect');
const resposta = require('./functions.js');
const consulta_preco = require('./regex.js');
const {join} = require('path');

async function sendLoc(client, quem){

  return new Promise(async function(resolve, reject) {
    await client.sendLocation(quem,'-19.6226907','-43.9961090','Pátio Confins')
    .then((res) => resolve("Succesfully sent."))
              .catch((error) => reject("Can not send message.", error))
  })
}

wppconnect
  .create({
    session: 'teste',
    onLoadingScreen: (percent, message) => {
      console.log('LOADING_SCREEN', percent, message);
    },
    browserArgs: ['--no-sandbox'], // Parameters to be added into the chrome browser instance
    puppeteerOptions: {args: ['--no-sandbox'] },
  })
  .then((client) => start(client))
  .catch((error) => console.log(error));

function start(client) {
  client.onMessage((message) => {
    console.log(message.body);
    if (message.body === '1'||message.body === '3'||message.body === '4'||message.body === '5') {
      client
        .sendText(message.from, resposta.answer(message.body))
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
    if (message.body === '2') {
      
      client
        .sendText(message.from, resposta.answer(message.body))
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
        client
        .sendText(message.from, "\ud83d\udccd \ud83d\udccd Nosso endereço é 'Rua Lapa Vermelha, 180, Confins/MG' \ud83d\udce8")
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
        sendLoc(client, message.from);
    }
    if (message.body === '6') {
    
      client
        .sendText(message.from, resposta.answer(message.body))
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
      
      client
        .sendText(message.from,'25042876000121')
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
    if (message.body === 'Close') {
      
      client.close();
        
    }

    //if nothing happen the message will be assesed here
    if (resposta.asses(message.body)) {
      client
        .sendText(message.from, consulta_preco(message.from, message.body))
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
  });


}

module.exports = {
  // Changes the cache location for Puppeteer.
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};