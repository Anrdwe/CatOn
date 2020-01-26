chrome.alarms.onAlarm.addListener( function (alarm) { 
    if (alarm.name === "animalAlarm"){ 
    // Clear any notification with the same name
        chrome.notifications.clear('Dose of cuteness');
        chrome.notifications.create('Dose of cuteness', {
            type: 'image',
            iconUrl: 'CatOn_icon2.png', // Replace with your own image
            // Customize either the notification title or message
            title: 'Dose of cuteness',
            message: "It's time for some cuteness!",
            imageUrl: "cat500x250.jpg"
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
        else {
            chrome.alarms.clear("animalAlarm")
        }
        if (prefs.eyeValue !== 0) {
            chrome.alarms.create("eyeAlarm", { periodInMinutes: parseFloat(prefs.eyeValue) });
            console.log(`alarm set for ${prefs.eyeValue}`);
        }
        else {
            chrome.alarms.clear("eyeAlarm")
        }
        if (prefs.exerciseValue !== 0) {
            chrome.alarms.create("exerciseAlarm", { periodInMinutes: parseFloat(prefs.exerciseValue) });
            console.log(`alarm set for ${prefs.exerciseValue}`);
        }
        else {
            chrome.alarms.clear("exerciseAlarm")
        }
        if (prefs.stretchValue !== 0) {
            chrome.alarms.create("stretchAlarm", { periodInMinutes: parseFloat(prefs.stretchValue) });
            console.log(`alarm set for ${prefs.stretchValue}`);
        }
        else {
            chrome.alarms.clear("stretchAlarm")
        }
    })
    document.getElementById("setText").innerHTML = "Reminders set";
});

document.getElementById("test1").addEventListener("click", function(){
    chrome.notifications.clear('Dose of cuteness');
        chrome.notifications.create('Dose of cuteness', {
            type: 'image',
            iconUrl: 'CatOn_icon2.png', // Replace with your own image
            // Customize either the notification title or message
            title: 'Dose of cuteness',
            message: "It's time for some cuteness!",
            imageUrl: "cat500x250.jpg"
    })
});
document.getElementById("test2").addEventListener("click", function(){
    chrome.notifications.clear('Blink Reminder');
    chrome.notifications.create('Blink Reminder', {
            type: 'basic',
            iconUrl: 'CatOn_icon2.png', // Replace with your own image
            // Customize either the notification title or message
            title: 'Blink Reminder',
            message: "Blink 10 times and focus at a distance."
        })
    });

document.getElementById("test3").addEventListener("click", function(){
    chrome.notifications.clear('Exercise Break');
    chrome.notifications.create('Exercise Break', {
        type: 'basic',
        iconUrl: 'CatOn_icon2.png', // Replace with your own image
        // Customize either the notification title or message
        title: 'Exercise Break',
        message: 'Take a walk or do 10 jumping jacks.'
    })
});

document.getElementById("test4").addEventListener("click", function(){
    chrome.notifications.clear('Time to stretch');
    chrome.notifications.create('Time to stretch', {
    type: 'basic',
    iconUrl: 'CatOn_icon2.png', // Replace with your own image                        // Customize either the notification title or message
    title: 'Time to stretch',
    message: 'Stretch your arms and touch your toes.'
    })
});