//to create filters

//---------------------------

//engage the function onclick
document.getElementById("d").addEventListener("click", tableMembers);
document.getElementById("i").addEventListener("click", tableMembers);
document.getElementById("r").addEventListener("click", tableMembers);


//this function filters the table
function filter(member) {

    var d = document.getElementById("d").checked;
    var r = document.getElementById("r").checked;
    var i = document.getElementById("i").checked;
    var array = [d, r, i];


    if (member.party == "D" && array[0] == true) {
        return true;
    }


    if (member.party == "R" && array[1] == true) {
        return true;
    }

    if (member.party == "I" && array[2] == true) {
        return true;
    }

    if (array[0] == false && array[1] == false & array[2] == false) {
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

        //this send the tr it's active to filter function

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


//this function does the same as the filter one, but shorter way
//    var array = Array.from(document.querySelectorAll("input[name=party]:checked")).map(cb => cb.value);
//
//    if(array.includes(member.party) || array.length==0){
//        return true;
//    }

