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




function displayEmployees(employees) {
    document.getElementById("numEmployees").innerText = employees.length;
    document.getElementById("memberSectionD").innerHTML = "";
    employees.forEach((em) =>  {
        var name = em.name;
        var email = em.email;
        var phone = em.phone;
        phone = "("+phone.substring(0, 3)+") "+phone.substring(3,6)+"-"+phone.substring(6);
        document.getElementById("memberSectionD").innerHTML +=
            "<div class=\"memberSection\">\n" +
            "<p>" +
            "<span><strong>"+name+"&emsp;</strong></span>" +
            "<span><strong>" + phone + "</strong></span>" +
            "<br>" +
            email +
            "</p></div>";
    });
}

function displayLedger(ledgers) {

    function compareEm(a,b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        else if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        else {
            var aA = {
                m: parseInt(a.date.substring(0, a.date.indexOf("-"))),
                d: parseInt(a.date.substring(a.date.indexOf("-") + 1, a.date.indexOf("-", a.date.indexOf("-") + 1))),
                y: parseInt(a.date.substring(a.date.lastIndexOf("-") + 1))
            };
            var bB = {
                m: parseInt(b.date.substring(0, b.date.indexOf("-"))),
                d: parseInt(b.date.substring(b.date.indexOf("-") + 1, b.date.indexOf("-", b.date.indexOf("-") + 1))),
                y: parseInt(b.date.substring(b.date.lastIndexOf("-") + 1))
            };

            if (aA.y > bB.y) return 1;
            else if (bB.y > aA.y) return -1;
            else {
                if (aA.m > bB.m) return 1;
                else if (bB.m > aA.m) return -1;
                else {
                    if (aA.d > bB.d) return 1;
                    else if (bB.d > aA.d) return -1;
                    else return 0;
                }
            }
        }
    }

    ledgers.sort(compareEm);

    document.getElementById("ledgerDisplay").innerHTML = "";

    var cAcc = "";
    var totalC = 0;
    var totalD = 0;
    var sectionS = "";

    ledgers.forEach((le) =>{
        if (cAcc.toLowerCase() != le.name.toLowerCase()) {
            if (cAcc != "") {
                sectionS += "" +
                    "<div class=\"ledgerTotal\">\n" +
                    "<div class=\"row\">\n" +
                    "<div class=\"col-md-4 col-xs-4\">\n" +
                    "<p>"+totalC+"</p>\n" +
                    "</div>\n" +
                    "<div class=\"col-md-4 col-xs-4\">\n" +
                    "<p>"+totalD+"</p>\n" +
                    "</div>\n" +
                    "<div class=\"col-md-4 col-xs-4\">\n" +
                    "<p><strong>Total</strong></p>\n" +
                    "</div>\n" +
                    "</div>\n" +
                    "</div>" +
                    "</div>";
                totalC = 0; totalD = 0;
            }

            sectionS += "" +
                "<div class='ledgerSection'>"+
                "<div class='ledgerTitle'>"+
                "<h1>"+le.name+"</h1>"+
                "</div>"+
                "<div class='ledgerNum row'>" +
                "<div class=\"col-md-4 col-xs-4 text-center\">" +
                "<p>Credit</p>" +
                "</div>" +
                "<div class=\"col-md-4 col-xs-4 text-center\">" +
                "<p>Debit</p>" +
                "</div>"+
                "<div class=\"col-md-4 col-xs-4 text-center\">" +
                "<p>Date</p></div></div>";

            cAcc = le.name;
        }

        var ld = getDate(le);
        var leDate = ld.m + "-" + ld.d + "-"+ld.y;
        sectionS += "" +
            "<div class=\"ledgerData\">\n" +
            "<div class=\"ledgerValues row\">\n" +
            " <div class=\"col-md-4 col-xs-4\">\n" +
            "<p>"+le.credit+"</p>\n" +
            "</div>\n" +
            "<div class=\"col-md-4 col-xs-4\">\n" +
            "<p>"+le.debit+"</p>\n" +
            "</div>\n" +
            "<div class=\"col-md-4 col-xs-4\">\n" +
            "<p>"+leDate+"</p>\n" +
            "</div></div></div>";

    });
    document.getElementById("ledgerDisplay").innerHTML += sectionS;

}


function getDate(dString) {
     return {
        m:parseInt(dString.date.substring(0, dString.date.indexOf("-"))),
        d: parseInt(dString.date.substring(dString.date.indexOf("-")+1,
            dString.date.indexOf("-",dString.date.indexOf("-")+1))),
        y:parseInt(dString.date.substring(dString.date.lastIndexOf("-")+1))
    };
}

function compareYears(a,b) {
    var aA = getDate(a.date);
    var bB = getDate(b.date);


    if (aA.y > bB.y) return 1;
    else if (bB.y > aA.y) return -1;
    else {
        if (aA.m > bB.m) return 1;
        else if (bB.m > aA.m) return -1;
        else {
            if (aA.d > bB.d) return 1;
            else if (bB.d > aA.d) return -1;
            else return 0;
        }
    }

}

var em = new Employee("j@", "john", "4085154321");
displayEmployees([em, em]);

var l1 = new Ledger_Item("B", "01-07-19", 100, 1);
var l2 = new Ledger_Item("b", "1-7-19", 1, 1);
var l3 = new Ledger_Item("c", "1-3-19", 0, 1);


displayLedger([l1, l2, l1, l3]);