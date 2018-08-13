function getFormIDs() {
    //Get the question IDs for the for
    var form = FormApp.openById("1HN2pWpuCVcWlkT_EsKXVaakXEBIeQHqyP5QpI_uaFg0");

    // Looping through the ids and printing to log
    var items = form.getItems();
    for (var i in items) {
        Logger.log(items[i].getTitle() + ': ' + items[i].getId());
    }
}


function titleCase(str) {
    //Convert a string to title case 
    return str.toLowerCase().split(' ').map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
}


function unlist(x){
    //un-nest arrays from the workbook
    var result = []
    for (i = 0; i < x.length; i++){
        result[i] = x[i][0]
    }
    return result
}


function WriteRanking(prize, df) {
    //Write the rankings and values to the ranining worksheet.
    //Will determine where to write be searching for prize string

    //Determining the row of the prize title
    var prize_titles = this.unlist(rank_tbl.getRange("A:A").getValues());
    var row = prize_titles.indexOf(prize) + 2;

    //formatting the data
    var df_slice = df.slice(0,10);
    var df_height = row + 9;
    var df_range = "B" + row + ":C" + df_height;

    //saving to workbook
    rank_tbl.getRange(df_range).setValues(df_slice);
}