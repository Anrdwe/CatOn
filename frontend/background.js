// const sstk = require("shutterstock-api");
// const SHUTTERSTOCK_API_TOKEN = 'YpHu4EeFUnHGC8koPMA5C0FF20SfX1i1';
// sstk.setAccessToken(process.env.SHUTTERSTOCK_API_TOKEN);

// const imagesApi = new sstk.ImagesApi();

// const animalqueryParams = {
//   "query": "cute animal",
//   "image_type": "photo",
//   "sort": "random"
// };

// imagesApi.searchImages(animalqueryParams)
//   .then(({ data }) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });



chrome.alarms.onAlarm.addListener( function (alarm) { 
    if (alarm.name === "animalAlarm"){ 
    // Clear any notification with the same name
        chrome.notifications.clear('Dose of cuteness');
        chrome.notifications.create('Dose of cuteness', {
            type: 'basic',
            iconUrl: 'CatOn_icon2.png', // Replace with your own image
            // Customize either the notification title or message
            title: 'Dose of cuteness',
            message: "It's time for some cuteness!"
        })
    }
    else if (alarm.name === "eyeAlarm"){ 
        // Clear any notification with the same name
            chrome.notifications.clear('Blink Reminder');
            chrome.notifications.create('Blink Reminder', {
                type: 'basic',
                iconUrl: 'CatOn_icon2.png', // Replace with your own image
                // Customize either the notification title or message
                title: 'Blink Reminder',
                message: 'Blink 10 times and focus at a distance.'
            })
        }
    else if (alarm.name === "exerciseAlarm"){ 
        // Clear any notification with the same name
            chrome.notifications.clear('Exercise Break');
            chrome.notifications.create('Exercise Break', {
                type: 'basic',
                iconUrl: 'CatOn_icon2.png', // Replace with your own image
                // Customize either the notification title or message
                title: 'Exercise Break',
                message: 'Take a walk or do 10 jumping jacks.'
            })
        }
        else if (alarm.name === "stretchAlarm"){ 
            // Clear any notification with the same name
                chrome.notifications.clear('Time to stretch');
                chrome.notifications.create('Time to stretch', {
                    type: 'basic',
                    iconUrl: 'CatOn_icon2.png', // Replace with your own image                        // Customize either the notification title or message
                    title: 'Time to stretch',
                    message: 'Stretch your arms and touch your toes.'
                })
        }
});

document.getElementById("setButton").addEventListener("click", function(){
    chrome.storage.sync.get('healthyBrowsingSettings', function (storagePrefs) {
        prefs = buildPrefsFromStorage(storagePrefs);
        if (prefs.animalValue !== 0) {
            chrome.alarms.create("animalAlarm", { periodInMinutes: parseFloat(prefs.animalValue) });
            console.log(`alarm set for ${prefs.animalValue}`);
        }
        if (prefs.eyeValue !== 0) {
            chrome.alarms.create("eyeAlarm", { periodInMinutes: parseFloat(prefs.eyeValue) });
            console.log(`alarm set for ${prefs.eyeValue}`);
        }
        if (prefs.exerciseValue !== 0) {
            chrome.alarms.create("exerciseAlarm", { periodInMinutes: parseFloat(prefs.exerciseValue) });
            console.log(`alarm set for ${prefs.exerciseValue}`);
        }
        if (prefs.stretchValue !== 0) {
            chrome.alarms.create("stretchAlarm", { periodInMinutes: parseFloat(prefs.stretchValue) });
            console.log(`alarm set for ${prefs.stretchValue}`);
        }
    })
    document.getElementById("setText").innerHTML = "Reminders set";
})