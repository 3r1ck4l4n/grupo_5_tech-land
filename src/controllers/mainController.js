const mainController = {
    home: (req, res)=>{
        res.render('home');
    },
    login: (req, res)=>{
        res.render('login');
    },
    register: (req, res)=>{
        res.render('register');
    },
    productCart: (req, res)=>{
        res.render('productCart');
    },
    productDetail: (req, res)=>{
        res.render('productDetail');
    },
}

module.exports=mainController;