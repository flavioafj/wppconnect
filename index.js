// Supports ES6
// import { create, Whatsapp } from '@wppconnect-team/wppconnect';
const wppconnect = require('@wppconnect-team/wppconnect');
const resposta = require('./functions.js');

async function sendLoc(client, quem){

  return new Promise(async function(resolve, reject) {
    await client.sendLocation(quem,'-19.6226907','-43.9961090','Pátio Confins')
    .then((res) => resolve("Succesfully sent."))
              .catch((error) => reject("Can not send message.", error))
  })
}

wppconnect
  .create()
  .then((client) => start(client))
  .catch((error) => console.log(error));

function start(client) {
  client.onMessage((message) => {
    if (message.body === '11'||message.body === '33'||message.body === '44'||message.body === '55') {
      client
        .sendText(message.from, resposta(message.body))
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
    if (message.body === '22') {
      
      client
        .sendText(message.from, resposta(message.body))
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
    if (message.body === '65') {
    
      client
        .sendText(message.from, resposta(message.body))
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
  });
}