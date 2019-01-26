firebase.auth().signOut().then(function() {
  console.log("signed out");
}).catch(function(error) {
  // An error happened.
});

document.getElementById("sign_in_button").onClick(function(){
  
  var username = document.getElementById("username_input").value;
  var password = document.getElementById("password_input").value;
  
  login(username, password)
  
});



document.getElementById("create_user_button").onClick(function(){
  
  var username = document.getElementById("username_input_signup").value;
  var password = document.getElementById("password_input_signup").value;
  
  signUp(username, password)
  
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    window.location.href = "index.html";
  } else {

  }
});

function login(username, password){
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode + " " + errorMessage);
  });

}

function signUp(username, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode + " " + errorMessage);
  });
}
