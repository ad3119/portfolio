
var settingsURL = adminConfig.userBaseURL + "/updateservices";

$('#submitServices').click(function() {
	console.log("Services enabled");
	console.log($('#socialToggle').prop('checked'));
	console.log($('#registrationToggle').prop('checked'));
	postData();
});

function postData(){
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: settingsURL,
		dataType: "json",
		data: JSON.stringify({"register":$('#registrationToggle').prop('checked'),"social": $('#socialToggle').prop('checked')}),
		success: function(data){
			console.log(data);
			if(data.code =="500") {
				console.log("Services updated!!");
				alert("Services updated!!");
			}

		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('LoginUser error: ' + textStatus);
		}
	});
}
