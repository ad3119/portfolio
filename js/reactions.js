var editIconURL = adminConfig.imagesBaseURL + "/document_edit.png";
var deleteIconURL = adminConfig.imagesBaseURL + "/file_delete.png";
var reactId = [];
var reactName =[];
var reactUrl = [];

$(document).ready(function() {
	console.log("ready!");
	getReactions();
});


$('#submitReaction').click(function() {
	console.log("Inside c");
	var jsonObj = JSON.stringify({"reactName":$('#reactionName').val(),"reactUrl": $('#reactionURL').val()});
	postData(adminConfig.reactionsBaseURL + '/createReaction', jsonObj);
	return false;
});

function postData(url, jsonObj){
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: url,
		dataType: "json",
		data: jsonObj,
		success: function(data){
			alert("Reaction created!!");
			location.reload();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('Create Reaction error: ' + textStatus);
		}
	});
}


function getReactions() {
	$.ajax({
		type : 'GET',
		contentType : 'text/plain',
		url : adminConfig.reactionsBaseURL + '/8001',
		data : '',
		success : function(data) {
			console.log(data);
			if (data.code == "501") {
				console.log("Error is receiving the data");
			} else if (data.code == "500") {
				populateReactData(data);
			}
		}
	});
}

function populateReactData(data) {
	var tblreactList = $('#reactionlist');
	var rList = $('<tbody/>');
	rList.empty();
	var reactionData = data.object;
	for ( var i = 0; i < reactionData.length; i++) {
		
		reactId[i] = data.object[i].reactId;
		reactName[i] = data.object[i].reactName;
		reactUrl[i] = data.object[i].reactUrl;
				
		var row = $('<tr/>');
		var colIdx = $('<td/>');
		var colName = $('<td/>');
		var colUrl = $('<td/>');
		var img = $('<img/>');

		var editButton = $("<button onclick='editFunction("+i+")'>");
		var editIcon = $("<img style='width: 16px; height: 16px;'/>")
        .attr('src',editIconURL);
		editButton.append(editIcon);
		
		
		var deleteButton = $("<button onclick='deleteFunction("+i+")'>");
		var deleteIcon = $("<img style='width: 16px; height: 16px;'/>")
        .attr('src',deleteIconURL);
		deleteButton.append(deleteIcon);
		
		
		colIdx.text(i + 1);
		colName.text(reactionData[i].reactName);
		img.attr("src", reactionData[i].reactUrl);
		img.attr("width", "20");

		colIdx.appendTo(row);
		colName.appendTo(row);
		img.appendTo(colUrl);
		colUrl.appendTo(row);
		var editCol = $("<td/>");
		var delCol = $("<td/>");
		editCol.append(editButton);
		delCol.append(deleteButton);
		row.append(editCol);
		row.append(delCol);
		row.appendTo(rList);
	}
	rList.appendTo(tblreactList);
}


function editFunction(i) {
	console.log("Number: "+i);
    var myWindow = window.open("editReaction.html?reactionId="+reactId[i]+"&reactionName="+reactName[i]+"&reactionUrl="+reactUrl[i], "", "width=700, height=500");
}

function deleteFunction(i) {
    var myWindow = window.open("deleteReaction.html?reactionId="+reactId[i], "", "width=500, height=200");
	
}

$('#generateCode').click(function() {
	console.log("Inside c");
	
	$("#codeText").removeClass( 'hidden' );
	var p=$('<code />');
	p.text("<div id=\"reactions\" class=\"hidden\"></div>");
	p.appendTo('#code');
	
	
	return false;
});
