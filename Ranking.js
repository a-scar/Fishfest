

function RankYoungRegistants() {
    //Rank the youngest registrants
    result = [];
    for (var i = 0; i <= names.length; i++) {
        result.push([birthdays[i], names[i]]);
    }
    result.sort();
    this.WriteRanking(prize, df)
}


function RankingMain() {
    //Call rankings calculation functions

    //Workbook connection
    workbook = SpreadsheetApp.openById("1rPzupYlmJ6HYQp4-MyJsO7nQyXaDStbQbWK9v8FpwDQ");
    rank_tbl = workbook.getSheetByName("Ranking");
    reg_tbl = workbook.getSheetByName("Registration");
    fishrec_tbl = workbook.getSheetByName("Fish Recorder");


    //get a list of the fish, names, sizes, ages, birthdays, and catch times
    catchnames = this.unlist(fishtbl.getRange("B2:B").getValues());
    catchsizes = this.unlist(fishtbl.getRange("G2:G").getValues());
    catchtimes = this.unlist(fishtbl.getRange("A2:A").getValues());
    names = this.unlist(regtbl.getRange("B2:B").getValues());
    ages = this.unlist(regtbl.getRange("E2:E").getValues());
    agegroups = this.unlist(regtbl.getRange("F2:F").getValues());
    birthdays = this.unlist(regtbl.getRange("C2:C").getValues());

}