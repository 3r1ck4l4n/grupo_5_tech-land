window.addEventListener("load", function(){
    let errorsLogin = document.querySelector(".errorsLogin ul")

    let form = document.querySelector("form");

    let email = document.querySelector(".email");

    let password = document.querySelector(".password");

    let submitButton = document.querySelector("#submitButton");

    submitButton.addEventListener("click", function(e){
        
        let errors = [];

        //email validation

        function validEmail(inputEmail){
            let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; 
            return emailPattern.test(inputEmail);
        }
        let isAValidEmail = validEmail(email.value);        
        console.log(isAValidEmail);

        if(email.value == ""){
            errors.push("Debes ingresar un email");
        } else if(isAValidEmail !== true){
            errors.push("Debes ingresar un email válido");
        } else{
            password.focus();
        }

        // password validation
        function validPass(pass){
            let passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            return passwordPattern.test(pass);
        }
        
        isAValidPass = validPass(password.value);

        if(password.value == ""){
            errors.push("Debes ingresar tu contraseña");            
        } else if(password.value.length < 8){
            errors.push("La contraseña debe tener por lo menos ocho caracteres");   
        } else if(isAValidPass !== true){
            errors.push("La contraseña debe tener al menos una letra, un caracter especial y un alfanumerico");   
        } else {
            submitButton.focus()
        }


        // verifying wether there are errors or not

        if(errors.length > 0){
            e.preventDefault();
            errorsLogin.innerHTML = "";

            for(i =0; i< errors.length; i++){
                errorsLogin.innerHTML += `<li>${errors[i]}</li>`
            }

            errors = [];
        } else{
            submitButton.submit();
        }
    })
    
})