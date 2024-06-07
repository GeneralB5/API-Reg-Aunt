class viewController{
    constructor(){}
    login = (req,res)=>{    
        res.render("login",{})
    }
    register = (req,res)=>{
        res.render("register",{})
    }
}
export default viewController