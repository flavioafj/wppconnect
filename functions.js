

const answer = (msg) =>{


    switch (msg) {
        case '11':
          resp = "Nossas diárias são as seguintes:\n\nR$ 15,9 - vaga descoberta;\nR$ 23,9 - vaga coberta.\n\nRessalto que as horas adicionais são cobradas da seguinte forma:\n\nprimeira hora - R$ 3,5 (vaga descoberta) /R$ 4 (vaga coberta)\ndemais horas - R$ 2,5 (vaga descoberta) /R$ 3 (vaga coberta)\n\nOs clientes que permanecem por 7 ou mais dias conosco, fazem jus a promoção de semana, pagando uma diária de *R$ 16,36* para vaga coberta e *R$ 14* para descoberta.\n\nFaça uma simulação do provável valor da sua estadia, colocando a hora de entrada e de saída estimada no site: https://estacionamentopatioconfins.com.br/wp/reservas/.\n\nEstamos muito próximos ao aeroporto, cerca de 4 km. Visite nosso site e veja: https://estacionamentopatioconfins.com.br/estacionamento-proximo-ao-aeroporto-de-confins/\n\nVenha nos conhecer, temos translado gratuito (ida e volta) 24 horas para/de o aeroporto, estacionamento com segurança  e seguro.";
          break;
        case '22':
           resp = "Estamos cerca de 4 minutos, ou 3 km, do Aeroporto de Confins.\n\nA maneira mais fácil de chegar ao nosso estacionamento é procurando por “Estacionamento Pátio Confins” no Waze ou Google Maps.\n\nClique aqui para o passo a passo detalhado: https://estacionamentopatioconfins.com.br/wp/estacionamento-proximo-ao-aeroporto-de-confins/";
          break;
        case '33':
          resp = "Faça sua reserva gratuita em 3\u20e3 três passos. Clique no link a seguir: https://estacionamentopatioconfins.com.br/wp/reservas/";
          break;
        case '44':
          resp = "\ud83d\ude8c \ud83d\ude8d \ud83d\ude8f \ud83d\ude8e \ud83d\ude90 \ud83d\ude98 Chame sua van, tire suas dúvidas, entre em contato com um dos seguintes números:\n\n(31) 3-665-7777\n\n(31) 9-8473-1607\n\n(31) 9-8478-6316\n\n \ud83d\udcf6 \ud83d\udcf2 \ud83d\udcf3 \ud83d\udcf1 \ud83d\udcde \u260e";
          break;
        case '55':
          resp = "\ud83d\ude8c \ud83d\ude8d \ud83d\ude8f \ud83d\ude8e \ud83d\ude90\n\nNossos transportes, são gratuitos, funcionam 24 horas e saem imediatamente após a chegada dos nossos clientes.\n\n    -Recomendamos chegar em nosso estacionamento 15 minutos antes do horário pretendido de estar no aeroporto (diferente de horário do voo), pois nossos veículos podem estar ocupados no momento da sua chegada. \n\nNo seu retorno, você nos liga e te buscamos na sua área de desembarque. O trajeto do estacionamento ao aeroporto não leva mais que 5 minutos (\ud83d\udd90).";
          break;
        case '65':
          resp = "Aceitamos pagamento antecipado por pix. Funciona assim:\n\n1. *Faça o pix no valor informado para o CNPJ*\n\n*25.042.876/0001-21*\n\n2. *Envie o comprovante para esse número*\n\nPronto!!\n\n```Caso o carro``` *saia antes de 48 horas* ```do término da estadia, devolveremos proporcionalmente o valor pago.\n\nCaso você permaneça``` *além de 24 horas* ```do término da estadia, será cobrado o período adicional```\n\nNossa chave pix é:";
      }
      return resp;
}

module.exports = answer;