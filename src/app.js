const firebasedb = require('./firebase.js');
const wppconnect = require('@wppconnect-team/wppconnect');
const userStages = [];

wppconnect.create({
    session: 'whatsbot',
    autoClose: false,
    puppeteerOptions: { args: ['--no-sandbox'] }
})
    .then((client) =>
        client.onMessage((message) => {
            console.log('Mensagem digitada pelo usuário: ' + message.body);
            queryUserByPhone(client, message);
        }))
    .catch((error) => console.log(error));


async function queryUserByPhone(client, message) {
    let phone = (message.from).replace(/[^\d]+/g, '');
    let userdata = await firebasedb.queryByPhone(phone);
    if (userdata == null) {
        userdata = await saveUser(message);
    }
    console.log('Usuário corrente: ' + userdata['id']);
    stages(client, message, userdata);
}



async function stages(client, message, userdata) {

const contatoNome = message.sender.pushname;


        if (userStages[message.from] === undefined) {
          // Se o usuário não tiver um estágio definido
          sendWppMessage(client, message.from,`Por gentileza, digite a opção que deseja: 
          1-Comprar óculos         
          2-Como medir o rosto   
          3-Catálogos         
          4-Local da empresa         
          5-Atendimento por video chamada com consultor (10% de deconto na compra)` );
          sendWppMessage(client, message.from,`Olá, ${contatoNome}, meu nome é Santinho Grau, mas pode me chamar de Santinho, sou um assistente virtual que está aqui para agilizar seu atendimento e tirar dúvidas.    Seja muito bem vindo! 💜` );
          
        userStages[message.from] = "menu"; // Definindo o estágio do usuário como "menu"


        } else if (userStages[message.from] === "menu" && message.body === "1") {
          // Se o usuário estiver no estágio "menu" e digitar "1"
          await client.sendImage(
            '../img/catmeme.jpg',
            'ImagemDoGato',
            
          );
          userStages[message.from] = "JaTemArmacao?"; // Definindo o estágio do usuário como "JaTemArmacao"

        } else if (userStages[message.from] === "JaTemArmacao?") {
            if (message.body === "1 ") {
                sendWppMessage(client, message.from,`Legal! Agora para próximo passo, precisamos uma foto para medir o rosto, vou mandar o modelo abaixo:` );
    
userStages[message.from] = "ComoTirarFotoArmacao"; // Definindo o estágio do usuário como "JaTemArmacao"

          } else if (userStages[message.from] === "menu" && message.body === "2") {
          // Se o usuário estiver no estágio "menu" e digitar "2"
          sendWppMessage(client, message.from, `Legal, você chegou a ver alguma armação em nossas redes sociais que você tenha gostado? Ou posso trazer nossos catálogos para você conhecer? 😁😁
          1-Ja vi uma armação que gostei
          2-Trazer novos catálogos`  ); 
          } else if (userStages[message.from] === "menu" && message.body === "3") {
          // Se o usuário estiver no estágio "menu" e digitar "2"
          sendWppMessage(client, message.from, `Legal, você chegou a ver alguma armação em nossas redes sociais que você tenha gostado? Ou posso trazer nossos catálogos para você conhecer? 😁😁
          1-Ja vi uma armação que gostei
          2-Trazer novos catálogos`  );
          } else if (userStages[message.from] === "menu" && message.body === "4") {
          // Se o usuário estiver no estágio "menu" e digitar "2"
          sendWppMessage(client, message.from, `Legal, você chegou a ver alguma armação em nossas redes sociais que você tenha gostado? Ou posso trazer nossos catálogos para você conhecer? 😁😁
          1-Ja vi uma armação que gostei
          2-Trazer novos catálogos`  );
          } else if (userStages[message.from] === "menu" && message.body === "5") {
          // Se o usuário estiver no estágio "menu" e digitar "2"
          sendWppMessage(client, message.from, `Legal, você chegou a ver alguma armação em nossas redes sociais que você tenha gostado? Ou posso trazer nossos catálogos para você conhecer? 😁😁
          1-Ja vi uma armação que gostei
          2-Trazer novos catálogos`  ); 
       
              
       
  
    
userStages[message.from] = "Orcamento"; // Definindo o estágio do usuário como "QueroComprar"

                        } else if (userStages[message.from] === "Orcamento") {
                        if (message.body === "1") {
                            sendWppMessage(client, message.from,`Bacana, e me diz uma coisa... você já usa óculos ?🤓
    1 - Sim
    2 - Não` );
userStages[message.from] = "VcJaUsouOculos"; 

                        } else if (message.body === "2") {
                            
                            sendWppMessage(client, message.from, `Qual opção se encaixa melhor na sua necessidade?

    1 - Ver as armações
    0 - Voltar ao menu`);
                            userStages[message.from] = "OrcamentoN";
                        }
                    }













          
}
        
      
      
    

function sendWppMessage(client, sendTo, text) {
    client.sendText(sendTo, text)
        .then((result) => {
            // console.log('SUCESSO: ', result); 
        })
        .catch((erro) => {
            console.error('ERRO: ', erro);
        });
}

async function saveUser(message) {
    let user = {
       // 'pushname': (message['sender']['pushname'] != undefined) ? message['sender']['pushname'] : '',
        'whatsapp': (message.from).replace(/[^\d]+/g, '')
    }
    let newUser = firebasedb.save(user);
    return newUser;
}
}