function doGet(e) {
  var result = "Ok";
  if (e.parameter == "undefined") {
    result = "No Parameters";
  } else {
    var ppp = { tth: "get", id: 103, balance: 10 };
    var sheet_id = "10LKRRMhJC5Xpwbxiee0vZQwo02mIQ6xWi5VW46tqf-s"; // Spreadsheet ID
    var sheet = SpreadsheetApp.openById(sheet_id).getActiveSheet();
    var rowData = [];
    for (var param in e.parameter) {
      var value = stripQuotes(e.parameter[param]);
      switch (param) {
        case "id":
          rowData[0] = value; // This is taking in id
          break;
        case "balance":
          rowData[1] = value; // This is taking in cost
          break;
        default:
          result = "unsupported parameter";
      }
    }

    var bal = checkBalance(rowData[0]);
    if (bal[1] == -1) {
      result = -1;
    } else if (bal[1] >= rowData[1]) {
      result = "1";
      var updateAtLocation = sheet
        .getRange(bal[0], 2)
        .setValue(bal[1] - rowData[1]);
    } else {
      result = "0";
    }
  }
  return ContentService.createTextOutput(result);
}
function checkBalance(id) {
  var app = SpreadsheetApp;
  var activeSheet = app.getActiveSpreadsheet().getActiveSheet();
  var lastCell = activeSheet.getLastRow();
  var currentBalance = -1;
  var row;
  for (var i = 1; i <= lastCell; i++) {
    if (activeSheet.getRange(i, 1).getValue() == id) {
      currentBalance = activeSheet.getRange(i, 2).getValue();
      row = i;
      break;
    }
  }
  var returnVal = [row, currentBalance];
  return returnVal;
}
function stripQuotes(value) {
  return value.replace(/^["']|['"]$/g, "");
}
