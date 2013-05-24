
'use strict';

angular.module('Calendarapp', ['Calendarapp.controllers', 'Calendarapp.filters', 'Calendarapp.directives']);

// map english digit to nepali
var nepDigit = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९', '१०', '११', '१२', '१३', '१४', '१५', '१६', '१७', '१८', '१९', '२०', '२१', '२२', '२३', '२४', '२५', '२६', '२७', '२८', '२९', '३०', '३१', '३२'];

// map nepali months
var nepMonth = ['', 'बैशाक', 'जेष्ठ', 'असार', 'सावन', 'भाद्र', 'असोज', 'कर्तिक', 'मँसिर', 'पुस', 'माघ', 'फल्गुन', 'चैत्र'];

// map english months
var engMonth = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// map nepali-english months for calendar
var nepengMonth = ['', 'Apr-May', 'May-June', 'June-July', 'July-Aug', 'Aug-Sept', 'Sept-Oct', 'Oct-Nov', 'Nov-Dec', 'Dec-Jan', 'Jan-Feb', 'Feb-Mar', 'Mar-Apr', ];


// text at top left of calendar - map to unicode
function changeTonep(month, year) {
    return nepMonth[month] + ' ' + nepDigit[year[0]] + nepDigit[year[1]] + nepDigit[year[2]] + nepDigit[year[3]];   
}

var database;

function initialSetup() {
  console.log('in');

  var request = indexedDB.open("nepali_calendar", 1);
  
  request.onerror = function(event) {
    console.log(event.target.errorCode);
  };

  request.onsuccess = function(event) {
      database = request.result;
      console.log('database opened successfully.');
  };

  request.onupgradeneeded = function(event) {
      var db = event.target.result;
      var objectStore = db.createObjectStore("calendar_events", { keyPath: "date"});
      console.log('helo');
  };

}

function findEvent() {
  var request = indexedDB.open("nepali_calendar", 1);

  request.onsuccess = function(event) {
    database = event.target.result;
    var transaction = database.transaction(["calendar_events"]);
    var objectStore = transaction.objectStore("calendar_events");
    var request = objectStore.get(2000101);
    request.onsuccess = function(event) {
      database.close();
      console.log('found' + event.target.result.date + event.target.result.event);
    };
    request.onerror = function(e) {
      console.log("Error Getting: ", e);
    };
  }

}

/*
  // schema
var dbSchema = [{
    name: 'calendar_events',
    key: 'date',
    indexes: [
        { name: 'date', field: 'date', unique: false }
    ]
}];

// init
var IDB = new DB({
    name: 'db_calendar',
    version: 1,
    schema: dbSchema,
    success: function (DBObject) {
        db = DBObject;
    //    console.log(db);
       // doStuff();
    },
    error: function (support, e) {
        console.log('error initing db');
    }
});

//test();
}

function doStuff () {

    // make calls with the db object here
    var data = [
        {date: '20700103', event: 'PujaShe'}
    ];

    db.insert({
        store: 'calendar_events', 
        data: data, 
        replace: true,
        success: function (rowsAdded, rowsFailed, e) {
            // added
            console.log('Added ' + rowsAdded.length + ' rows to animals');
        }, 
        error: function (rowsAdded, rowsFailed, e) {
            // error
            console.log(rowsFailed.length + ' rows failed insert');
        }
    });

}
/*
    // get id = 5
            db.get({
                store: 'animals1', 
                id: 9,
                success: function (data, e) {
                    console.log(data.name + ' is in the class ' + data['class']);
                },
                error: function (id, e) {
                    console.log('error getting row ' + id);
                }
            });
*/


            