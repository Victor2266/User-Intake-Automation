var SpeadSheet_URL = "https://docs.google.com/spreadsheets/d/your google sheets URL that is linked to your google form";
var SheetName = "Form Responses 1";

//Column Titles [Required] these are the titles of the columns in the google sheets that is linked above:
var column_First_Name = "First Name";
var column_Last_Name = "Last Name";
var domain_name = "@company_domain.ca";
//Column Titles [Not Required]:
var column_Recovery_Email = "Recovery Email";
var column_Work_Secondary_Email	= "Work Secondary Email";
var column_Recovery_Phone = "Recovery Phone [MUST BE IN THE E.164 FORMAT]";
var column_Mobile_Phone = "Recovery Phone [MUST BE IN THE E.164 FORMAT]";
var column_Home_Address = "Address";
var column_Home_PostalCode = "Postal Code";

//Unused Column Variables:
//var column_Password = 
//var column_Password_Hash_Function = 
//var Org_Unit_Path <------------------- Default set to /
//var New Primary Email [UPLOAD ONLY]	
//var Home Secondary Email
//var Work Phone	
//var Home Phone	
//var Work Address
//var Employee ID
//var Employee Type
//var Employee Title
//var Manager Email
//var Department
//var Cost Center
//var Building ID
//var Floor Name
//var Floor Section
//var Change Password at Next Sign-In <------------------- Default set to true
//var New Status [UPLOAD ONLY]
//var Advanced Protection Program enrollment

var url = SpeadSheet_URL;
var ss = SpreadsheetApp.openByUrl(url);
var ws = ss.getSheetByName(SheetName);

function getRangeData(rangeName){

  var value = ws.getRange(rangeName).getValues();
  Logger.log("Got Data from: " + rangeName + " = " + value);

  return value;
}

function getColumnIndexFromName(name) {
 
  var headers = ws.getRange(1,1,1,ws.getLastColumn()).getValues()[0];
  for (var i = 0; i < headers.length; i++) {
    if (headers[i] == name) return i + 1;
  }
  return -1;
}

function getColumnData(name, rows, startingRow){
  var col_index = getColumnIndexFromName(name);

  var value = ws.getRange(startingRow, col_index, rows).getValues();
  Logger.log("Got Data from: " + name + " = " + value);

  return value;
}
function getColumnData(name, rows){
  var col_index = getColumnIndexFromName(name);

  var value = ws.getRange(1, col_index, rows).getValues();
  Logger.log("Got Data from: " + name + " = " + value);

  return value;
}
function getColumnData(name){
  var col_index = getColumnIndexFromName(name);

  var unfiltered_value = ws.getRange(1, col_index, ws.getMaxColumns()).getValues();
  var rows = countFilledRows();

  var value = ws.getRange(1, col_index, rows).getValues();
  //Logger.log("Got Data from: " + rows + " = " + value);

  return unpackGetValues(value);
}

function unpackGetValues(values){
  var unpacked = [];
  for(var i = 0; i < values.length; i++){
    unpacked.push(values[i][0]);
  }
  return unpacked;
}

function getNewEmails(){
  var FirstNames = getColumnData(column_First_Name);
  var LastNames = getColumnData(column_Last_Name);
  var NewEmails = [];

  for (var i = 1; i< FirstNames.length; i++){
    var NewEmail = FirstNames[i]+'.'+LastNames[i]+domain_name;
    NewEmails.push(NewEmail);
  }
  
  return NewEmails;
}

function countFilledRows(){
  var rows = 0;
  var col_index = getColumnIndexFromName(column_First_Name);
  var FirstNames = ws.getRange(1, col_index, ws.getMaxRows()).getValues();
  for (var i = 0; i < FirstNames.length; i++){
    if (FirstNames[i] != ''){
      rows = i+1;
    }
  }
  return rows;
}

function clearAllEntries(){
  var filled_rows = countFilledRows();
  for (var i = filled_rows; i>1; i--) {
    ws.deleteRow(i); 
  }
  
}

function clearTopEntry(){
  ws.deleteRow(2);
}
