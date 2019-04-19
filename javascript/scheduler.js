// Initialize Firebase
var config = {
  apiKey: "AIzaSyAVcRSKZmWfWm_37npbLeAlwGe8tGbxbLE",
  authDomain: "train-scheduler-f77d0.firebaseapp.com",
  databaseURL: "https://train-scheduler-f77d0.firebaseio.com",
  projectId: "train-scheduler-f77d0",
  storageBucket: "train-scheduler-f77d0.appspot.com",
  messagingSenderId: "45113655347"
};
firebase.initializeApp(config);

var database = firebase.database();

//set up event listerner for form submit to capture employee data
$('#train-form').on('submit', function(event) {
  event.preventDefault();

  //gather form data
  var trainDataInput = {
    name: $('#name-input')
      .val()
      .trim(),
    destination: $('#destination-input')
      .val()
      .trim(),
    frequency: $('#frequency-input')
    .val()
    .trim(),
    nextArrival: $('#arrival-input')
    .val()
    .trim(),
    minutesAway: $('#minutes-input')
    };

    //add to firebase
    database.ref().push(trainDataInput);
});

//use this event listener to retrieve newy added data that was added with .push() method in firebase
database.ref().on('child_added', function(childSnapshot) {
  console.log('this is child_added');
  console.log(childSnapshot.val());

  //save reference to data in childSnapshot
  var trainData = childSnapshot.val();

  //create table row
  var $tr = $('<tr>');
  //create <td> tags for each column
  //add content from childSnapshot.val() to correspondng <td> tags
  var $tdName = $('<td>').text(trainData.name);
  var $tdDestination = $('<td>').text(trainData.destination);
  var $tdFrequency = $('<td>').text(trainData.frequency);
  var $tdnextArrival = $('<td>').text(trainData.nextArrival);
  var $tdminutesAway = $('<td>').text(trainData.minutesAway);
  //append td tags to table row
  $tr.append($tdName, $tdDestination, $tdFrequency, $tdnextArrival, $tdminutesAway);
  
  //append entire table to tbody
  $("tbody").append($tr);
});