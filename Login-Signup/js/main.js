
function showForgotPass() {
    const element = document.getElementById("forgotPassSection");
    document.getElementById("fg").style.visibility="visible";
    element.style.visibility = "visible";
    element.classList.remove('bounceOutDown');
    element.classList.add('bounceInUp');
}

function hideForgotPass() {
    const element = document.getElementById("forgotPassSection");

    function handleAnimationEnd() {
        document.getElementById("fg").style.visibility="collapse";
        element.style.visibility="collapse";
        document.getElementById("emailFG").value = "";
        element.removeEventListener('animationend', handleAnimationEnd);
    }
    element.addEventListener('animationend', handleAnimationEnd);

    element.classList.remove('bounceInUp');
    element.classList.add('bounceOutDown');

}

function resetPass() {
    var email = document.getElementById("emailFG").value;
    firebase.auth().sendPasswordResetEmail(email).catch(function(error) {
        console.log(error.message);
    });
}


/*
(function ($) {
    "use strict";


    /*==================================================================
    [ Validate ]
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }



})(jQuery);

*/
