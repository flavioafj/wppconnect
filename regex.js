
const regexp = (msg) =>{

    
    let result = /[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2,4}|[0-9]{1,2}\/[0-9]{1,2}/i.exec(msg);
    return result[0];
}

module.exports = regexp;