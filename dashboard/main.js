function retrieve_data(data_to_retrieive) {
  var database = firebase.database();
  var userId = "uid" // will be initialized with UID later firebase.auth().currentUser.uid;
  
  
  date_list = []
  value_list = []
  
  firebase.database().ref('/users/' + userId + '/graphs/' + data_to_retrieive).on('value', (snapshot) => {
    
    snapshot.forEach((child) => {
      console.log(child.key, child.val()); 
      date_list.push(child.key)
      value_list.push(child.val())
    });
      
  });

  
  // firebase.database().ref('/users/' + userId + '/graphs/' + "expenses").once('value').then(function(snapshot) {
  // 
  //     snapshot.forEach((child) => {
  //       console.log(child.key, child.val()); 
  //     });
  // 
  //   });
  
    return [date_list, value_list]
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