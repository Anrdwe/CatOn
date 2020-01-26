var animalSliderId = "#slider-animal";
var eyeSliderId = "#slider-eye";
var exerciseSliderId = "#slider-exercise";
var stretchSliderId = "#slider-stretch";

//helpers
function getSliderText(value) {
	if (typeof value == undefined)
		return 'Error';
	if (value == 0)
		return 'Disabled';
	return value + ' minutes';
}

var updateAnimalText = function(value) { $("#animal_value").html(value);};
var updateEyeText = function(value) { $("#eye_value").html(value);};
var updateExerciseText = function(value) { $("#exercise_value").html(value);};
var updateStretchText = function(value) { $("#stretch_value").html(value);};

var getUserPrefsFromUI = function() {
    var prefs = {};
    prefs.animalValue = $(animalSliderId).slider("value");
    prefs.eyeValue = $(eyeSliderId).slider("value");
    prefs.exerciseValue = $(exerciseSliderId).slider("value");
    prefs.stretchValue = $(stretchSliderId).slider("value");
    return prefs;
};

var storeUserPrefs = function() {
    chrome.storage.sync.set({healthyBrowsingSettings: getUserPrefsFromUI()}, function() {
        chrome.extension.sendMessage({action: "optionsChanged"});    
    });
};
//UI handlers

//execute code, assign handlers
$(function() {
    chrome.storage.sync.get('healthyBrowsingSettings', function (storagePrefs) {
        prefs = buildPrefsFromStorage(storagePrefs);
        
        updateAnimalText(getSliderText(prefs.animalValue));
        updateEyeText(getSliderText(prefs.eyeValue));
        updateExerciseText(getSliderText(prefs.exerciseValue));
        updateStretchText(getSliderText(prefs.stretchValue));
        
        var sliderOptions = {
            step: 5,
            min: 0,
            max: 120,
            value: 30
        };
        //update animal options
        var animalSliderOptions = sliderOptions;
        animalSliderOptions.value = prefs.animalValue;
        animalSliderOptions.change = storeUserPrefs;
        animalSliderOptions.slide = function (event, ui) {
            updateAnimalText(getSliderText(ui.value));
        };
        $(animalSliderId).slider(animalSliderOptions);
        //update eye options
        var eyeSliderOptions = sliderOptions;
        eyeSliderOptions.value = prefs.eyeValue;
        eyeSliderOptions.change = storeUserPrefs;
        eyeSliderOptions.slide = function (event, ui) {
            updateEyeText(getSliderText(ui.value));
        };
        $(eyeSliderId).slider(eyeSliderOptions);
        //update exercise options
        var exerciseSliderOptions = sliderOptions;
        exerciseSliderOptions.value = prefs.exerciseValue;
        exerciseSliderOptions.change = storeUserPrefs;
        exerciseSliderOptions.slide = function (event, ui) {
            updateExerciseText(getSliderText(ui.value));
        };
        $(exerciseSliderId).slider(exerciseSliderOptions);
        //update stretch options
        var stretchSliderOptions = sliderOptions;
        stretchSliderOptions.value = prefs.stretchValue;
        stretchSliderOptions.change = storeUserPrefs;
        stretchSliderOptions.slide = function (event, ui) {
            updateStretchText(getSliderText(ui.value));
        };
        $(stretchSliderId).slider(stretchSliderOptions);
    })
});
