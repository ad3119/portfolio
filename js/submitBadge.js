var baseURL = adminConfig.userBaseURL;
var createBadgeURL = baseURL + "/createBadge";
var listBadgesURL = baseURL + "/getBadges";

var editIconURL = adminConfig.imagesBaseURL + "/document_edit.png";
var deleteIconURL = adminConfig.imagesBaseURL + "/file_delete.png";

var badgeId = [];
var badgeName =[];
var activeUrl = [];
var disabledUrl = [];
var activationPoints = [];


$(function () {
    $("#dvSource img").draggable({
        revert: "invalid",
        refreshPositions: true,
        drag: function (event, ui) {
            ui.helper.addClass("draggable");
        },
        stop: function (event, ui) {
            ui.helper.removeClass("draggable");
            var image = this.src.split("/")[this.src.split("/").length - 1];
            if ($.ui.ddmanager.drop(ui.helper.data("draggable"), event)) {
                
                $("#badgeName").val(this.title);
                $("#activeUrl").val(this.src);
                var disableUrl = (this.src).slice(0, -4) + "_locked.png";
                $("#disableUrl").val(disableUrl);
            }
            else {
                
            }
        }
    });
    $("#dvDest").droppable({
        drop: function (event, ui) {
            if ($("#dvDest img").length == 0) {
                //$("#dvDest").html("");
            }
            ui.draggable.addClass("dropped");
            //$("#dvDest").append(ui.draggable);
        }
    });
});


$('#submitBadge').click(function() {
	console.log("Inside click");
	var jsonObj=JSON.stringify({"badgeName":$('#badgeName').val(),"activationPoints": $('#activationPoints').val(),"activeBadgeUrl":$('#activeUrl').val(),"disabledBadgeUrl":$('#disableUrl').val()});
	postData(createBadgeURL, jsonObj);
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
			console.log(data);
			if(data.code == "770") //user logged in successfully
			{
				console.log("Badge Creation Successful");
				alert("Badge created!!");
				location.reload();
				
			}
			if(data.code == "771") {
				console.log("Badge Updation successful");
			}
			if(data.code == "772") {
				console.log("Badge Updation/Creation failed");
			}
			if(data.code == "773") {
				console.log("Cannot create Empty Badge");
			}
			if(data.code == "500") {
				console.log("List of Rules");
				console.log(data);

				/***** WRITE TO DISPLAY RULES*********/
				var $tbody = $("<tbody>");
				for(var i=0; i<data.object.length;i++)
				{
					badgeId[i] = data.object[i].badgeId;
					badgeName[i] = data.object[i].badgeName;
					activeUrl[i] = data.object[i].activeBadgeUrl;
					disabledUrl[i] = data.object[i].disabledBadgeUrl;
					activationPoints[i] = data.object[i].activationPoints;
					
					
					var $tr = $("<tr />");
					$tr.append("<td>"+(i+1)+"</td>");
					$tr.append("<td>"+data.object[i].badgeName+"</td>");
					var activeimg = $("<img style='width: 50px; height: 50px;'/>")
                    .attr('src',data.object[i].activeBadgeUrl);
					var $td = $("<td>");
					$td.append(activeimg);
					$tr.append($td);
					var disableimg = $("<img style='width: 50px; height: 50px;' />")
                    .attr('src',data.object[i].disabledBadgeUrl);
					var $td1 = $("<td>");
					$td1.append(disableimg);
					$tr.append($td1);
					//$tr.append("<td>"+data.object[i].activeBadgeUrl+"</td>");
					//$tr.append("<td>"+data.object[i].disabledBadgeUrl+"</td>");
					$tr.append("<td>"+data.object[i].activationPoints+"</td>");
					
					
					var editButton = $("<button onclick='editFunction("+i+")'>");
					var editIcon = $("<img style='width: 16px; height: 16px;'/>")
	                .attr('src',editIconURL);
					editButton.append(editIcon);
					$tr.append(editButton);
					
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
				$tbody.appendTo("#badgetable");
				
			}


		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('LoginUser error: ' + textStatus);
		}
	});
}


(function() {
	console.log("List of Badges:");
	postData(listBadgesURL, null);
	return false;
})();


function editFunction(i) {
	console.log("Number: "+i);
    var myWindow = window.open("editBadge.html?badgeName="+badgeName[i]+"&activeBadgeUrl="+activeUrl[i]+"&disabledBadgeUrl="+disabledUrl[i]+"&activationPoints="+activationPoints[i]+"&badgeId="+badgeId[i], "", "width=700, height=500");
}

function deleteFunction(i) {
    var myWindow = window.open("deleteBadge.html?badgeId="+badgeId[i], "", "width=500, height=200");
	//window.confirm("Press a button!");
}