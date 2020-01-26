//================================================================================
// Defining default values 
//================================================================================

// Default notification values
const defaultAnimalValue = 20;
const defaultEyeValue = 45;
const defaultExerciseValue = 90;
const defaultStretchValue = 20;


var buildPrefsFromStorage = function(storagePrefs) {
    prefs = storagePrefs.healthyBrowsingSettings;

    if (prefs == null) {
        prefs = {};
    }
    if (prefs.animalValue == null) {
        prefs.animalValue = defaultAnimalValue;
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