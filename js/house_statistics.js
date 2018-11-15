var statistics = {
    "glance": [{
            "party": [{
                    "name": "Democrats",
                    "number": 0,
                    "percentage_voted": 0,
       },
                {

                    "name": "Republicans",
                    "number": 0,
                    "percentage_voted": 0,
           },
                {
                    "name": "Independents",
                    "number": 0,
                    "percentage_voted": 0,
            }]
        }
    ],

    "leastengaged": [

    ],
    "mostengaged": [

    ],
    "leastloyal": [

    ],
    "mostloyal": [

    ],
}



var member = data.results[0].members;
var senate_republicans = [];
var senate_democrats = [];
var senate_independents = [];
var all_members = [];
var ten_least_engage = [];
var ten_most_engaged = [];
var ten_most_loyal = [];
var ten_least_loyal = []

numberParty();
votesWParty();
least_engaged();
most_engaged();
most_loyal();
least_loyal();
glanceTable();
if (document.location.pathname == "/home/oscar/Desktop/Ubiqum/Module%202/Task_3/Main/house_attendance_statistics.html"){
    

tableMostEngaged();
tableLeastEngaged();
    }

if (document.location.pathname == "/home/oscar/Desktop/Ubiqum/Module%202/Task_3/Main/house_party_loyality_statistics.html" ){
tableMostLoyal();
tableLeastLoyal();
    }



function numberParty() {
    //create array with all members
    for (var q = 0; q < member.length; q++) {
        all_members.push(member[q]);
    }


    //create an array with all the republicans
    for (var x = 0; x < member.length; x++) {
        if (member[x].party == "R") {
            senate_republicans.push(member[x]);
        }
    }
    statistics.glance[0].party[1].number = senate_republicans.length;

    //create an array with all the democrats
    for (var y = 0; y < member.length; y++) {
        if (member[y].party == "D") {
            senate_democrats.push(member[y]);
        }
    }
    statistics.glance[0].party[0].number = senate_democrats.length;


    //create an array with all the independents
    for (var j = 0; j < member.length; j++) {
        if (member[j].party == "I") {
            senate_independents.push(member[j]);
        }
    }
    statistics.glance[0].party[2].number = senate_independents.length;

}


function votesWParty() {

    var votesDem = 0;
    var votesRep = 0;
    var votesInd = 0;

    //average democrats
    for (var x = 0; x < senate_democrats.length; x++) {
        votesDem = votesDem + senate_democrats[x].votes_with_party_pct;
    }

    //average republicans
    for (var y = 0; y < senate_republicans.length; y++) {
        votesRep = votesRep + senate_republicans[y].votes_with_party_pct;
    }

    //average independents
    for (var j = 0; j < senate_independents.length; j++) {
        votesInd = votesInd + senate_independents[j].votes_with_party_pct;
    }

    statistics.glance[0].party[0].percentage_voted = votesDem / senate_democrats.length;
    statistics.glance[0].party[1].percentage_voted = votesRep / senate_republicans.length;
    if (votesInd == 0){
         statistics.glance[0].party[2].percentage_voted = "0";
    }
}
   



//this function creates the way it will sort
function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }

}

//.sort(function(obj1, obj2) {})
// return obj1.age - obj2.age;
//another way to sort it




function least_engaged() {
    //and with this we can call the function to sort it
    all_members.sort(dynamicSort("missed_votes_pct"));
    all_members.reverse();
    for (var x = 0; x < all_members.length / 10; x++) {

        ten_least_engage.push(all_members[x]);
    }
   
    statistics.leastengaged = ten_least_engage;
}

function most_engaged() {
    all_members.sort(dynamicSort("missed_votes_pct"));
    for (var x = 0; x < all_members.length / 10; x++) {

        ten_most_engaged.push(all_members[x]);
    }

    statistics.mostengaged = ten_most_engaged;
}

function most_loyal() {
    all_members.sort(dynamicSort("votes_with_party_pct"));
    all_members.reverse();
    for (var x = 0; x < all_members.length / 10; x++) {

        ten_most_loyal.push(all_members[x]);
    }

    statistics.mostloyal = ten_most_loyal;
}

function least_loyal() {
    all_members.sort(dynamicSort("votes_with_party_pct"));
    for (var x = 0; x < all_members.length / 10; x++) {

        ten_least_loyal.push(all_members[x]);
    }

    statistics.leastloyal = ten_least_loyal;
}



function glanceTable() {
    for (var x = 0; x < statistics.glance[0].party.length; x++) {
        var tr = document.createElement("tr");
        var tbody = document.getElementById("attendance_glance");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        party = statistics.glance[0].party;
        td1.append(party[x].name);
        td2.append(party[x].number);
        td3.append(party[x].percentage_voted + "%");
        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        tbody.append(tr);
    }

}



function tableMostEngaged() {
    for (var x = 0; x < statistics.mostengaged.length; x++) {
        var tr = document.createElement("tr");
        var tbody = document.getElementById("mostengaged");
        member = statistics.mostengaged;
        tr.insertCell().innerHTML = member[x].first_name;
        tr.insertCell().innerHTML = member[x].missed_votes;
        tr.insertCell().innerHTML = member[x].missed_votes_pct + "%";

        tbody.append(tr);

    }
}

function tableLeastEngaged() {
    for (var x = 0; x < statistics.leastengaged.length; x++) {
        var tr = document.createElement("tr");
        var tbody = document.getElementById("leastengaged");
        member = statistics.leastengaged;
        tr.insertCell().innerHTML = member[x].first_name;
        tr.insertCell().innerHTML = member[x].missed_votes;
        tr.insertCell().innerHTML = member[x].missed_votes_pct + "%";
        tbody.append(tr);

    }
    
   
}

function tableMostLoyal() {
    for (var x = 0; x < statistics.mostloyal.length; x++) {
        var tr = document.createElement("tr");
        var tbody = document.getElementById("mostloyal");
        member = statistics.mostloyal;
        tr.insertCell().innerHTML = member[x].first_name;
        tr.insertCell().innerHTML = member[x].total_votes;
        tr.insertCell().innerHTML = member[x].votes_with_party_pct + "%";

        tbody.append(tr);

    }
}

function tableLeastLoyal() {
    for (var x = 0; x < statistics.leastloyal.length; x++) {
        var tr = document.createElement("tr");
        var tbody = document.getElementById("leastloyal");
        member = statistics.leastloyal;
        tr.insertCell().innerHTML = member[x].first_name;
        tr.insertCell().innerHTML = member[x].total_votes;
        tr.insertCell().innerHTML = member[x].votes_with_party_pct + "%";

        tbody.append(tr);

    }

  
    }

