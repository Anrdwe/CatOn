//UI elements
var animalTextBoxId = "#animal";
var eyeTextBoxId = "#eye";
var exerciseTextBoxId = "#exercise";
var stretchTextBoxId = "#stretch";
//



document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('button').addEventListener('click',
    onclick, false)

    function onclick() {
        chrome.tabs.query({currentWindow: true, active: true},
            function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, 'hi')
            })
    }
}, false)

var input = []

var catButton = document.getElementById('catCare');
catButton.addEventListener('click', getValues, false);
function getValues() {
    input[0] = document.getElementById("animal").value;
    input[1] = document.getElementById("eye").value;
    input[2] = document.getElementById("exercise").value;
    input[3] = document.getElementById("stretch").value;

    alert(input);
    storeUserPrefs();
}

var getUserPrefsFromUI = function(){
    var prefs = {};
    prefs.animalValue = input[0];
    prefs.eyeValue = input[1];
    prefs.exerciseValue = input[2];
    prefs.stretchValue = input[3];
    return prefs;
}

var storeUserPrefs = function(){
    chrome.storage.sync.set({catOn: getUserPrefsFromUI()}, function(){
        chrome.extension.sendMessage({action:"optionsChanged"});
    })


}
document.ready(function() {
    chrome.storage.sync.get('catOn', function(storagePrefs){
        alert(input[0]);
        prefs = buildPrefsFromStorage(storagePrefs);

        var animaltextbox = {}
        animaltextbox.value = prefs.catOn[0];
        animaltextbox.change = storeUserPrefs;
        var animalboxID = document.getElementById('animal');
        animalboxID.value(animaltextbox.value);
    })
});