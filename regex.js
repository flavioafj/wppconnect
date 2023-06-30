
const regexp = (de, msg) =>{

    
    let pattern_data = /[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2,4}|[0-9]{1,2}\/[0-9]{1,2}/g;
    let pattern_horas = /[0-9]{1,2}h[0-9]{2}|[0-9]{1,2}(?=\s{0,2}horas|\s{0,2}hs|\s{0,2}h|\s*da\s+manhã)|[0-9]{1,2}\:[0-9]{2}|[0-9]{1,2}\s*da\s+tarde|[0-9]{1,2}\s*da\s+noite/g;
    let pattern_dataDeA = /de\s*([0-9]+)\/*([0-9]+)*\/*([0-9]+)*\s*a\s*([0-9]+)\/*([0-9]+)*\/*([0-9]+)*/g;
    let pattern_horasI = /chega(?:[A-z]*)\s*([0-9]+)\ssai(?:[A-z]*)\s*([0-9]+)/g;

    let qualificadores_entrada = ["chegada", "entra", "entrada", "entro", "cheg", "entr", "d?as", "às", "d?as"];
    let qualificadores_saida = ["saída", "sai", "saindo", "saio", "sai", "volt", "as", "às", "às"];
    let qualificadores_entrada_especificos = ["de", "dia", "de", "de", "do", "do", "do", "do", "dia", "dia", "dos?\\s+dias?"];
    let qualificadores_saida_especificos = ["a", "ao", "à",  "até", "a", "ao", "à",  "até", "dia", "até", "a"];
    let entrada = "";
    let saida = "";
    let hora_entrada = "";
    let hora_saida = "";

    /*sanitiza a msg*/
    msg = extenso(msg);

    /*datas*/

    /*1ª tentativa - datas*/
    if(found = msg.match(pattern_data)) {
         entrada = found[0],
         saida = found[1]
    
    
    }


    /*4ª tentativa - datas*/
    if(entrada==""||saida==""||entrada==undefined||saida==undefined){

        for (x = 0; x <= qualificadores_entrada_especificos.length; x++) {

            pattern_dataDeA =  qualificadores_entrada_especificos[x] + "\\s*([0-9]+\/*[0-9]*\/*[0-9]*).*" + qualificadores_saida_especificos[x] + "\\s*([0-9]+\/*[0-9]*\/*[0-9]*)";

            const re = new RegExp(pattern_dataDeA, "i");

            found = msg.match(re);

            if(found!==null){
                
                entrada = found[1],
                saida = found[2]
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
    if(hora_entrada===undefined||hora_saida===undefined||hora_entrada===""||hora_saida===""){
    
        for (x = 0; x < qualificadores_entrada.length; x++) {

            pattern_horasI =  `${qualificadores_entrada[x]}(?:[A-z]*)\\s*([0-9]+).*${qualificadores_saida[x]}(?:[A-z]*)\\s*([0-9]+)`;

            const re2 = new RegExp(pattern_horasI);

            found_h = msg.match(re2);

            if (found_h!==null) {
                if(found_h[1]!==undefined||found_h[1]!==""||found_h[2]!==undefined||found_h[2]!==""){
                    
                    hora_entrada = found_h[1];
                    hora_saida = found_h[2];
                    break;
    
                
                }
            }
        
        }
        
    }
    
    //dts fornece entrada e saída dd/mm/aaa e hora_entrada e hora_saida hh:mm
    dts = arrumaDatas(entrada, saida, hora_entrada, hora_saida);

    escreveArquivo(de, dts[0], dts[1], dts[2], dts[3]);

    var d1 = new Date(troca(dts[0] + " " + dts[2]));
    var d2 = new Date(troca(dts[1] + " " + dts[3]));
    var pr = new Dif(d2-d1);
        if(entrada!=""&&saida!=""){

            return "O preço para estacionar no seguinte período:\n\nEntrada: " + dts[0] + " " + dts[2] + "\nSaída: "+ dts[1] + " " + dts[3] + "\n\n" + pr.dias + " dia(s), " + pr.horas + " hora(s)" + "\n\nSeria:\n\nVaga coberta: " + pr.preco(19).toLocaleString("pt-BR", {style:"currency", currency:"BRL"}) + "\nVaga descoberta: " + pr.preco(14).toLocaleString("pt-BR", {style:"currency", currency:"BRL"});

        }else{

            return;

        }
    }

const arrumaDatas =(str, str2, str3, str4)=>{
    patt = /[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2,4}/;
    patt2 = /[0-9]{1,2}\/[0-9]{1,2}/;
    patt_horas = /[0-9]{1,2}\:[0-9]{1,2}/;

    const today = new Date();
    const ano = today.getFullYear();
  

    if(patt.test(str)){

        contex = new Date(troca(str));

        //patt x patt
        if(!patt.test(str2)){

            //patt x patt2
            if(patt2.test(str2)){

                const ano_const = contex.getFullYear();
                str2 = str2.trim() +"/" + ano_const;

                const d1 = new Date(troca(str));
                const d2 = new Date(troca(str2));
                if(d1>d2){
                    const today2 = contex;
                    const mesqvem = new Date(today2.setMonth(today2.getMonth()+1));
                    str2 = str2.trim() + "/" + mesqvem.getFullYear();
                }

            //patt x none    
            }else{
                const ano_const = contex.getFullYear();
                const mes_const = contex.getMonth() + 1;
                str2 = str2.trim().substring(0,2) + "/" + mes_const + "/" + ano_const;

                const d1 = new Date(troca(str));
                const d2 = new Date(troca(str2));
                if(d1>d2){
                    const today2 = contex;
                    const mesqvem = new Date(today2.setMonth(today2.getMonth()+1));
                    str2 = str2.trim().substring(0,2) + "/" + (mesqvem.getMonth() + 1) + "/" + mesqvem.getFullYear();
                }
                

            }

        }
        
       
    }else{
        if(patt2.test(str)){
            //patt2 x patt
            if(patt.test(str2)){

                contex = new Date(troca(str2));
                const ano_const = contex.getFullYear();
                str = str + "/" + ano_const;

                const d1 = new Date(troca(str));
                const d2 = new Date(troca(str2));
                if(d1>d2){
                    const today3 = contex;
                    const mesanterior = new Date(today3.setMonth(today3.getMonth()-1));
                    str2 = str2.trim().substring(0,2) + "/" + (mesanterior.getMonth() + 1) + "/" + mesanterior.getFullYear();
                }

            }else{
                //patt2 x patt2
                //patt2 x none

                contex = new Date(troca(str + "/" + ano));
                if(contex<today){
                    const today2 = contex;
                    const mesqvem = new Date(today2.setMonth(today2.getMonth()+1));
                    contex = new Date(troca(str + "/" + mesqvem.getFullYear()));
                }
                const ano_const = contex.getFullYear();
                const mes_const = contex.getMonth() + 1;

                //patt2 x patt2
                if(patt2.test(str2)){
                    str = str.split("/")[0] + "/" + str.split("/")[1] + "/" + ano_const;
                    str2 = str2.split("/")[0] + "/" + str2.split("/")[1] + "/" + ano_const;
                //patt2 x none
                }else{
                    str = str.split("/")[0] + "/" + mes_const + "/" + ano_const;
                    str2 = str2.split("/")[0] + "/" + mes_const + "/" + ano_const;
                }
                

                const d1 = new Date(troca(str));
                const d2 = new Date(troca(str2));
                if(d1>d2){
                    const today2 = contex;
                    const mesqvem = new Date(today2.setMonth(today2.getMonth()+1));
                    str2 = str2.split("/")[0] + "/" + (mesqvem.getMonth() + 1) + "/" + mesqvem.getFullYear();
                }
                
                
            }
        }else{
            //none x patt
            if(patt.test(str2)){

                contex = new Date(troca(str2));
                const ano_const = contex.getFullYear();
                const mes_const = contex.getMonth() + 1;
                str = str.trim().substring(0,2) + "/" + mes_const + "/" + ano_const;

                const d1 = new Date(troca(str));
                const d2 = new Date(troca(str2));
                if(d1>d2){
                    const today3 = contex;
                    const mesanterior = new Date(today3.setMonth(today3.getMonth()-1));
                    str = str.trim().substring(0,2) + "/" + (mesanterior.getMonth() + 1) + "/" + mesanterior.getFullYear();
                }
                

            }else{
                //none x patt2
                if(patt2.test(str2)){

                    contex = new Date(troca(str2 + "/" + ano));
                    if(contex<today){
                        const today2 = contex;
                        const mesqvem = new Date(today2.setMonth(today2.getMonth()+1));
                        contex = new Date(troca(str2 + "/" + mesqvem.getFullYear()));
                    }
                    const ano_const = contex.getFullYear();
                    const mes_const = contex.getMonth() + 1;
                    str = str.split("/")[0] + "/" + mes_const + "/" + ano_const;
                    str2 = str2.split("/")[0] + "/" + mes_const + "/" + ano_const;

                    const d1 = new Date(troca(str));
                    const d2 = new Date(troca(str2));
                    if(d1>d2){
                        const today3 = contex;
                        const mesanterior = new Date(today3.setMonth(today3.getMonth()-1));
                        str = str.split("/")[0] + "/" + (mesanterior.getMonth() + 1) + "/" + mesanterior.getFullYear();
                    }

                //none x none
                }else{
                    contex = today;
                    const ano_const = contex.getFullYear();
                    const mes_const = contex.getMonth() + 1;
                    str = str.split("/")[0] + "/" + mes_const + "/" + ano_const;
                    str2 = str2.split("/")[0] + "/" + mes_const + "/" + ano_const;

                    const d1 = new Date(troca(str));
                    const d2 = new Date(troca(str2));
                    if(d1>d2){
                        const today2 = contex;
                        const mesqvem = new Date(today2.setMonth(today2.getMonth()+1));
                        str2 = str2.split("/")[0] + "/" + (mesqvem.getMonth() + 1) + "/" + mesqvem.getFullYear();
                    }

                }
            }

        }
    }


    //horas

    if(!patt_horas .test(str3)){
        
        str3 = str3.replace(/[A-z\s]+/, "");
        str3 = str3.padStart(2,0);
        str3 = str3 + ":" + "00";
    }

    if(!patt_horas .test(str4)){
        
        str4 = str4.replace(/[A-z\s]+/, "");
        str4 = str4.padStart(2,0);
        str4 = str4 + ":" + "00";
    }


    return [str, str2, str3, str4];

}

const troca = (str) => {

    var a  = str.trim().split("/")
    if(a.length > 2){
        return a[1] + "/" + a[0] + "/" + a[2];
    }else{
        return a[1] + "/" + a[0];
    }
    
};

const extenso = (str) =>{
    const palavras = ["hoje", "amanhã"];
    const dia = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
    const mes = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
    var out = str.toLowerCase();

    
    dia.concat(palavras).forEach(element => {

       if(out.search(element)!=-1){
            const d = new Date();
            /*Dias*/
            var dias = new Map();
            dias.set('hoje', d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear());

            for (let i = 0; i < 7; i++) {
                
                d.setDate(d.getDate()+1);
                if(i==0){
                    dias.set('amanhã', d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear());
                }
                dias.set(dia[d.getDay()], d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear());
                
            }
            var retorno = dias.get(element);

            out = out.replace(element, retorno + " ");


        }
        
    });

    /*meses*/
    mes.forEach(element2 => {
        if (out.includes(element2)) {
            
            var ret = "[0-9]{1,2}(\\s*de\\s*" + element2 + ")";

            const re3 = new RegExp(ret, "g");

            matches = out.matchAll(re3);

            for (const mat of matches) {
                out = out.replace(mat[1], "/" + (mes.indexOf(element2) + 1).toString().padStart(2, 0));
            }


            
        }
    });


  

    

    return out;
}


function Dif(e) {
    for (this.dias = 0; e >= 864e5; this.dias++,
    e -= 864e5)
        ;
    for (this.horas = 0; e >= 36e5; this.horas++,
    e -= 36e5)
        ;
    for (this.minutos = 0; e >= 6e4; this.minutos++,
    e -= 6e4)
        ;
    this.preco = function(e) {
        if (tp(e),
        0 == this.dias)
            t = ho(this.horas);
        else
            var t = valore_d(this.dias, this.horas);
        return t
    }
}
function tp(e) {
    19 == e ? (tarifaS = 114.5,
    tarifaD = 23.9,
    tarifaH = 3,
    prim_h = 4,
    demais_h = 3,
    tarifaM = 280,
    tarifaMin = 21) : 14 == e ? (tarifaS = 98,
    tarifaD = 15.9,
    tarifaH = 3,
    prim_h = 3.5,
    demais_h = 2.5,
    tarifaM = 240,
    tarifaMin = 21) : (tarifaS = 0,
    tarifaD = 0,
    tarifaH = 0,
    prim_h = 0,
    demais_h = 0,
    tarifaMin = 21)
}
function valore_d(e, t) {
    var a = 0
      , r = 0;
    return e > 14 ? b = tarifaM : e >= 6 ? (t > 6 ? a = 1 : t > 0 && 7 > t && (r = prim_h + (t - 1) * demais_h),
    b = tarifaS / 7 * (e + a) + r) : b = tarifaD * e + ho2(t),
    b < tarifaMin ? b = tarifaMin : b = b,
    tp(),
    b
}
function ho(e) {
    return b = 7 >= e ? prim_h + (e - 1) * demais_h : tarifaD,
    b < tarifaMin ? b = tarifaMin : b = b,
    tp(),
    b
}
function ho2(e) {
    return b = 6 >= e ? e * tarifaH : tarifaD,
    b
}

const escreveArquivo = (a, b, c, d, e) => {
    var fs = require('fs');
    const f = new Date();
    fs.appendFile('consultas.txt', a + '\t' + b + '\t' + c + '\t' + d + '\t' + e + '\t' + f.toLocaleString("pt-BR") + '\r\n', function (err) {
    if (err) throw err;
       
      });
}

module.exports = regexp;