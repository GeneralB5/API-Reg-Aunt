import DTOUser from "../MongoDB/dto/dto.js";

const errorHandle = (errMsg)=>{
    throw new Error(errMsg)
}

function validarDominio(email,supportedDomains,TLDArry,combination = true){
    // Verificar si el email es válido
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValido) {
        return "Email no válido";
    }
    // Extraer el dominio del email sin el .
    const [dominio ,TLD, TLDComb] = email.split('@')[1].split('.');

    if(combination){
    return TLDArry.length > 0? TLDArry.includes(TLD) : true && supportedDomains.length > 0 ? supportedDomains.includes(dominio): true
    }else{
    return TLDComb ==undefined?  TLDArry.length > 0? TLDArry.includes(TLD) : true && supportedDomains.length > 0 ? supportedDomains.includes(dominio): true : false
    }
}

function tiene_numeros(texto){
    let numeros="0123456789"
    for(let i=0; i < texto.length; i++){
        if (numeros.indexOf(texto.charAt(i),0)!=-1){
            return true;
        }
    }
    return false;
}

function tiene_mayus(texto){
    for (let i = 0; i < texto.length; i++){
        if(texto[i] == texto[i].toUpperCase() && isNaN(texto[i]))return true
        
    }
    return false
}

function detectarCaracteresEspeciales(texto) {
    var expresionRegular = /[^a-zA-Z0-9]/
    return expresionRegular.test(texto)
}

class DTO_User_Build_In{
    constructor({first_name,last_name,age,DNI,email,password}){
        this.password = password 
        this.first_name = first_name || undefined
        this.last_name = last_name || undefined
        this.age = age || undefined
        this.dni = DNI || undefined
        this.email = email 
        this.fullname = first_name?first_name+" "+(last_name?last_name:""):email
        this.last_used = Date.now()
    }
}

const authAndRegister= (userEntry = {first_name:"",last_name:"",email:"",age:1,dni:12345678,password:""},userExample = {
    first_name:{
        mayus:true,
        specialChar:true,
        numbers:true,
        nameLength:10
        },
    last_name:{
        accepted:true,
        mayus:true,
        nameLength:10,
        specialChar:true,
        numbers:true
        },
    age:{
        accepted:true,
        range:{
            from:1,
            to:100
            }
        },
    dni:{
        DNIlength:8,
        accepted:true
        },
    email:{
        accepted:true,
        domains:{
                  supported:[]
                },
        TLD:{
                supported:[],
                combinations:true
            }
        },
    password:{
            nameLength:10,
            specialChar:true,
            numbers:true,
            mayus:true
            },
    secondpassword:{
                    accepted:true,
                    nameLength:10,
                    specialChar:true,
                    numbers:true,
                    mayus:true,
                    }
        
},otherConfig={
    importantValuesArry:[],
    otherFunci:{
        acceptedKeys:[],
        funcions:[]
    },
    neededValues:[],
    DTO:DTO_User_Build_In(),
}) => {
    try {
    const arrayDeObjetos = Object.entries(userEntry).map(([clave, valor]) => ({ clave , valor }));
    ///important values
    const {importantValuesArry= [],neededValues = [],DTO = DTO_User_Build_In,otherFunci={acceptedKeys:[],funcions:[]}} = otherConfig
    importantValuesArry.every(element => typeof element === 'string')? "":errorHandle("Solo puede haber strings en el array")
    const importantValues=importantValuesArry.concat(neededValues.length == 0?["password","email"]: neededValues)
    ///array con el user y las especificaciones
    importantValues.map( value =>arrayDeObjetos.find( x => x.clave == value)? "" : errorHandle(`no existe ${value} en el usuario`))

    arrayDeObjetos.map(user =>{
        const objectEntered = userExample[user.clave.toLowerCase()] ? userExample[user.clave.toLowerCase()] : {}
        const {numbers=undefined,
               mayus=undefined,
               specialChar=undefined,
               accepted=undefined,
               domains = undefined,
               TLD =undefined,
               DNIlength = 8,
               range = {from:1,to:100},
               nameLength = 40} = objectEntered
        const firstNameUser = isNaN(user.valor)?user.valor.trim():user.valor
        if(accepted || importantValues.includes(user.clave)){
            ///number validation
            if(!numbers && numbers != undefined){
                tiene_numeros(firstNameUser) ?  errorHandle("No se permiten numeros") : ""
            }
            ///mayus validation
            if(!mayus && mayus != undefined){
                tiene_mayus(firstNameUser) ? errorHandle("No se permiten mayusculas") : ""
            }   
            ///special chart validation       
            if(!specialChar && specialChar != undefined){
                detectarCaracteresEspeciales(firstNameUser) ? errorHandle("No se permiten caracteres especiales") : ""
            }
            if(nameLength < firstNameUser.length) return errorHandle("Nombre demasiado largo")
            ///range of age 
        
            if(user.clave == "age" ){
                let num = parseInt(user.valor)
                let {from=1,to=100} = range
                if(isNaN(to) || isNaN(from)) return errorHandle("Range erroniamente ingresado") 
                num >= from && num <= to ? "" : errorHandle("Edad por fuera de parametros") 
            }
            ///domains
            if(domains != undefined && user.clave == "email"){
                let {supported=[]} = domains
                let TLDArry = TLD ? 
                    TLD.supported!=undefined?TLD.supported : []
                    :[]
                let domainsAccepted = supported.length > 0 ? "solo se acepta/an los dominios: " + supported.join(", ") :"Se aceptan todos los dominios"
                let TDLAccepted =!TLD.combinations ? "No se aceptan combinacions":"Se aceptan combinacione TDL" 
                validarDominio(user.valor,supported,TLDArry,TLD.combinations)? "" : errorHandle(domainsAccepted+" ."+TDLAccepted )
            }
            //DNILenght
            ///fijarse que no importe el uso de mayusculas
            if(DNIlength != undefined && user.clave.toLowerCase() == "dni"){
                const DNIWithOutspaces = user.valor.replace(/\s+/g, '');
                const DNIverification = DNIWithOutspaces.length <= DNIlength
                DNIverification ? "" : errorHandle(`DNI erroneo, maximo largo es ${DNIlength}, el ingresado es ${DNIWithOutspaces.length}`)
            }
            if(user.clave.toLowerCase() =="secondpassword"){
                user.valor == arrayDeObjetos.find(x => x.clave == "password").valor? "":errorHandle("No es igual la contraseña")
            }
            
            if(Object.keys(otherFunci).length >0){
            const {funcions=[],acceptedKeys=[]} = otherFunci
            if(acceptedKeys.includes(user.clave)){
            funcions.length >0?otherFunci.map(func =>{
                
            }):""}
            }
            console.log('bien') 
    }
})
///dto para retornar
    return new DTO(userEntry)
} catch (error) {
    console.log(error)
}
}
let user = authAndRegister({email:"holaquetal@gmail",password:"aca",secondPassword:"aca"},{age:{accepted:true,range:{from:'11'}},
dni:{accepted:true},email:{accepted:true,domains:{supported:[]},TLD:{supported:[]}},secondpassword:{accepted:true}},
{otherFunci:[],importantValuesArry:[]})
//console.log(user)