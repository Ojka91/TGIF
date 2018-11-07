//function to create a table from the data recieved from the gov


function tableMembers(){
    
//loops into all members
    for (var x =0; x < data.results[0].members.length; x++){
        
    //declare variables used for creating the table
        var newTr=document.createElement("tr");
        var newTd1=document.createElement("td");
        var newTd2=document.createElement("td");
        var newTd3=document.createElement("td");
        var newTd4=document.createElement("td");
        var newTd5=document.createElement("td");
        
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
        a.href=data.results[0].members[x].url;
        a.setAttribute("target", "_blank");
        
    //append (attatch inside) the things
        //every data has to go inside td. All td inside tr. And all tr inside the body of the table
        if (middleName != null){
        a.append(lastName + " " + firstName + " " + middleName);
            }
        else {
                a.append(lastName + " " +firstName);
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
        tabBody.append(newTr);   
    }       
}
tableMembers();

