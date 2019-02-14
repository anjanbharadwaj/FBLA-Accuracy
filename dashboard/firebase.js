document.getElementById("button_asset").onclick = function() {
    var asset_value = document.getElementById("asset_input").value

    //get the current date
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    var full_date = mm + "-" + dd + "-" + yyyy
    var userId = "uid"

    //push to firebase
    firebase.database().ref('users/' + userId + '/graphs/assets/' + full_date).set({
        value: asset_value
    });

}

document.getElementById("button_expense").onclick = function() {
    var asset_value = document.getElementById("expense_input").value

    //get the current date
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    var full_date = mm + "-" + dd + "-" + yyyy
    var userId = "uid"

    //push to firebase
    firebase.database().ref('users/' + userId + '/graphs/expenses/' + full_date).set({
        value: asset_value
    });

}

document.getElementById("button_liability").onclick = function() {
    var asset_value = document.getElementById("liability_input").value

    //get the current date
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    var full_date = mm + "-" + dd + "-" + yyyy
    var userId = "uid"

    //push to firebase
    firebase.database().ref('users/' + userId + '/graphs/liabilities/' + full_date).set({
        value: asset_value
    });

}

document.getElementById("addLedgerB").onclick = function() {
    var account_name = document.getElementById("accName").value
    var credit = document.getElementById("credit").value
    var debit = document.getElementById("debit").value

    //get the current date
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    var full_date = mm + "-" + dd + "-" + yyyy
    var userId = "uid"

    //push to firebase
    firebase.database().ref('users/' + userId + '/table/ledger/' + full_date).set({
        credit: credit,
        date: full_date,
        debit: debit,
        name: account_name
    });

}

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