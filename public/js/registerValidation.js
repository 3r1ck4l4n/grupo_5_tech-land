window.addEventListener("load", function(){
    let form = document.querySelector("form");
    let validationsFUl = document.querySelector(".validationsF ul");
    let errorsF = [];

    let firstName = document.querySelector(".firstName"); 
    let lastName = document.querySelector(".lastName");
    let email = document.querySelector(".email");    
    let customer_number_phone = document.querySelector(".customer_number_phone");
    let address = document.querySelector(".address");
    let password = document.querySelector(".password");
    let password2 = document.querySelector(".password2");
    let pais = document.querySelector(".pais");
    let inputImage = document.querySelector(".input-image");
    let offers = document.querySelector("#offers");
    let politicy = document.querySelector("#politicy");
    let registerButton = document.querySelector(".register-button");
    
    registerButton.addEventListener('click', function(e){
       
        //Validación del nombre
        if(firstName.value == ""){ //Que no esté vacío
            errorsF.push("Debes llenar el campo Nombre");
        } else if(firstName.value.length <2){ // Que tenga por lo menos 2 caracteres
            errorsF.push("El campo Nombre debe tener por lo menos 2 caracteres");           
        } else{
            lastName.focus();
        }

        // Validación apellido
        if(lastName.value == ""){ //Que no esté vacío
            errorsF.push("Debes llenar el campo Apellidos");
        } else if(lastName.value.length <2){ // Que tenga por lo menos 2 caracteres
            errorsF.push("El campo Apellidos debe tener por lo menos 2 caracteres");           
        } else{
            email.focus();
        }

        //Validación email
        function validEmail(inputEmail){
            let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; 
            return emailPattern.test(inputEmail);
        }
        let isAValidEmail = validEmail(email.value);        
        console.log(isAValidEmail);

        if(email.value == ""){ //Que no esté vacío
            errorsF.push("Debes llenar el campo de email");
        } else if(isAValidEmail !== true){ // Que sea un email válido
            errorsF.push("Debes ingresar un correo electrónico válido");           
        } else{
            customer_number_phone.focus();
        }

        //Validación teléfono

        function validPhone(phone){
            let phonePattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
            return phonePattern.test(phone);
        }
        let isAValidPhone = validPhone(customer_number_phone.value);

        if(customer_number_phone.value == ""){ //Que no esté vacío
            errorsF.push("Debes llenar el campo Teléfono");
        } else if(customer_number_phone.value.length <10){ // Que tenga por lo menos 10 caracteres
            errorsF.push("El campo Teléfono debe tener por lo menos 10 caracteres");                       
        } else if (isAValidPhone !== true){
            errorsF.push("Debes ingresar un número de teléfono válido");
        } else{
            address.focus();
        }

        //Validación dirección
        if(address.value == ""){ //Que no esté vacío
            errorsF.push("Debes llenar el campo Dirección");
        } else if(address.value.length <5){ // Que tenga por lo menos 5 caracteres
            errorsF.push("El campo Dirección debe tener por lo menos 5 caracteres");           
        } else{
            password.focus();
        }

        //Validación password
        function validPass(pass){
            let passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            return passwordPattern.test(pass);
        }

        isAValidPass = validPass(password.value);

        if(password.value == ""){ //Que no esté vacío
            errorsF.push("Debes llenar el campo Contraseña");
        } else if(password.value.length <8){ // Que tenga por lo menos 8 caracteres
            errorsF.push("El campo Contraseña debe tener por lo menos 8 caracteres");           
        } else if(isAValidPass !== true){
            errorsF.push("La contraseña debe tener al menos una letra, un caracter especial y un alfanumerico")
        }else{
            password2.focus();
        }

        //Validación password2
        
        isAValidPass2 = validPass(password2.value);

        if(password2.value == ""){ //Que no esté vacío
            errorsF.push("Debes ingresar nuevamente la contraseña");
        } else if(password2.value.length <8){ // Que tenga por lo menos 8 caracteres
            errorsF.push("La Contraseña debe tener por lo menos 8 caracteres");           
        } else if(isAValidPass2 !== true){
            errorsF.push("La contraseña debe tener al menos una letra, un caracter especial y un alfanumerico")
        } else if(password2.value !== password.value){
            errorsF.push("Las contraseñas deben ser idénticas");
        }else{
            pais.focus();
        }


        //Validacion país
        if(pais.value == ""){ //Que no esté vacío
            errorsF.push("Debes seleccionar un País");
        } else{
            inputImage.focus();
        }

        // Validación imagen
        function validImage(imagePath){
            let validFormats =  /(\.jpg|\.jpeg|\.png|\.gif)$/i;
            
            return validFormats.test(imagePath)
        }

        isAValidFormatImage = validImage(inputImage.value);


        if(inputImage.value == ""){ // La imagen es obligatoria
            errorsF.push("Debes seleccionar una imagen");
        } else if(isAValidFormatImage !== true){
            errorsF.push("Debes seleccionar un formato de imagen permitido: .jpeg, .jpg, .png, .gif");
        } else{
            offers.focus()
        }
        
        //Validación politicy

        if(politicy.checked !== true){
            errorsF.push("Debes aceptar las políticas de operación");
        } else{
            registerButton.focus();
        }


        
        




        // Revisar si hay algún error
        if(errorsF.length > 0){
            e.preventDefault();
            console.log(errorsF);
            console.log(validationsFUl);
            validationsFUl.innerHTML = "";

            for(i = 0; i< errorsF.length; i++){
                validationsFUl.innerHTML += `<li>${errorsF[i]}</li>`
            }  
            
            errorsF = [];

        } else{
            registerButton.submit();
        }
    
    })
    
   
})