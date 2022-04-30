function uploadAllEntries(){
  var FirstNames = getColumnData(column_First_Name);
  var LastNames = getColumnData(column_Last_Name);
  var NewEmails = getNewEmails();
  var RecoveryEmails = getColumnData(column_Recovery_Email);
  var WorkSecondaryEmails =getColumnData(column_Work_Secondary_Email);
  var RecoveryPhones = getColumnData(column_Recovery_Phone);
  var MobilePhones = getColumnData(column_Mobile_Phone);
  var HomeAddresses = getColumnData(column_Home_Address);
  var HomePostalCode = getColumnData(column_Home_PostalCode);

  var totalRows = countFilledRows();
  for(var i = 0; i < totalRows - 1; i++){
    //check if user exists first******************************************** <-------------------------
    if (CheckIfEmailExists(NewEmails[i])){
      Logger.log(NewEmails[i] + " <--- this user already exists in the google workspace");
      return NewEmails[i];
    }
    var pass = addUser(FirstNames[i+1], LastNames[i+1], NewEmails[i], RecoveryEmails[i+1], WorkSecondaryEmails[i+1], RecoveryPhones[i+1], MobilePhones[i+1], HomeAddresses[i+1], HomePostalCode[i+1]);
    
    DraftSetUpEmail(RecoveryEmails[i+1], NewEmails[i], pass);
    clearTopEntry();
  }
  //clearAllEntries();
  Logger.log(totalRows);
  return totalRows;
}
function CheckIfEmailExists(email){
  var ExistingEmails = getExistingEmails();
  if (ExistingEmails.indexOf(email.toLowerCase()) != -1){
      return true;
    }
    else{
      return false;
    }
}

function doGet(e){
  var tmp = HtmlService.createTemplateFromFile("page");

  tmp.sheetURL = SpeadSheet_URL;

  return tmp.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getRowData(){
  var triple_return = [getColumnData(column_First_Name), getColumnData(column_Last_Name), getColumnData(column_Recovery_Email),getColumnData(column_Recovery_Phone),getNewEmails()]
  Logger.log(triple_return);
  return triple_return;
}

function sendTestEmail(){
  DraftSetUpEmail("email@outlook.com", "NewEmails[i]", "pass");
}
