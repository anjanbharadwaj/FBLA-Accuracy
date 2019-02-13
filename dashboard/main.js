function retrieve_data() {
  var database = firebase.database();
  var userId = "uid" // will be initialized with UID later firebase.auth().currentUser.uid;
  
  firebase.database().ref('/users/' + userId + '/graphs/' + "expenses").once('value').then(function(snapshot) {
    
    
    var date = (snapshot.val() && snapshot.val().date);
    
    snapshot.once('value').then(function(snapshot_2)) {
      
      var value = (snapshot_2.val() && snapshot_2.val().value);

      console.log(date + " " + value)
    }
    
  });
  
  return 0
}


function toggleDisplay(statID, b) {
    //statID is the id of the div, used to toggle between graph and table
    document.getElementById(statID+b).classList.add("buttonActive");
    document.getElementById(statID+((b=='t')?'g':'t')).classList.remove("buttonActive");

    if (b=='t') {
        document.getElementById(statID+"graph").style.display="none";
        document.getElementById(statID+"table").style.display="block";
    } else {
        document.getElementById(statID+"table").style.display="none";
        document.getElementById(statID+"graph").style.display="block";
    }
}