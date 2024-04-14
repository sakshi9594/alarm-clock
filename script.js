
// Array to store alarms
let alarms = [];
// Audio element for alarm sound
let alarmAudio = document.getElementById('alarmSound');

// Load alarms from local storage
if (localStorage.getItem('alarms')) {
    alarms = JSON.parse(localStorage.getItem('alarms'));
    displayAlarms();
}

// Function to display current time
function displayTime() {
    // Get current time
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    //formating hours minutes and seconds
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    // Display time in clock
    document.getElementById('clock').innerText = `${hours}:${minutes}:${seconds} ${ampm}`;

    // Check if any alarm should go off
    checkAlarms(hours, minutes, seconds);

    // Update every second
    setTimeout(displayTime, 1000);
}

// Function to set alarm
function setAlarm() {
    // Get input values
    let hour = document.getElementById('alarmHour').value;
    let minute = document.getElementById('alarmMinute').value;
    let second = document.getElementById('alarmSecond').value;
    let ampm = document.getElementById('ampm').value;

    // Create alarm object
    let alarm = {
        hour: hour,
        minute: minute,
        second: second,
        ampm: ampm
    };

    // Add alarm to alarms array
    alarms.push(alarm);

    // Store alarms in local storage
    localStorage.setItem('alarms', JSON.stringify(alarms));

    // Display alarm in list
    displayAlarms();

    // Reset input fields
    resetFields();
}

// Function to display alarms
// function displayAlarms() {
//     let alarmList = document.getElementById('alarmList');
//     alarmList.innerHTML = '';
//     alarms.forEach((alarm, index) => {
//         let listItem = document.createElement('li');
//         listItem.innerText = `${alarm.hour}:${alarm.minute}:${alarm.second} ${alarm.ampm}`;
//         let deleteButton = document.createElement('button');
//         deleteButton.innerText = `<i class="fa fa-trash-o"></i>`;
//         deleteButton.onclick = function() {
//             deleteAlarm(index);
//         };
//         listItem.appendChild(deleteButton);
//         alarmList.appendChild(listItem);
//     });
// }

function displayAlarms() {
let alarmList = document.getElementById('alarmList');
alarmList.innerHTML = '';
alarms.forEach((alarm, index) => {
let listItem = document.createElement('li');
listItem.innerText = `${alarm.hour}:${alarm.minute}:${alarm.second} ${alarm.ampm}`;
let deleteButton = document.createElement('button');
// Create <i> element for the delete icon
let deleteIcon = document.createElement('i');
deleteIcon.className = 'fas fa-trash-alt'; // Font Awesome trash icon class
// Add event listener to delete button
deleteButton.onclick = function() {
    deleteAlarm(index);
};
deleteButton.appendChild(deleteIcon); // Append icon to the button
listItem.appendChild(deleteButton);
alarmList.appendChild(listItem);
});
}



// Function to delete alarm
function deleteAlarm(index) {
    alarms.splice(index, 1);
    localStorage.setItem('alarms', JSON.stringify(alarms));
    displayAlarms();
}

// Function to reset input fields
function resetFields() {
    document.getElementById('alarmHour').value = '';
    document.getElementById('alarmMinute').value = '';
    document.getElementById('alarmSecond').value = '';
    document.getElementById('ampm').value = 'am';
}

// Function to check if any alarm should go off
function checkAlarms(currentHour, currentMinute, currentSecond) {
    alarms.forEach(alarm => {
        if (alarm.hour == currentHour && alarm.minute == currentMinute && alarm.second == currentSecond) {
            alert('Wake Up Time!');
            // Play alarm sound
            alarmAudio.play();
        }
    });
}

// Start clock
displayTime();