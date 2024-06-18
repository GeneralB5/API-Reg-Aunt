class DTOUser{
    constructor({first_name,last_name,age,DNI,email,password}){
        this.password = password 
        this.first_name = first_name || undefined
        this.last_name = last_name || undefined
        this.age = age || undefined
        this.dni = DNI || undefined
        this.email = email 
        this.fullname = (first_name?first_name:email)+" "+(last_name?last_name:"")
        this.last_used = Date.now()
    }
}
export default DTOUser