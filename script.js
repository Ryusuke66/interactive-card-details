let inputs = document.querySelectorAll("input"),
    cardholderName = inputs[0],
    cardNum = inputs[1],
    month = inputs[2],
    year = inputs[3],
    cvc = inputs[4],
    errorDiv = document.querySelectorAll(".error"),
    ccNum = document.querySelector(".num"),
    holderName = document.querySelector(".name"),
    expireDate = document.querySelector(".expire-date"),
    cvcNum = document.querySelector(".back"),
    form = document.querySelector("form"),
    thanksPage = document.querySelector(".thanks"),
    continueBtn = document.querySelector(".continue");

thanksPage.remove();

function validate() {
    let result = true;
    if (/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?)]/ig.test(cardholderName.value) || cardholderName.value.length > 20) {
        cardholderName.style.border = "1px solid hsl(0, 100%, 66%)";
        errorDiv[0].classList.add("active");
        errorDiv[0].textContent = "Wrong format, letters only";
        result = false;
    } else {
        errorDiv[0].classList.remove("active");
        cardholderName.style.border = "1px solid hsl(270, 3%, 87%)";
    }
    if (cardholderName.value === '') {
        errorDiv[0].classList.add("active");
        cardholderName.style.border = "1px solid hsl(0, 100%, 66%)";
        errorDiv[0].textContent = "Cant be blank";
        result = false;
    } 

    

    if (!/^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/ig.test(cardNum.value)) {
        cardNum.style.border = "1px solid hsl(0, 100%, 66%)";
        errorDiv[1].classList.add("active");
        errorDiv[1].textContent = "Wrong format";
        result = false;
    } else {
        errorDiv[1].classList.remove("active");
        cardNum.style.border = "1px solid hsl(270, 3%, 87%)";
    }
    
    if (/[a-z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/ig.test(cardNum.value)) {
        errorDiv[1].textContent = "Wrong format, numbers only";
        
    }
    
    if (cardNum.value === '') {
        errorDiv[1].textContent = "Cant be blank";
    }

    if (month.value < 1 || month.value > 12 || month.value.length > 2) {
        result = false;
        month.style.border = "1px solid hsl(0, 100%, 66%)";
        errorDiv[2].classList.add("active");
        errorDiv[2].style.visibility = "visible";
        errorDiv[2].textContent = "Invalid date";
    } else {
        errorDiv[2].classList.remove("active");
        errorDiv[2].style.visibility = "hidden";
        month.style.border = "1px solid hsl(270, 3%, 87%)";
    }

    if (year.value < 1 || year.value.length > 2) {
        result = false;
        year.style.border = "1px solid hsl(0, 100%, 66%)";
        errorDiv[2].classList.add("active");
        errorDiv[2].style.visibility = "visible";
        errorDiv[2].textContent = "Invalid date";
    } else {
        year.style.border = "1px solid hsl(270, 3%, 87%)";
    }
    
    if (month.value === '' || year.value === "") {
        errorDiv[2].textContent = "Cant be blank";
    } 


    if (cvc.value.length !== 3 || cvc.value < 1) {
        result = false;
        cvc.style.border = "1px solid hsl(0, 100%, 66%)";
        errorDiv[3].classList.add("active");
        errorDiv[3].textContent = "Invalid number";
    } else {
        errorDiv[3].classList.remove("active");
    }

    if (cvc.value === "") {
        errorDiv[3].textContent = "Can't be blank";
    }

    
    console.log(result);
    return result;
}

form.addEventListener("submit", function(e) {
    if(validate()) {
        ccNum.textContent = cardNum.value;
        holderName.textContent = cardholderName.value;
        expireDate.textContent = `${+month.value}/${+year.value}`;
        cvcNum.textContent = cvc.value;
        inputs.forEach(e => {
            e.style.border = "1px solid hsl(270, 3%, 87%)";
            e.value = "";
        });
        errorDiv.forEach(e => e.classList.remove("active"));
        form.remove();
        document.body.appendChild(thanksPage);
    }

    e.preventDefault();
});

continueBtn.onclick = () => {
    document.body.appendChild(form);
    thanksPage.remove();
}