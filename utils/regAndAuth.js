const errorHandle = (errMsg)=>{
    throw new Error(errMsg)
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

const authAndRegister= (user,userExample = {
    first_name:{
        mayus:true,
        specialChar:{
                        supported:"",
                        nonSupported:""
                    },
        numbers:true,
        nameLength:10
        },
    last_name:{
        accepted:true,
        mayus:true,
        nameLength:10,
        specialChar:{
                        supported:"",
                        nonSupported:""
                    },
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
        domains: {
                    nonSupported:[],
                    supported:[]
                    }
        },
    password:{
            passLength:10,
            specialChar:{
                supported:"",
                nonSupported:""
            },
            numbers:true,
            mayus:true
            },
    secondPassword:{
                    accepted:true,
                    passLength:10,
                    specialChar:{
                        supported:"",
                        nonSupported:""
                    },
                    numbers:true,
                    mayus:true,
                    }
        
}) => {
    try {
    if(user.first_name){
        const {numbers,mayus,specialChar,nameLength} = userExample.first_name
        
        if(!numbers && numbers != undefined){
            tiene_numeros(user.first_name) ?  errorHandle("No se permiten numeros") : ""
        }

    }else{
        errorHandle("no hay first_name: "+user.first_name)
    }


    console.log('bien')
} catch (error) {
    console.log(error)
}
}
authAndRegister({first_name:"ian1"},{first_name:{numbers:undefined}})