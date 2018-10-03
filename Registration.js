function CalculateAge(birthday) {
    //Calculate the age of the recipient and the age group.

    //Getting todays numbers
    let today = new Date();
    today.year = today.getFullYear();
    today.month = today.getMonth() + 1;
    today.day = today.getDate();

    //Calculating birthday numbers 

    birthday.year = birthday.getFullYear();
    birthday.month = birthday.getMonth() + 1;
    birthday.day = birthday.getDate();


    //Calculate the age based on the birthday and set value in worksheet
    if (birthday.month >= today.month && birthday.day >= today.day) {
        const age = today.year - birthday.year;
    } else {
        const age = today.year - birthday.year - 1
    }

    return age;
}


function CalculateAgeGroup(age) {
    //Calculate the age group of the participant
    if (age <= 14) {
        let age_group = "Minor";
    } else if (age > 14 && age < 55) {
        let age_group = "Adult";
    } else {
        let age_group = "Senior";
    }

    return age_group;
}


function CalculateRegID(name, birthday) {
    // Create a new ID for the registrant which contains the Name and birthday

    //Formatting the name capitalize first letters and remove spaces
    let reg_name = this.titleCase(name);

    let reg_name = reg_name.replace(" ", "");

    //Formatting the birthday to be yyyymmdd
    let reg_bdate = String(birthday.getFullYear()) + "." +
        String(birthday.getMonth() + 1) + "." +
        String(birthday.getDate());

    // Concatenating the name and date
    return reg_name + "_" + reg_bdate
}


function UpdateRegistrantDropDown(RegID_list) {
    //Update the drop down list in the Fish Recorder

    // call your form and connect to the drop-down item
    const form = FormApp.openById("1HN2pWpuCVcWlkT_EsKXVaakXEBIeQHqyP5QpI_uaFg0");
    let namesList = form.getItemById("1012928167").asListItem();

    // populate the drop-down with the array data
    namesList.setChoiceValues(RegID_list);
}


function RegistrationMain() {
    //Loop through the registration list and run all associated functions.

    //Connect to the workbook and sheet
    const workbook = SpreadsheetApp.openById("1rPzupYlmJ6HYQp4-MyJsO7nQyXaDStbQbWK9v8FpwDQ");
    let reg_tbl = workbook.getSheetByName("Registration");

    //Creating a blank list to populate with reg_id values
    RegID_list = [];

    //Looping through rows
    for (let i = 2; i <= reg_tbl.getMaxRows(); i++) {
        // Ensuring row has values
        if (reg_tbl.getRange(i, 1) == "") {
            continue;
        } else {
            let name = reg_tbl.getRange(i, 2).getValue();
            let birthday = reg_tbl.getRange(i, 3).getValue();

            //Calcualte new fields
            const age = this.CalculateAge(birthday);
            const age_group = this.CalculateAgeGroup(age);
            const reg_id = this.CalculateRegID(name, birthday);

            //setting the values in the sheet
            reg_tbl.getRange(i, 5).setValue(age);
            reg_tbl.getRange(i, 6).setValue(age_group);
            reg_tbl.getRange(i, 7).setValue(reg_id);

            // Retaining reg_ids in a list
            RegID_list.push(reg_id);
        }
    }
    console.info("Updated Registration Table Values");

    //Update the names in the Fish Recorder Form
    this.UpdateRegistrantDropDown(RegID_list);
    console.info("Updated Fish Recorder Registrant Names");
}
