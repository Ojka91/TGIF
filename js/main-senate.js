//------------------------------------------
//creation of dropdown menu for filtering

var states = [];

function dropDownStates(array) {


    for (var x = 0; x < array.length; x++) {
        for (var y = x + 1; y < array.length; y++) {
            if (array[x].state == array[y].state) {

                if (!states.includes(array[x].state)) {
                    states.push(array[x].state);
                }
            }
        }
    }
    states.sort();
    for (var j = 0; j < states.length; j++) {
        var option = document.createElement("option");
        option.setAttribute("value", states[j]);
        var dropMenu = document.getElementById("states");
        option.append(states[j]);
        dropMenu.append(option);
    }

}
dropDownStates(data.results[0].members);

//------------------------------------------




//function that filters

//---------------------------

//engage the function onclick, or on change
document.getElementById("d").addEventListener("click", tableMembers);
document.getElementById("i").addEventListener("click", tableMembers);
document.getElementById("r").addEventListener("click", tableMembers);
document.getElementById("states").addEventListener("change", tableMembers);


//this function filters the table
function filter(member) {

    var d = document.getElementById("d").checked;
    var r = document.getElementById("r").checked;
    var i = document.getElementById("i").checked;
    var array = [d, r, i];
    var select = document.getElementById("states");

    var partyFilter = false;
    var dropdownFilter = false;

    if (member.party == "D" && array[0] == true) {
        partyFilter = true;
    }


    if (member.party == "R" && array[1] == true) {
        partyFilter = true;
    }

    if (member.party == "I" && array[2] == true) {
        partyFilter = true;
    }

    if (array[0] == false && array[1] == false & array[2] == false) {
        partyFilter = true;
    }

    if (member.state == select.value) {
        dropdownFilter = true;

    }

    if (select.value == "All") {
        dropdownFilter = true;
    }

    if (dropdownFilter == true && partyFilter == true) {
        return true;
    }



}



//---------------------!!important!!--------------------

//with this lines it also work. It compares the value of the member.party(D, R, I) with the array string
//    if(d == true){
//        array.push("D")    
//    }    
//    
//    if(r == true){
//        array.push("R");
//    }
//  
//     if(i == true){
//        array.push("I");
//    }
//if (array.includes(member.party) || array.lenght==0){
//return true
//}


//this is a shorter way to write all te comparative if's
//    var array = Array.from(document.querySelectorAll("input[name=party]:checked")).map(cb => cb.value);

//-------------------------------------------------------------






//-------------------------------------------------------
//function to create a table from the data recieved from the gov


function tableMembers() {
    document.getElementById("tbody").innerHTML = "";
    //loops into all members
    for (var x = 0; x < data.results[0].members.length; x++) {

        //declare variables used for creating the table
        var newTr = document.createElement("tr");
        var newTd1 = document.createElement("td");
        var newTd2 = document.createElement("td");
        var newTd3 = document.createElement("td");
        var newTd4 = document.createElement("td");
        var newTd5 = document.createElement("td");

        //declare variables with the data of the table
        var firstName = data.results[0].members[x].first_name;
        var middleName = data.results[0].members[x].middle_name;
        var lastName = data.results[0].members[x].last_name;
        var party = data.results[0].members[x].party;
        var state = data.results[0].members[x].state;
        var seniority = data.results[0].members[x].seniority;
        var votes = data.results[0].members[x].votes_with_party_pct;

        //create a tag <a> with href 
        var a = document.createElement("a");
        a.href = data.results[0].members[x].url;
        a.setAttribute("target", "_blank");

        //append (attatch inside) the things
        //every data has to go inside td. All td inside tr. And all tr inside the body of the table
        if (middleName != null) {
            a.append(lastName + " " + firstName + " " + middleName);
        } else {
            a.append(lastName + " " + firstName);
        }
        newTd1.append(a);

        newTr.append(newTd1);
        newTd2.append(party);
        newTr.append(newTd2);
        newTd3.append(state);
        newTr.append(newTd3);
        newTd4.append(seniority);
        newTr.append(newTd4);
        newTd5.append(votes + "%");
        newTr.append(newTd5);
        var tabBody = document.getElementById("tbody");

        //this send the active tr to filter function

        if (filter(data.results[0].members[x])) {
            tabBody.append(newTr);
            //if "if" it's true, it does what's inside
            //so the function "filter" return true or false 
            //deciding if to include the actual TR to the table
            //or not
        }

    }
}
tableMembers();

