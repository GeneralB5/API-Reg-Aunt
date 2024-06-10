const errorHandle = (errMsg)=>{
    throw new Error(errMsg)
}

function validarDominio(email,supportedDomains){
    // Verificar si el email es válido
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValido) {
        return "Email no válido";
    }
    // Extraer el dominio del email sin el .
    const dominio = email.split('@')[1].split('.')[0];
    return supportedDomains.includes(dominio);
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

const authAndRegister= (user,userExample = {
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
                }
        },
    password:{
            nameLength:10,
            specialChar:true,
            numbers:true,
            mayus:true
            },
    secondPassword:{
                    accepted:true,
                    nameLength:10,
                    specialChar:true,
                    numbers:true,
                    mayus:true,
                    }
        
}) => {
    try {
    
    const arrayDeObjetos = Object.entries(user).map(([clave, valor]) => ({ clave , valor }));
    ///array con el user y las especificaciones
    arrayDeObjetos.map(user =>{
        const importantValues=["password","first_name"]
        const objectEntered = userExample[user.clave] ? userExample[user.clave] : {}
        const {numbers=undefined,
               mayus=undefined,
               specialChar=undefined,
               accepted=undefined,
               domains = undefined,
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
            if(user.clave == "age"){
                let num = parseInt(user.valor)
                const {from=1,to=100} = range
                num >= from && num <= to ? "" : errorHandle("Edad por fuera de parametros") 
            }
            ///domains
            if(domains != undefined && user.clave == "email"){
                let {supported} = domains
                console.log(validarDominio(user.valor,supported))
            }
            console.log('bien')
}
})
} catch (error) {
    console.log(error)
}
}
authAndRegister({first_name:"Aan1",age:14,email:"ian@gmail.com"},{age:{accepted:true,range:{from:13}},
email:{accepted:true,domains:{supported:["gmail"]}}})