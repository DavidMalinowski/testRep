//Create a function to trigger Call Clickstream
function triggerCallClickStream(id, questionNR, answer, type, question){
    
    console.log("Write ClickStream to Veeva answer: " + answer);
    
    var newValues = {};
    // für CallClickStream mit Account/Call
    newValues.Track_Element_Id_vod__c = id;
	newValues.Track_Element_Description_vod__c = questionNR;
    newValues.Question_vod__c = question;
	newValues.Usage_Duration_vod__c = 0;
	newValues.Answer_vod__c = answer;
	newValues.Usage_Start_Time_vod__c = new Date();
	newValues.Track_Element_Type_vod__c = type;
    
	// Create a new Call Clickstream record in the CRM
	com.veeva.clm.createRecord("Call_Clickstream_vod__c", newValues, printSavedResults);
}


//Print the result to an alert to test your Call Clickstream
function printSavedResults(result) {
	//alert(JSON.stringify(result));
    //console.log();
}