window.addEventListener('load', function(){
    let nameProduct = document.querySelector("#name_product");
    let description = document.querySelector(".input-description");
    let inputImage = document.querySelector(".input-image");
    let category = document.querySelector("#category");
    let price = document.getElementById("price")
    let stock = document.querySelector("#stock");
    let inputType = document.querySelector("#type");
    let submitButton = document.querySelector(".register-button");

    let errorsList = document.querySelector(".validationsF ul");

    submitButton.addEventListener("click", function(e){        
        let errors = [];


        //Product name validation
        if(nameProduct.value == ""){
            errors.push("Debes ingresar el nombre del producto");
        } else if(nameProduct.value.length < 5){
            errors.push("El nombre del producto debe contener por lo menos 5 caracteres");            
        } else {
            description.focus();
        }


        // Product description validation
        if(description.value == ""){
            errors.push("Debes ingresar una descripción del producto");
        } else if(description.value.length < 20){
            errors.push("La descripción del producto debe contener por lo menos 20 caracteres");            
        } else {
            inputImage.focus();
        }

        // inputImage Validation

        function validImage(imagePath){
            let validFormats =  /(\.jpg|\.jpeg|\.png|\.gif)$/i;
            
            return validFormats.test(imagePath)
        }

        isAValidFormatImage = validImage(inputImage.value);

        if(inputImage.value == ""){
            errors.push("Debes seleccionar una imagen");
        } else if(isAValidFormatImage !== true){
            errors.push("Debes seleccionar un formato de imagen válido: .jpg, .jpeg, .png, o .gif");
        } else{
            category.focus();
        }

        //price Validation

        if(price.value == ""){
            errors.push("Debes proporcionar el precio del producto");
        } else{
            stock.focus();
        }

        //stock Validation

        if(stock.value == ""){
            errors.push("Debes proporcionar la cantidad de stock que hay del producto");
        } else{
            inputType.focus();
        }



        // Checking if there are errors

        if(errors.length > 0){
            e.preventDefault();
            console.log(errors);            
            errorsList.innerHTML = "" ;

            for(i=0; i< errors.length; i++){
                errorsList.innerHTML += `<li>${errors[i]}</li>`
            }

            errors = [];

        } else{
            submitButton.submit();
        }

    })


   


     
})