function CalculateFishSize(inches, frac) {
    //Calculate the size of the fish in decimal inches.
    if (frac == "0/0") {
        var size = inches
    } else {
        var size = inches + eval(frac);
    }
    return size;
}


function CalculateFishSpecies(oldfish, newfish) {
    // Calculate a final fish column to display a single field for fish caught.
    if (newfish == "") {
        return oldfish;
    } else {
        return this.AddNewFish(newfish);
    }
}


function AddNewFish(newfish) {
    // Add the new fish to the FishType table

    //Connect to the worksheet
    var fishtype_tbl = workbook.getSheetByName("Fish Types");

    //Formatting newfish name
    newfish = this.titleCase(newfish);

    //Determining if the fish is duplicated
    for (var i = 2; i <= fishtype_tbl.getMaxRows(); i++) {
        var fish = fishtype_tbl.getRange(i, 1).getValue();
        // Break if the fish is duplicated.
        if (fish.replace(" ", "").toUpperCase() == newfish.replace(" ", "").toUpperCase()) {
            return fish
        }
    }

    // Adding the new fish to the table
    var nrow = fishtype_tbl.getMaxRows() + 1;
    fishtype_tbl.getRange(nrow, 1).setValue(newfish);
    // Return the fish name for the column value
    console.info("Updated Fish Type List and Table with " + newfish);
    return newfish;
}

function UpdateFishSpecies() {
    //Update the fish species in the form drop down box

    //Connect to the worksheet
    workbook = SpreadsheetApp.openById("1rPzupYlmJ6HYQp4-MyJsO7nQyXaDStbQbWK9v8FpwDQ");
    var fishtype_tbl = workbook.getSheetByName("Fish Types");
    //Connect to the form, pages, and fish list
    var form = FormApp.openById("1HN2pWpuCVcWlkT_EsKXVaakXEBIeQHqyP5QpI_uaFg0");
    var newfish_pg = form.getItemById("878400914").asPageBreakItem();
    var fishsize_pg = form.getItemById("1878122600").asPageBreakItem();
    var dropdown = form.getItemById("1246250535").asListItem();

    //Get the current fish species list
    var fish_list = [];
    for (var i = 2; i <= fishtype_tbl.getMaxRows(); i++) {
        var fish = fishtype_tbl.getRange(i, 1).getValue();
        fish_list.push(dropdown.createChoice(fish, fishsize_pg));
    }

    //Adding other to the dropdown list
    fish_list.push(dropdown.createChoice("Other", newfish_pg));

    // populate the drop-down with the array data
    dropdown.setChoices(fish_list);

    console.info("Updated fish dropdown list in fish recorder")
}


function RecorderMain() {
    // Main function for running all functions associated to a new fish recorded

    //Connect to the workbook and sheet
    workbook = SpreadsheetApp.openById("1rPzupYlmJ6HYQp4-MyJsO7nQyXaDStbQbWK9v8FpwDQ");
    var fishrec_tbl = workbook.getSheetByName("Fish Recorder");

    // Start looping through rows of recorded fish
    for (var i = 2; i <= fishrec_tbl.getMaxRows(); i++) {
        // Ensuring row has values
        if (fishrec_tbl.getRange(i, 1) == "") {
            continue;
        } else {
            var inches = fishrec_tbl.getRange(i, 5).getValue();
            var frac = fishrec_tbl.getRange(i, 6).getValue();
            var oldfish = fishrec_tbl.getRange(i, 3).getValue();
            var newfish = fishrec_tbl.getRange(i, 4).getValue();

            //Calculate new fields
            var finalfish = this.CalculateFishSpecies(oldfish, newfish);
            var size = this.CalculateFishSize(inches, frac);

            //Setting values in the worksheet
            fishrec_tbl.getRange(i, 7).setValue(finalfish);
            fishrec_tbl.getRange(i, 8).setValue(size);
        }
    }

    //Update the fish drop down in the recorder form
    this.UpdateFishSpecies();
    console.info("Updated Fish Recorder Table Values");
}