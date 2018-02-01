module.exports.choQry = (error) =>{
    if(error === null){
        json = {}
        json.status = "ok"
        return json
    }else{
        json = {}
        json.msg = error
        json.status = "deny"
        return json
    }
}