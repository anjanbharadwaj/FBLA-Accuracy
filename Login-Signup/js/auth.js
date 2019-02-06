
firebase.auth().signOut().then(function() {
  console.log("signed out");
}).catch(function(error) {
  // An error happened.
});


if (firebase.auth().currentUser) {
  console.log(firebase.auth().currentUser.email);
}


if (document.getElementById("sign_in_button") != null) {
  document.getElementById("sign_in_button").onclick =  function(){
    var username = document.getElementById("username_input").value;
    var password = document.getElementById("password_input").value;

    login(username, password)

    console.log("loggin in");

  };
}

if (document.getElementById("create_user_button") != null) {

  document.getElementById("create_user_button").onclick = function(){

    var username = document.getElementById("username_input_signup").value;
    var password = document.getElementById("password_input_signup").value;

    signUp(username, password);
  };
}


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    transferUser && transferUser(user, function() {
      window.location.href = "../dashboard/index.html";
    });
  } else {

  }
});

function login(username, password){
  firebase.auth().signInWithEmailAndPassword(username, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode + " " + errorMessage);
  });

}

function signUp(username, password) {
  firebase.auth().createUserWithEmailAndPassword(username, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode + " " + errorMessage);
  });
}
