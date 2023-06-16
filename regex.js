
const regexp = (msg) =>{

    
    let pattern_data = /[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2,4}|[0-9]{1,2}\/[0-9]{1,2}/g;
    let pattern_horas = /[0-9]{1,2}h[0-9]{2}|[0-9]{1,2}(?=\s{0,2}horas|\s{0,2}hs|\s{0,2}h|\s*da\s+manhã)|[0-9]{1,2}\:[0-9]{2}|[0-9]{1,2}\s*da\s+tarde|[0-9]{1,2}\s*da\s+noite/g;
    let pattern_dataDeA = /de\s*([0-9]+)\/*([0-9]+)*\/*([0-9]+)*\s*a\s*([0-9]+)\/*([0-9]+)*\/*([0-9]+)*/g;
    let pattern_horasI = /chega(?:[A-z]*)\s*([0-9]+)\ssai(?:[A-z]*)\s*([0-9]+)/g;

    let qualificadores_entrada = ["chegada", "entra", "entrada", "entro", "cheg", "entr"];
    let qualificadores_saida = ["saída", "sai", "saindo", "saio", "sai", "volt"];
    let qualificadores_entrada_especificos = ["de", "dia", "de", "de", "do", "do", "do", "do", "dia"];
    let qualificadores_saida_especificos = ["a", "ao", "à",  "até", "a", "ao", "à",  "até", "dia"];
    let entrada = "";
    let saida = "";
    let hora_entrada = "";
    let hora_saida = "";

    /*datas*/

    /*1ª tentativa - datas*/
    if(found = msg.match(pattern_data)) {
         entrada = found[0],
         saida = found[1]
    
    
    }


    /*4ª tentativa - datas*/
    if(entrada==""||saida==""||entrada==undefined||saida==undefined){

        for (x = 0; x <= qualificadores_entrada_especificos.length; x++) {

            pattern_dataDeA =  qualificadores_entrada_especificos[x] + "\\s*([0-9]+)\/*([0-9]+)*\/*([0-9]+)*\\s*" + qualificadores_saida_especificos[x] + "\\s*([0-9]+)\/*([0-9]+)*\/*([0-9]+)*";
/*/dia\s*([0-9]+)([a-z\])*dia\s*([0-9]+)/g*/
            const re = new RegExp(pattern_dataDeA,"g");

            found = msg.match(re);

            if(found!==null){
                
                console.log(found);
                break;

            
            }
        
        }

    }

    
    /*horas*/

    /*1ª tentativa - horas*/
    if(found_h = msg.match(pattern_horas)) {
        
        hora_entrada = found_h[0];
        hora_saida = found_h[1];
   
    
    }

      /*2ª tentativa - horas*/
    if(hora_entrada===undefined||hora_saida===undefined){
    
        for (x = 0; x < qualificadores_entrada.length; x++) {

            pattern_horasI = "/" + qualificadores_entrada[x] + "(?:[A-z]*)\s*([0-9]+)\s" + qualificadores_saida[x] + "(?:[A-z]*)\s*([0-9]+)/g";

            found_h = msg.match(pattern_horasI)

            if(found_h[1]!==undefined){
                
                hora_entrada = found_h[0];
                hora_saida = found_h[1];
                break;

            
            }
        
        }
        
    }

    return "";
}

module.exports = regexp;