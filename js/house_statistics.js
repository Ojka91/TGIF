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

                     },
                {

                    "name": "Total",
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


var member;
var senate_republicans = [];
var senate_democrats = [];
var senate_independents = [];
var all_members = [];
var ten_least_engage = [];
var ten_most_engaged = [];
var ten_most_loyal = [];
var ten_least_loyal = [];



fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
        method: "GET",
        headers: {
            'X-API-Key': 'BBuS73wuSHXM16lEeZTuT03wv2m2XivgyFzaMapt'
        }
    }).then(function (response) {
        if (response.ok) {


            return response.json()
        }
        throw new Error(response.statusText);
    })
    .then(function (json) {
        data = json;
        member = data.results[0].members;
        init();


    }).catch(function (error) {

        console.log("Request failed " + error.message);
    });





function init() {
            document.getElementById("spinner").style.display = 'none';
            numberParty();
            votesWParty();
            least_engaged();
            most_engaged();
            most_loyal();
            least_loyal();
            glanceTable();
            if (window.location.pathname == "/house_attendance_statistics.html") {


                tableEngaged("mostengaged");
                tableEngaged("leastengaged");
            }

            if (window.location.pathname == "/house_party_loyality_statistics.html") {
                tableLoyal("mostloyal");
                tableLoyal("leastloyal");
            }

        }




//creation of the arrays and data
function numberParty() {

    for (var x = 0; x < member.length; x++) {
        all_members.push(member[x]);
        if (member[x].party == "R") {
            senate_republicans.push(member[x]);
        }

        if (member[x].party == "D") {
            senate_democrats.push(member[x]);
        }

        if (member[x].party == "I") {
            senate_independents.push(member[x]);
        }
    }
    statistics.glance[0].party[3].number = all_members.length;
    statistics.glance[0].party[1].number = senate_republicans.length;
    statistics.glance[0].party[0].number = senate_democrats.length;
    statistics.glance[0].party[2].number = senate_independents.length;

}


function votesWParty() {

    var votesDem = 0;
    var votesRep = 0;
    var votesInd = 0;
    var votesTotal = 0;

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

    //average total
    for (var h = 0; h < all_members.length; h++) {
        votesTotal = votesTotal + all_members[h].votes_with_party_pct;
    }

    statistics.glance[0].party[0].percentage_voted = votesDem / senate_democrats.length;
    statistics.glance[0].party[1].percentage_voted = votesRep / senate_republicans.length;
    if (votesInd == 0) {
        statistics.glance[0].party[2].percentage_voted = "0";
    }

    statistics.glance[0].party[3].percentage_voted = votesTotal / all_members.length;

    statistics.glance[0].party[0].percentage_voted = statistics.glance[0].party[0].percentage_voted.toFixed(2);
    statistics.glance[0].party[1].percentage_voted = statistics.glance[0].party[1].percentage_voted.toFixed(2);
    statistics.glance[0].party[3].percentage_voted = statistics.glance[0].party[3].percentage_voted.toFixed(2);

}




//this function creates the way it will sort
function dynamicSort(property) {
    var sortOrder = 1;

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
    for (var x = 0; x < all_members.length; x++) {

        if (ten_least_engage.length < all_members.length / 10) {

            ten_least_engage.push(all_members[x]);
        } else if (ten_least_engage[ten_least_engage.length - 1].missed_votes_pct == all_members[x].missed_votes_pct) {
            ten_least_engage.push(all_members[x]);
        } else {
            break;
        }
    }

    statistics.leastengaged = ten_least_engage;
}

function most_engaged() {
    all_members.sort(dynamicSort("missed_votes_pct"));
    for (var x = 0; x < all_members.length; x++) {

        if (ten_most_engaged.length < all_members.length / 10) {

            ten_most_engaged.push(all_members[x]);
        } else if (ten_most_engaged[ten_most_engaged.length - 1].missed_votes_pct == all_members[x].missed_votes_pct) {
            ten_most_engaged.push(all_members[x]);
        } else {
            break;
        }
    }

    statistics.mostengaged = ten_most_engaged;
}

function most_loyal() {
    all_members.sort(dynamicSort("votes_with_party_pct"));
    all_members.reverse();
    for (var x = 0; x < all_members.length; x++) {

        if (ten_most_loyal.length < all_members.length / 10) {

            ten_most_loyal.push(all_members[x]);
        } else if (ten_most_loyal[ten_most_loyal.length - 1].missed_votes_pct == all_members[x].missed_votes_pct) {
            ten_most_loyal.push(all_members[x]);
        } else {
            break;
        }
    }

    statistics.mostloyal = ten_most_loyal;
}

function least_loyal() {
    all_members.sort(dynamicSort("votes_with_party_pct"));
    for (var x = 0; x < all_members.length; x++) {

        if (ten_least_loyal.length < all_members.length / 10) {

            ten_least_loyal.push(all_members[x]);
        } else if (ten_least_loyal[ten_least_loyal.length - 1].missed_votes_pct == all_members[x].missed_votes_pct) {
            ten_least_loyal.push(all_members[x]);
        } else {
            break;
        }
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





function tableEngaged(table) {
    for (var x = 0; x < statistics[table].length; x++) {
        var tr = document.createElement("tr");
        var tbody = document.getElementById(table);
        member = statistics[table];
        tr.insertCell().innerHTML = member[x].first_name;
        tr.insertCell().innerHTML = member[x].missed_votes;
        tr.insertCell().innerHTML = member[x].missed_votes_pct + "%";
        tbody.append(tr);

    }

}

function tableLoyal(table) {
    for (var x = 0; x < statistics[table].length; x++) {
        var tr = document.createElement("tr");
        var tbody = document.getElementById(table);
        member = statistics[table];
        tr.insertCell().innerHTML = member[x].first_name;
        tr.insertCell().innerHTML = member[x].total_votes;
        tr.insertCell().innerHTML = member[x].votes_with_party_pct + "%";

        tbody.append(tr);

    }
}
