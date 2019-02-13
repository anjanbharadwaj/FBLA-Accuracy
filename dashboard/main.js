class GraphData {
  constructor(date, value) {
    this.date = date;
    this.value = value;
  }
}

class Employee {
  constructor(email, name, phone) {
    this.email = email
    this.name = name
    this.phone = phone
  }
}

class Ledger_Item {
  constructor(name, date, credit, debit) {
    this.name = name
    this.date = date 
    this.credit = credit  
    this.debit = debit  
  }
}


function retrieve_ledger() {
  var database = firebase.database();
  
  var userId = "uid"
  
  ledger_list = []
  
  database.ref('/users/' + userId + '/table/ledger/').on('value', (snapshot) => {
    
    snapshot.forEach((child) => {
      console.log(child.key)
      console.log(child.val()['credit'])
            
      ledger_list.push(new Ledger_Item(child.val()['name'], child.val()['date'], child.val()['credit'], child.val()['debit']))
    })
    
  });
  
  return ledger_list
}

function retrieve_employees() {
  var database = firebase.database();
  
  var userId = "uid"
  
  employee_list = []
  
  database.ref('/users/' + userId + '/list/employees/').on('value', (snapshot) => {
    
    snapshot.forEach((child) => {
      console.log(child.key)
      console.log(child.val()['email'])
            
      employee_list.push(new Employee(child.val()['email'], child.val()['name'], child.val()['phone']))
    })
    
  });
  
  return employee_list
}

function retrieve_graph_data(data_to_retrieive) {
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
  
  return new GraphData(date_list, value_list)
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