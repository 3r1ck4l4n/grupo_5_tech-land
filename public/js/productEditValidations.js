window.addEventListener("load", function(){
    let form = document.querySelector("form");

    let name = document.querySelector("#name");
    let description = document.querySelector("#description");
    let inputImage = document.querySelector("#file");
    let inputType = document.querySelector("#type");
    let price = document.querySelector("#price");
    let stock = document.querySelector("#stock");    
    let aTypeOfProduct = document.querySelector("#category");
    let submitButton = document.querySelector(".button-form");

    let errorsList = document.querySelector(".validationsF");

    submitButton.addEventListener("click", function(e){
               
        let errors = [];

        //product name validation
        if(name.value == ""){
            errors.push("Debes escribir un nombre para el producto");
        } else if(name.value.length < 5){
            errors.push("El nombre del producto debe contener por lo menos 5 caracteres");
        } else {
            description.focus();
        }

        //product description validation
        if(description.value == ""){
            errors.push("Debes escribir una descripción del producto");
        } else if(description.value.length < 20){
            errors.push("La descripción del producto debe contener por lo menos 20 caracteres");
        } else {
            inputImage.focus();
        }
        
        //inputImage validation

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
            inputType.focus();
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
            aTypeOfProduct.focus();
        }




        // checking if there are some errors

        if(errors.length > 0){
            e.preventDefault()
            errorsList.innerHTML ="";

            for(i= 0; i< errors.length; i++){
                errorsList.innerHTML+= `<li>${errors[i]}</li>`
            }

            errors = [];
        } else{
            submitButton.submit();
        }

    })
})