// JavaScript Document
var survey_results = []; // in dieses Array werden die Werte der ausgewählten Checkboxen geschrieben
var hideChart3 = false;  // wenn die letzte CB in Frage 1 aktiv ist, soll Chart 3 nicht gezeigt werden. Das wird in dieser Variabel gespeichert und in navigationManager ausgewertet.
var surveyHistory = [1]; // Array mit der Reihenfolge der aufgerufenen Charts.  Die Auswertung erfolgt  in der Funktion onSlideChangeHandler() in navigationManager.js

function check() {
  document.getElementById("myCheck").checked = true;
}

function uncheck() {
  document.getElementById("myCheck").checked = false;
}

// Beim aktivieren/deaktivieren der Checkboxen werden die Antworten in ein Array geschrieben
function onClick_Button(element){
    $(element).toggleClass( "active");
    var currID = element.id; //id der aktuell angeklickten Checkbox
    // position = Nummer der Checkbox, wird aus der id extrahiert
    // diese Nummer ist notwendig, damit die Antworten immer an der selben Stelle im Array geschrieben und gelöscht (beim deaktivieren der Checkbox) werden
    var position = currID.substr(7);
    //erzeuge ein Objekt und sichere dort alle Attribute des aktuellen Buttons
    var answer = new Object();
    answer.id = currID;
    answer.checked = $(element).hasClass("active");
    answer.value = element.value;
    answer.name = element.name;
    answer.position = position-1;
    answer.question = slide_title; // definiert in navigationManager.js -> onSlideChangeHandler()
    
    if(answer.checked){
        //schreibe die Antwort in Array an der Position, die der id der Checkbox entspricht
        survey_results[answer.position] = answer; 
    } else {
        //lösche die Antwort im Array an der Position, die der id der Checkbox entspricht
        delete survey_results[answer.position]; 
    }
    // bei Checkbox 18 und 21 soll eine Texteingabe möglich sein
    // Texteingabe einblenden wenn die Checkbox aktiv ist
    switch (currID) {
         //::: Frage 1 :::    
        case "button_1":
            //uncheck last cb in Frage 1
            if (answer.checked) resetSelectedButtonRange(7, 7);
            break;  
        case "button_2":
            //uncheck last cb in Frage 1
            if (answer.checked) resetSelectedButtonRange(7, 7);
            break;  
        case "button_3":
            //uncheck last cb in Frage 1
            if (answer.checked) resetSelectedButtonRange(7, 7);
            break;    
        case "button_4":
            //uncheck last cb in Frage 1
            if (answer.checked) resetSelectedButtonRange(7, 7);
            break;   
         case "button_5":
            //uncheck last cb in Frage 1
            if (answer.checked) resetSelectedButtonRange(7, 7);
            break;     
         case "button_6":
            //uncheck last cb in Frage 1
            if (answer.checked) resetSelectedButtonRange(7, 7);
            break;   
        case "button_7":
            //uncheck last cb in Frage 1
            if (answer.checked) {
                resetSelectedButtonRange(1, 6);
                hideChart3 = true;
            } else{
                hideChart3 = false;
            }
            break;  
            
         //::: Frage 3 :::  
        case "button_14":
            //uncheck last cb in Frage 3
            if (answer.checked) resetSelectedButtonRange(20, 20);
            break;
        case "button_15":
            //uncheck last cb in Frage 3
            if (answer.checked) resetSelectedButtonRange(20, 20);
            break;
        case "button_16":
            //uncheck last cb in Frage 3
            if (answer.checked) resetSelectedButtonRange(20, 20);
            break;
        case "button_17":
            //uncheck last cb in Frage 3
            if (answer.checked) resetSelectedButtonRange(20, 20);
            break;
        case "button_18":
            //uncheck last cb in Frage 3
            if (answer.checked) resetSelectedButtonRange(20, 20);
            break;
        case "button_19":
            //uncheck last cb in Frage 3
            if (answer.checked) {
                resetSelectedButtonRange(20, 20);
                $("#text_19").show();
            } else {
                $("#text_19").val("");
                $("#text_19").hide();
                }
            break;
        case "button_20":
            //uncheck last cb in Frage 3
            if (answer.checked) {
                resetSelectedButtonRange(14, 19);
                $("#text_19").val("");
                $("#text_19").hide();
            }
                
            break;
        
        //::: Frage 4 :::
        case "button_21":
            //uncheck other cb in Frage 4
            if (answer.checked) resetSelectedButtonRange(24, 24);
            break;
        case "button_22":
            //uncheck other cb in Frage 4
            if (answer.checked) resetSelectedButtonRange(24, 24);
            break;
        
        case "button_23":
            if (answer.checked) {
                resetSelectedButtonRange(24, 24);
                $("#text_23").show();
                } else {
                    $("#text_23").val("");
                    $("#text_23").hide();
                }
            break;   
        case "button_24":
            //uncheck other cb in Frage 4
            if (answer.checked)  {
                resetSelectedButtonRange(21, 23);
                $("#text_23").val("");
                $("#text_23").hide();
            }
            break;    
    }
}


// ::: RESET Buttons :::
 
function resetSelectedButtonRange(start, end) {
    for (var j = start; j <= end; j++) {
        let currObjInArr = survey_results[j-1];
        if (currObjInArr != undefined) {
            let currButton_checked = currObjInArr.checked;
            let currButton_id = currObjInArr.id;
            if (currButton_checked) {
                $("#" + currButton_id).removeClass("active");
            }
        }
    }
}

function onChangeText(element){
    var value = element.value;
    var name = element.name;
    var textElementID = element.id;
    var position = textElementID.substr(5);
    //console.log("Text: " + textElementID + " - value: " + value + "position: " + position);
    var textInput = new Object();
    textInput.id = "button_"+position; // das ist natürlich nicht richtig, aber für die reset-Funktion wird die id der zugehörigen CheckBox benötigt
    textInput.textElementId = textElementID;
    if (position == 18){
        textInput.value = "Anderer Social Media Kanal: " + value;
    } 
    if (position == 22) {
        textInput.value = "Andere Arzt-Community: " + value;
    }
    textInput.checked = true;
    textInput.name = element.name;
    textInput.position = position-1;
    textInput.question = slide_title; // definiert in navigationManager.js -> onSlideChangeHandler()
    survey_results[textInput.position] = textInput;
    //console.log(survey_results[textInput.position].value);
}

// On key down: Enter muss abgefangen werden, es hat auf dem ipad zu Fehlern geführt
function onKeyDown(event){
    var keyCode = event.keyCode;
    //console.log("onKeyDown key: " + keyCode);
    if (keyCode == 13){
        event.preventDefault();
        document.activeElement.blur(); 
    }
}

// ON SURVEY END: Prüfe ob alle Texteingaben im Array gelandet sind
// Problem bei iPad ist die Textvervollständigung, wenn die App nur auf onKeyUp den Inhalt des Textinputs übermittelt. Oder die Autokorrektur   

function onSurveyEnd(){
    console.log("__onSurveyEnd__");
    var cb19_obj = survey_results[18];
    var cb23_obj = survey_results[22];
    
    if (cb19_obj != undefined){
        var theRealTextInputValue_text_19 = $("#text_19").val();
        if (theRealTextInputValue_text_19 == ""){
            theRealTextInputValue_text_19 = "Anderer Social Media Kanal"
        } else {
            theRealTextInputValue_text_19 = "Anderer Social Media Kanal: " + theRealTextInputValue_text_19;
        }
        console.log("theRealTextInputValue_text_19: " + theRealTextInputValue_text_19);
        cb19_obj.value = theRealTextInputValue_text_19;
        survey_results[18] = cb19_obj;
    }
    
    if (cb23_obj != undefined){
        var theRealTextInputValue_text_23 = $("#text_23").val();
        if (theRealTextInputValue_text_23 == ""){
            theRealTextInputValue_text_23 = "Andere Arzt-Community"
        } else {
            theRealTextInputValue_text_23 = "Andere Arzt-Community: " + theRealTextInputValue_text_23;
        }
        console.log("theRealTextInputValue_text_23: " + theRealTextInputValue_text_23);
        cb23_obj.value = theRealTextInputValue_text_23;
        survey_results[22] = cb23_obj;
    }
    startNewSurvey();
}


// ::: Nur für interne Kontrolle ::: 
function checkResultObj(obj){
    if (obj != undefined){
        console.log("Pos: " + obj.position + " - FrageNr: " + obj.name + " - id: " + obj.id + " - Value: " + obj.value + " - Frage: " + obj.question);
    }
    
}

/*function iterateResults_1(){
    survey_results.each( sendResultsToVeeva );
}*/
var k=0;
var elem = document.getElementById("bar");
var width = 0; // for progress bar
function iterateResults(){
    var arr_length = survey_results.length
    //console.log("lenght: " + arr_length);
    if (k < survey_results.length){
        width = (100 / arr_length) * k;
        elem.style.width = width + "%";
    
        //console.log("k:" + k + "  - " + survey_results);
        var currResult = survey_results[k];
        //console.log("currResult: " + currResult)
        if (currResult == undefined){
            //console.log("is undefined, go to next");
            k++;
            setTimeout(iterateResults, 0);
        } else{
            //console.log("currResult: " + currResult.value);
            triggerCallClickStream(currResult.id, currResult.name, currResult.value , "MSD Umfrage - Mediennutzung", currResult.question);
            if (survey_results.length){
                k++;
                setTimeout(iterateResults, 500);
            }
        }
      
    } else {
        // alle objekte im Array sind iteriert - reset und zurück zum start
        swiper.allowSlidePrev = true;
        resetSelectedButtonRange(1, survey_results.length);
        survey_results = [];
        k=0;
        smallReset();
        swiper.slideTo(0);
    }
}

function smallReset(){
        $("#myProgress").hide();
        $("#text_19").hide();
        $("#text_23").hide();
        $("#text_19").val("");
        $("#text_23").val("");
}

// für jeden Eintrag
function sendResultsToVeeva(item){
   if (item != ""){
       //console.log("Frage: " + item.name + " - Antwort: " +  item.value);
       triggerCallClickStream(item.id, item.name, item.value , "MSD Survey");
   }
}

function startNewSurvey(){
    iterateResults();
    $("#myProgress").show();
}

// NOT IN USE //
function deleteDoubleEntriesinArray(){
     //Doppelte Einträge im Array löschen:
    var unique = survey_results.filter(function(elem, index, self) { 
        return index === self.indexOf(elem); 
    })
    console.log(unique);
}