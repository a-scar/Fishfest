function UpdateRegistrantDropDown() {
    //Update the registrant drop down list

    //Connect to the workbook and sheet
    var workbook = SpreadsheetApp.openById("1rPzupYlmJ6HYQp4-MyJsO7nQyXaDStbQbWK9v8FpwDQ");
    var reg_tbl = workbook.getSheetByName("Registration");

    // call your form and connect to the drop-down item
    var form = FormApp.openById("1HN2pWpuCVcWlkT_EsKXVaakXEBIeQHqyP5QpI_uaFg0");
    var namesList = form.getItemById("1012928167").asListItem();

    //Looping through rows
    RegID_list = [];
    for (var i = 2; i <= reg_tbl.getMaxRows(); i++) {
        // Ensuring row has values
        if (reg_tbl.getRange(i, 1) == "") {
            continue;
        } else {
            RegID_list.push(reg_tbl.getRange(i, 7).getValue());
        }
    }

    // populate the drop-down with the array data
    namesList.setChoiceValues(RegID_list);
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