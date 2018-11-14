var statistics = {
    "number_rep": 0,
    "number_dem": 0,
    "number_ind": 0,
    "percentage_voted_rep": 0,
    "percentage_voted_dem": 0,
    "percentage_voted_ind": 0,
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
var ten_most_votes = [];
var ten_less_votes = []

numberParty();
votesWParty();
least_engaged();
most_engaged();
most_loyal();




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
    statistics.number_rep = senate_republicans.length;

    //create an array with all the democrats
    for (var y = 0; y < member.length; y++) {
        if (member[y].party == "D") {
            senate_democrats.push(member[y]);
        }
    }
    statistics.number_dem = senate_democrats.length;


    //create an array with all the independents
    for (var j = 0; j < member.length; j++) {
        if (member[j].party == "I") {
            senate_independents.push(member[j]);
        }
    }
    statistics.number_ind = senate_independents.length;

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

    statistics.percentage_voted_dem = votesDem / senate_democrats.length;
    statistics.percentage_voted_rep = votesRep / senate_republicans.length;
    statistics.percentage_voted_ind = votesInd / senate_independents.length;
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


//and with this we can call the function to sort it

//console.log(all_members);

function least_engaged() {
    all_members.sort(dynamicSort("missed_votes"));
    all_members.reverse();
    for (var x = 0; x < all_members.length / 10; x++) {

        ten_least_engage.push(all_members[x]);
    }

    statistics.leastengaged = ten_least_engage;
}

function most_engaged(){
       all_members.sort(dynamicSort("missed_votes"));
    for (var x = 0; x < all_members.length / 10; x++) {

        ten_most_engaged.push(all_members[x]);
    }

    statistics.mostengaged = ten_most_engaged;
}

function most_loyal(){
    all_members.sort(dynamicSort("total_votes"));
    console.log(all_members);
    for (var x = 0; x < all_members.length / 10; x++) {

        ten_most_votes.push(all_members[x]);
    }

    statistics.mostloyal = ten_most_votes;
}
    


