//handling form submission, jQuery
//without react, anything frontend related that is not in html or cs, will have to be in js
//js usually handles form submission and passes it to backend, or interacts with backend

//run that function when signup form is submitted
$("form[name=signup_form").submit(function(e) {

    var $form = $(this);
    //error DOM element
    var $error = $form.find(".error");
    //gets all the fields from the form to send to the backend
    var data = $form.serialize();

    //ajax call
    $.ajax({
        url: "/user/signup",
        type: "POST",
        data: data,
        dataType: "json",
        success: function(resp) {
            window.location.href = "/dashboard/";
        },
        error: function(resp) {
            console.log(resp)
            $error.text(resp.responseJSON.error).removeClass("error--hidden")
        }
    });

    //prevent default behavior which is submitting to the page itself and refreshing
    e.preventDefault();
});

//run that function when login form is submitted
$("form[name=login_form").submit(function(e) {

    var $form = $(this);
    //error DOM element
    var $error = $form.find(".error");
    //gets all the fields from the form to send to the backend
    var data = $form.serialize();

    //ajax call
    $.ajax({
        url: "/user/login",
        type: "POST",
        data: data,
        dataType: "json",
        success: function(resp) {
            window.location.href = "/dashboard/";
        },
        error: function(resp) {
            console.log(resp)
            $error.text(resp.responseJSON.error).removeClass("error--hidden")
        }
    });

    //prevent default behavior which is submitting to the page itself and refreshing
    e.preventDefault();
});