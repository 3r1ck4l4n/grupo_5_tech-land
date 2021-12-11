window.addEventListener('load', function(){

    let addItem = document.querySelector(".addItem");
    let removeItem = document.querySelector(".removeItem");
    let quantity = document.querySelector("input.quantity")
    let iconTrashAndMinus = document.querySelector(".removeItem i")
    
    addItem.addEventListener("click", function(event){
        event.preventDefault();       
        quantity.value++;
        if(quantity.value>1){
            iconTrashAndMinus.classList.remove("fa-trash");
            iconTrashAndMinus.classList.add("fa-minus");
            console.log(iconTrashAndMinus);
        }
    });

    removeItem.addEventListener("click", function(event){
        event.preventDefault();       
        if(quantity.value > 2){
            quantity.value = quantity.value-1;
        } else if(quantity.value == 2){
            quantity.value = quantity.value-1;
            iconTrashAndMinus.classList.remove("fa-minus");
            iconTrashAndMinus.classList.add("fa-trash");
        } else if(quantity.value == 1){
            "Que se borre este artículo del carrito, como en Amazon."
        }

    })

});