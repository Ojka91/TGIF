//function to create a table from the data recieved from the gov

function houseTable() {
    
    //loops into all members
    for (var x = 0; x < data.results[0].members.length; x++) {
        
         //declare variables used for creating the table
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var td4 = document.createElement("td");
        var td5 = document.createElement("td");
        var tr = document.createElement("tr");
        var tbody = document.getElementById("tbody");
        var a = document.createElement("a");
        a.href=data.results[0].members[x].url;
        a.setAttribute("target", "_blank");

         //declare variables with the data of the table
        var firstName = data.results[0].members[x].first_name;
        var middleName = data.results[0].members[x].middle_name;
        var lastName = data.results[0].members[x].last_name;
        var party = data.results[0].members[x].party;
        var state = data.results[0].members[x].state;
        var seniority = data.results[0].members[x].seniority;
        var votes = data.results[0].members[x].total_votes;

        
         //append (attatch inside) the things
        //every data has to go inside td. All td inside tr. And all tr inside the body of the table
        if (middleName != null) {
            a.append(lastName + " " + firstName + " " + middleName);
        } else {
            a.append(lastName + " " + firstName);

        }
        td1.append(a);
        td2.append(party);
        td3.append(state);
        td4.append(seniority);
        td5.append(votes);
        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        tr.append(td4);
        tr.append(td5);
        tbody.append(tr);

    }
}
houseTable();
