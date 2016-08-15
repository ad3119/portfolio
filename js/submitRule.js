
var baseURL = adminConfig.userBaseURL;
var createRuleURL = baseURL+"/createRule";
var listRulesURL = baseURL+"/getRules";

var editIconURL = adminConfig.imagesBaseURL + "/document_edit.png";
var deleteIconURL = adminConfig.imagesBaseURL + "/file_delete.png";

var ruleId = [];
var ruleName =[];
var ruleDesc = [];
var activityType = [];
var actionValue = [];
var applyPeriod = [];
var rulestatus = [];

$('#submitRule').click(function() {
	console.log("Inside c");
	var jsonObj = JSON.stringify({"ruleName":$('#ruleName').val(),"ruleDesc": $('#ruleDesc').val(),"status":$('#status').val(),"actionValue":$('#actionValue').val(),"activityType": $('#activityType').val(),"applyPeriod": $('#applyPeriod').val()});
	postData(createRuleURL, jsonObj);
	window.opener.location.reload();
	return false;
});




/*$('#modal').modal({
	centerScreen:1,

    height:750, 

    width:810
}); */





function postData(url, jsonObj){
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: url,
		dataType: "json",
		data: jsonObj,
		success: function(data){
			console.log(data);
			if(data.code == "760") //user logged in successfully
			{
				console.log("Rule Creation Successful");
				alert("Rule created successfully!!");
			}
			if(data.code == "761") {
				console.log("Rule Updation successful");
			}
			if(data.code == "500") {
				console.log("List of Rules");
				console.log(data);


				if(data.object.length == 0) {
					var $div = "<div class='alert alert-info'><span class='glyphicon glyphicon-info-sign'></span>&nbsp;&nbsp;<strong>No rule(s) was found</strong></div>";
					$div.appendTo("#rules");
				}
				else {
					/***** WRITE TO DISPLAY RULES*********/
					var $tbody = $("<tbody>");
					for(var i=0; i<data.object.length;i++)
					{
						ruleId[i] = data.object[i].ruleId;
						ruleName[i] = data.object[i].ruleName;
						ruleDesc[i] = data.object[i].ruleDesc;
						activityType[i] = data.object[i].activityType;
						actionValue[i] = data.object[i].actionValue;
						applyPeriod[i] = data.object[i].applyPeriod;
						rulestatus[i] = data.object[i].status;
						
						var $tr = $("<tr />");
						$tr.append("<td>"+(i+1)+"</td>");
						$tr.append("<td>"+data.object[i].ruleName+"</td>");
						$tr.append("<td>"+data.object[i].ruleDesc+"</td>");
						if(data.object[i].activityType == "801")
							$tr.append("<td>Login</td>");
						else if(data.object[i].activityType == "803")
							$tr.append("<td>Activate</td>");
						else if(data.object[i].activityType == "804")
							$tr.append("<td>Rate</td>");
						else if(data.object[i].activityType == "805")
							$tr.append("<td>Review</td>");
						else if(data.object[i].activityType == "806")
							$tr.append("<td>Comment</td>");
						else if(data.object[i].activityType == "807")
							$tr.append("<td>Share</td>");
						else if(data.object[i].activityType == "808")
							$tr.append("<td>Register</td>");
						$tr.append("<td>"+data.object[i].actionValue+"</td>");
						if(data.object[i].applyPeriod == "781")
							$tr.append("<td>Every Action</td>");
						else if(data.object[i].applyPeriod == "782")
							$tr.append("<td>Hourly</td>");
						else if(data.object[i].applyPeriod == "783")
							$tr.append("<td>Daily</td>");
						else if(data.object[i].applyPeriod == "784")
							$tr.append("<td>Maiden</td>");
						if(data.object[i].status == "901")
							$tr.append("<td>Active</td>");
						else if(data.object[i].status == "902")
							$tr.append("<td>InActive</td>");
						//var a = $("<a id='editIcon' />");
						//a.attr('href','badges.html');
						
						var editButton = $("<button onclick='editFunction("+i+")'>");
						var editIcon = $("<img style='width: 16px; height: 16px;'/>")
		                .attr('src',editIconURL);
						//a.append(editIcon);
						editButton.append(editIcon);
						
						var deleteButton = $("<button onclick='deleteFunction("+i+")'>");
						var deleteIcon = $("<img style='width: 16px; height: 16px;'/>")
		                .attr('src',deleteIconURL);
						deleteButton.append(deleteIcon);
						
						var editCol = $("<td/>");
						var delCol = $("<td/>");
						editCol.append(editButton)
						delCol.append(deleteButton)
						$tr.append(editCol);
						$tr.append(delCol);
						
						
						$tbody.append($tr);
					}

					$tbody.append("</tbody>");
					$tbody.appendTo("#ruletable");
				}
			}

		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('LoginUser error: ' + textStatus);
		}
	});
}

(function() {
	postData(listRulesURL, null);
	return false;
})();

function getData(url){
	$.ajax({
		type: 'GET',
		contentType: 'application/json',
		url: url,
		dataType: "json",
		success: function(data){
			console.log(data);
			if(data.code == "760") //user logged in successfully
			{
				/*var str = $('#email').val();
				var res = str.split("@");
				var FiveMinutesLater = new Date();
				FiveMinutesLater.setMinutes(FiveMinutesLater.getMinutes() + 5);
				document.cookie="username="+res[0]+"$expires="+FiveMinutesLater+"$email="+$('#email').val()+"$userbase="+data.object;
				console.log(document.cookie); 
				window.opener.location.reload();
				window.close();*/
				console.log("Rule Creation Successful");
			}
			if(data.code == "761") {
				console.log("Rule Updation successful");
			}

		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('LoginUser error: ' + textStatus);
		}
	});
}

function editFunction(i) {
	console.log("Number: "+i);
    var myWindow = window.open("editRule.html?ruleName="+ruleName[i]+"&ruleDesc="+ruleDesc[i]+"&status="+rulestatus[i]+"&actionValue="+actionValue[i]+"&activityType="+activityType[i]+"&applyPeriod="+applyPeriod[i]+"&ruleId="+ruleId[i], "", "width=800, height=400");
}

function deleteFunction(i) {
    var myWindow = window.open("deleteRule.html?ruleId="+ruleId[i], "", "width=500, height=200");
	//window.confirm("Press a button!");
}

