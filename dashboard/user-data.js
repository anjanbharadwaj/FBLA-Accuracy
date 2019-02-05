if (firebase.auth().currentUser) {
  console.log(firebase.auth().currentUser.email);
}


function transferUser(user, callback) {
  console.log(user.uid);
  callback && callback();
  console.log(user.uid);
}
