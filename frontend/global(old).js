//================================================================================
// Defining default values 
//================================================================================

// Default notification values
const defaultAnimalValue = 20;
const defaultEyeValue = 45;
const defaultExerciseValue = 90;
const defaultStretchValue = 20;

// Default mood
const defaultmood = "sad";
chrome.storage.sync.set({'mood': defaultmood}), function() {
    if ('mood' === "sad") {
        var notif = {
            id: "animal",
            type: "basic",
            title: "Cat drop",
            message: "Your cat drop is here",
            iconUrl: 'images/water.png'
        };
        chrome.notifcations.create('animalNotif', notif)
    }
}
// Notifications

const defaultNotificationValueMultiplier = 60 * 1000; // minutes

const notificationQueueDelay = 5100; // 2 seconds
const notificationDispatcherInterval = 5300; // Time adjustment for setInterval()

var notificationValueMultiplier = defaultNotificationValueMultiplier;

var animalInterval = defaultAnimalValue * notificationValueMultiplier;
var eyeInterval = defaultEyeValue * notificationValueMultiplier;
var stretchInterval = defaultStretchValue * notificationValueMultiplier;
var exerciseInterval = defaultExerciseValue * notificationValueMultiplier;

var animalScheduler;
var eyeScheduler;
var stretchScheduler;
var exerciseScheduler;

var developmentEnvironment = false;

//================================================================================
// Defining notification objects
//================================================================================

var animalNotification = {
    id: "animal",
    type: "basic",
    title: "Cat drop",
    message: "Your cat drop is here",
    iconUrl: 'images/water.png'
};

var eyeNotification = {
    id: "eye",
    type: "basic",
    title: "Blink your eyes",
    message: "Blink your eyes 10 times, then focus in the distance for a couple of seconds.",
    iconUrl: 'images/eye.png'
};

var stretchNotification = {
    id: "stretch",
    type: "basic",
    title: "Time to stretch",
    message: "Get up and stretch, go to the kitchen or to the bathroom or to the balcony.",
    iconUrl: 'images/stretch.png'
};

var exerciseNotification = {
    id: "exercise",
    type: "basic",
    title: "Are you sitting correctly?",
    message: "Push your hips as far back as you can. Keep your shoulders back and your back straight.",
    iconUrl: 'images/posture.png'
};

//================================================================================
// Notification Queue & Dispatcher
//================================================================================

var notificationQueue = [];
var lastNotificationTimestamp = Date.now();

var notificationDispatcher = function () {
    const currentTimestamp = Date.now();

    if (notificationQueue.length > 0 && currentTimestamp - lastNotificationTimestamp >= notificationQueueDelay) {
        config = notificationQueue.shift();
        displayNotification(config);
    }
    lastNotificationTimestamp = Date.now();
};


//================================================================================
// Defining helper functions
//================================================================================

var displayNotification = function (notificationConfig) {
    id = notificationConfig.id;

    chromeNotification = {};
    chromeNotification.type = notificationConfig.type;
    chromeNotification.title = notificationConfig.title;
    chromeNotification.message = notificationConfig.message;
    chromeNotification.iconUrl = notificationConfig.iconUrl;

    chrome.notifications.create(id + Math.random(), chromeNotification); // Random is used for OSX 
}

var addNotificationToQueue = function (notificationConfig) {
    notificationQueue.push(notificationConfig);
}

var notificationScheduler = function () {
    notificationQueue = [];

    clearInterval(animalScheduler);
    clearInterval(eyeScheduler);
    clearInterval(stretchScheduler);
    clearInterval(exerciseScheduler);

    if (animalInterval) {
        animalScheduler = setInterval(function () {
            addNotificationToQueue(animalNotification);
        }, animalInterval);
    }

    if (eyeInterval) {
        eyeScheduler = setInterval(function () {
            addNotificationToQueue(eyeNotification);
        }, eyeInterval);
    }

    if (stretchInterval) {
        stretchScheduler = setInterval(function () {
            addNotificationToQueue(stretchNotification);
        }, stretchInterval);
    }

    if (exerciseInterval) {
        exerciseScheduler = setInterval(function () {
            addNotificationToQueue(exerciseNotification);
        }, exerciseInterval);
    }
};

var refreshScheduler = function () {
    chrome.storage.sync.get('healthyBrowsingSettings', function (storagePrefs) {
        prefs = buildPrefsFromStorage(storagePrefs);

        eyeInterval = prefs.eyeValue * notificationValueMultiplier;
        stretchInterval = prefs.stretchValue * notificationValueMultiplier;
        animalInterval = prefs.animalValue * notificationValueMultiplier;
        exerciseInterval = prefs.exerciseValue * notificationValueMultiplier;

        notificationScheduler();
    });
};

var receiveMessage = function (message, sender, sendResponse) {
    if (message.action == "optionsChanged") {
        refreshScheduler();
    } else if (message.action == "testNotifications") {
        addNotificationToQueue(animalNotification);
        addNotificationToQueue(eyeNotification);
        addNotificationToQueue(stretchNotification);
        addNotificationToQueue(exerciseNotification);
    }
};
//

var buildPrefsFromStorage = function (storagePrefs) {
    prefs = storagePrefs.healthyBrowsingSettings;

    if (prefs == null) {
        prefs = {};
    }
    if (prefs.eyeValue == null) {
        prefs.eyeValue = defaultAnimalValue;
    }
    if (prefs.eyeValue == null) {
        prefs.eyeValue = defaultExerciseValue;
    }
    if (prefs.exerciseValue == null) {
        prefs.exerciseValue = defaultEyeValue;
    }
    if (prefs.stretchValue == null) {
        prefs.stretchValue = defaultStretchValue;
    }
    return prefs;
}

chrome.management.getSelf((extensionInfo) => {
    console.log(JSON.stringify(extensionInfo));
    installType = extensionInfo.installType;

    if (installType == "development") {
        console.log("Loading Development Config");
        notificationValueMultiplier = 1000; // Use seconds for development
        developmentEnvironment = true;
    }
});