// JavaScript Document

/* Arzt - Slides*/
function show_arzt(){
    $('#slides_arzt').removeClass("hiddenContent");
    $('#swipeContainer_arzt').removeClass("hiddenContent");
    $('#slides_arzt').addClass("visibleContent");
    $('#swipeContainer_arzt').addClass("visibleContent");
    swiper_arzt.attachEvents();
    swiper_arzt.allowSlideNext = true;
    swiper_arzt.allowSlidePrev = true;
}
var slide_title = "";
//::: on slide change :::
 function onSlideChangeHandler(){
     'use strict';
     var activeSlideNr;
     /*
     Es ist notwendig die aktuelle Slidenummer zu ermitteln, um gezielte Aktionen auf bestimmten Slides auszuführen.
     Es wurden zwei Varianten ermittelt: 
     1. swiper.activeIndex:
     Funktioniert gut wenn keine Slides ausgeblendet werden - wie bei einem interaktiven Inhaltsverzeichnis, wo eine Auswahl der zu zeigenden Slides getroffen werden kann. 
     swiperActiveIndex - beginnt mit 0! muss in der switch-Schleife berücksichtigt werden.
     */
     swiperActiveIndex = swiper.activeIndex;
     activeSlideNr = swiperActiveIndex + 1;
     /*
     2. .swiper-slide-active / .swiper-slide-visible : 
     Hier wir die zugewiesene class ermittelt. Das aktive/sichtbare Slide bekimmt vom swiper eine class zugewiesen. Dann wird die id des elements mit der class swiper-slide-active / .swiper-slide-visible ermittelt und die nummer aus der id extrahiert 
     
     PS: in anderen Projekten habe ich .swiper-slide-visible verwendet. In dieser geht es nicht - weiß nicht warum... 
     
     */
     /*
     var slides = document.getElementById("swiperContainer");
     var activeSlideId = slides.querySelector('.swiper-slide-active').id;
     activeSlideNr = parseInt(activeSlideId.substr(6));
     */
     var historyLength = surveyHistory.push(activeSlideNr); 
     //console.log("activeSlideNr: " + activeSlideNr);
     
     switch(activeSlideNr){
        case 1:
            slide_title = "MSD Umfrage - Mediennutzung - Start";
            swiper.allowSlidePrev = true;
            break;
        case 2:
            slide_title = "Welche Informationen interessieren Sie?";
            break;
        case 3:
            //Wenn die CheckBox "Keine" bei Frage 1 aktiv ist, dann diese Seite überspringen
            if (hideChart3) {
                var prevChart = surveyHistory[historyLength-2]; // zweite Stelle im Array ist das zuletzt gesehene Chart
                if (prevChart == 2){
                    swiper.slideTo(3);
                }
                if (prevChart == 4){
                    swiper.slideTo(1);
                }
            }
            slide_title = "Auf welche Art und Weise wünschen Sie diese Information?";
            break;
        case 4:
            slide_title = "Nutzen Sie Social Media Kanäle, wenn ja welche?";
            break;
        case 5:
            slide_title = "Nutzen Sie Online Ärzte-Communities, wenn ja welche?";
            break;
        case 6:
            slide_title = "MSD Umfrage - Mediennutzung - Ende";
            swiper.allowSlidePrev = false;
            onSurveyEnd();
            break;
    }
    //console.log("slide_title: " + slide_title);
}