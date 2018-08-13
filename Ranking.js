function RankYoungRegistants() {
    //Rank the youngest registrants
    result = [];
    for (var i = 0; i <= birthdays.length; i++) {
        result.push([birthdays[i], regid[i]]);
    }
    
    //Writing ranking to sheet
    result.sort();
    this.WriteRanking("Youngest Participant", result);
    
    console.info("Ranked youngest participants");
}


function RankFirstLastCatch() {
    //Rank the first and last fishes caught
    result = [];
    for (var i = 0; i <= cathtimes.length; i++) {
        result.push([catchtimes[i], catchnames[i]]);
    }

    // Writing first fishes to sheet
    result.sort();
    this.WriteRanking("First Fish Caught", result);
    
    //Writing last fishes to sheet
    result.reverse();
    this.WriteRanking("Last Fish Caught", result);
    
    console.info("Ranked first and last catches");
}


function RankLargestSmallestFish() {
    //Rank the largest and smalles fish caught for each age group.
    minor.sort(function(a, b){return b-a});
    adult.sort(function(a, b){return b-a});
    senior.sort(function(a, b){return b-a});
    this.WriteRanking("Largest Fish - Minor", minor);
    this.WriteRanking("Largest Fish - Adult", adult);
    this.WriteRanking("Largest Fish - Senior", senior);

    //Combining all groups together to calculater overall smallest
    var smallest = minor.concat(adult);
    smallest = smallest.concat(senior);
    smallest.sort();
    this.WriteRanking("Smallest Fish", smallest);

    console.info("Ranked largest and smallest fish")
}

function RankAngler(){
    //Rank the best anglers for each age group

    //Looping through names and counting the number of catches each one has
    minor_angler = [];
    adult_angler = [];
    senior_angler = [];
    for (var i = 0; i <= regid.length; i++) {
        var fishcount = 0;
        for (var n = 0; n <= catchnames; n++) {
            if (catchnames[n] == regid[i]) {fishcount++;}
        }
        if (agegroups[i] == "Minor") {
            minor_angler.push([regid[i], fishcount]);
        } else if (agegroup[index] == "Adult") {
            adult_angler.push([regid[i], fishcount]);
        } else {
            adult_angler.push([regid[i], fishcount]);
        }
    }
    //Sorting the anglers for each age group
    minor_angler.sort().reverse();
    adult_angler.sort().reverse();
    senior_angler.sort().reverse();

    //Write to ranking sheet for each age group
    this.WriteRanking("Best Angler - Minor", minor_angler);
    this.WriteRanking("Best Angler - Minor", adult_angler);
    this.WriteRanking("Best Angler - Minor", senior_angler);

    console.log("Ranks the best angler");
  }




function RankingMain() {
    //Call rankings calculation functions

    //Workbook connection
    workbook = SpreadsheetApp.openById("1rPzupYlmJ6HYQp4-MyJsO7nQyXaDStbQbWK9v8FpwDQ");
    rank_tbl = workbook.getSheetByName("Ranking");
    reg_tbl = workbook.getSheetByName("Registration");
    fishrec_tbl = workbook.getSheetByName("Fish Recorder");


    //get a list of the fish, names, sizes, ages, birthdays, and catch times
    catchnames = this.unlist(fishrec_tbl.getRange("B2:B").getValues());
    catchsizes = this.unlist(fishrec_tbl.getRange("G2:G").getValues());
    catchtimes = this.unlist(fishrec_tbl.getRange("A2:A").getValues());
    names = this.unlist(reg_tbl.getRange("B2:B").getValues());
    ages = this.unlist(reg_tbl.getRange("E2:E").getValues());
    agegroups = this.unlist(reg_tbl.getRange("F2:F").getValues());
    birthdays = this.unlist(reg_tbl.getRange("C2:C").getValues());
    regid = this.unlist(reg_tbl.getRange("G2:G").getValues());


    //Sepeating catches by age group
    minor = [];
    adult = [];
    senior = [];
    for ( var i = 0; i <= catchnames.length; i++) {
        var index = regid.indexOf(catchnames[i]);
        if (agegroups[index] == "Minor") {
            minor.push([catchsizes[i], catchnamse[i]]);
        } else if (agegroup[index] == "Adult") {
            adult.push([catchsizes[i], catchnamse[i]]);
        } else {
            senior.push([catchsizes[i], catchnamse[i]]);
        }
    }


    //Run the ranking functions
    this.RankYoungRegistants();
    this.RankFirstLastCatch();
    this.RankLargestSmallestFish();
    this.RankAngler();
}