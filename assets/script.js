var submitData = document.querySelector(".submit-data");
var rentSelection = document.querySelector("#rent-button");

submitData.addEventListener("click", function(event) {
    event.preventDefault();
    console.log("SUCCESS!");
})

// function to verify is user selected rent or buy
function checkSelection(event) {
    var element = event.target;

    if (element.matches("form-check-button")) {
        rentSelection.setAttribute("class", "button-active");
    }
    else {
        rentSelection.setAttribute("class", "p-1 form-check-button");

    }
}



// used to validate that user has inputted informatino
function formValidation() {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('click', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
    }

formValidation();
  
  
  