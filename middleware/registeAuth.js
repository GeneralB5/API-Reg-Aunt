const regAuth = userExample => {
    return async (req, res, next) => {
        const body = req.body
        const arry = {}
        if(!body) throw new Error("no existe datos suficientes")
        if(body.length != userExample.length) throw new Error("El body es mas extenso que el userExample: "+userExample.length)
    }   
}
export default regAuth