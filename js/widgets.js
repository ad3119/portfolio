var widget = (function() {
	var widgetsArray = [];
	var initialise = function(page) {
		$( "<div id='beforeBody' class=''></div>" ).insertBefore( "footer" );
		fetchPageWidget(page);
	}
	var fetchPageWidget = function(page) {
		$.getJSON(adminConfig.widgetsBaseURL + '/getPageWidgets',
			 function(json, textStatus) {
			
			 $.each(json.object, function(index, val) {
			 	console.log('Inside Looping of array');
			 	 var found =  checkForPage(page, val);
			 	 if(found) {
			 		console.log('Widget found');
			 		addWidgetToPage(val);
			 	 }
			 });
		});
	}
		
	var checkForPage = function(page, val) {
		console.log("Inside check For Page");
		var found = $.inArray(page, val.pagesList);
		if(found > -1) {
			widgetsArray.push(val.widgetHeader);
			return true;
		}
		else {
			return false;
		}
	}
	var addWidgetToPage = function(val) {
		console.log('Inside addWidgetToPage');
		switch(val.widgetHeader){
			case "Comment Widget":addWidget(val, "comment");
				break;
			case "Review & Rating  Widget":addWidget(val, "rnr");
				break;
			case "Badges Widget":addWidget(val, "badges", "widgetPanel");
				break;
			case "Leader Board Widget":addWidget(val, "leaderBoard", "widgetPanel");
				break;
			case "Activity Feed Widget":addWidget(val, "activityFeed", "widgetPanel");
				break;
		}
		
	}

	var addWidget = function (val, id){
		
		if(id == "badges") {
			console.log("Adding Widget to page");
			var temp = '<h4 style="background-color:#333;color:#fff;height:30px;line-height:30px;"><b>&nbsp;&nbsp;Badges</b></h4><div class="roundCorner"><div class="row marginZero"><div class="col-md-12" id="userbadges"style="padding-top: 10px;"></div></div></div></div>';
			console.log("Badegs :"+val.align);
			if(val.align == "Vertical") {
				var outerDiv = "<div style ='height:400px; overflow:auto;' id='"+id+"'>";
				outerDiv += temp;
				$('#widgetContainer').append(outerDiv);
			}
			else {
				var outerDiv = "<div style ='height:400px; overflow:auto;' id='"+id+"'>";
				outerDiv += temp;
				$('#beforeBody').append(outerDiv);
			}
		}
		else if(id == "leaderBoard") {
			var temp = ' <h4 style="background-color:#333;color:#fff;height:30px;line-height:30px;"><b>&nbsp;&nbsp;Leader Board</b></h4><div class="roundCorner"><div class="row marginZero"><div class="col-md-12" id="leaderboard"></div></div></div></div></div>';
			console.log("leader board:"+val.align);
			if(val.align == "Vertical") {
				var outerDiv = "<div style ='height:400px; overflow:auto;' id='"+id+"'>";
				outerDiv += temp;
				$('#widgetContainer').append(outerDiv);
			}
			else {
				var outerDiv = "<div style ='height:400px; overflow:auto;' id='"+id+"'>";
				outerDiv += temp;
				$('#beforeBody').append(outerDiv);
			}
		} 
		else if(id == "activityFeed") {
            var temp ='<h4 style="background-color:#333;color:#fff;height:30px;line-height:30px;"><b>&nbsp;&nbsp;Activity Feed</b></h4><div role="tabpanel"style="border: 1px solid; padding: 5px;"><ul class="nav nav-tabs"role="tablist"style="background-color: #ccc;"><li role="presentation"class="active"><a style="color: #000;"href="#everyone"aria-controls="everyone"role="tab"data-toggle="tab">Everyone</a></li><li role="presentation"><a style="color: #000;"href="#friends"aria-controls="friends"role="tab"data-toggle="tab">Friends</a></li><li role="presentation"><a style="color: #000;"href="#likes"aria-controls="messages"role="tab"data-toggle="tab">Me</a></li></ul><!--Tab panes--><div class="tab-content"><div role="tabpanel"class="tab-pane active"id="everyone"><img src="images/spinner.gif"style="margin-left: 150px; margin-top: 70px;"id="everyonelistloading"/><div id="everyonelist"><div class="row"><div class="col-md-12"id="everyoneactivity"></div></div></div></div><div role="tabpanel"class="tab-pane"id="friends"><img src="images/spinner.gif"style="margin-left: 150px; margin-top: 70px;"id="friendListloading"/><div id="friendList"><div class="row"><div class="col-md-12"id="friendslikes"></div></div></div></div><div role="tabpanel"class="tab-pane"id="likes"><img src="images/spinner.gif"style="margin-left: 150px; margin-top: 70px;"id="myactivitylistloading"/><div id="myactivitylist"><div class="row"><div class="col-md-12"id="myactivity"></div></div></div></div></div></div>';
            console.log("Activity Feed:"+val.align);
            if(val.align == "Vertical") {
            	
                  var outerDiv = "<div style ='height:400px; overflow:auto;' id='"+id+"'>";
                  outerDiv += temp;
                  $('#widgetContainer').append(outerDiv);
            }
            else {
                  var outerDiv = "<div style ='height:400px; overflow:auto;' id='"+id+"'>";
                  outerDiv += temp;
                  $('#beforeBody').append(outerDiv);
            }
     }

		
		else {
			$('#beforeBody').append(temp);
		}
	}
	
	var addedWidget = function(page, widget, id) {
        var added = false;
        $.getJSON(adminConfig.widgetsBaseURL + '/getPageWidgets',
                     function(json, textStatus) {
                     console.log("json::::   "+JSON.stringify(json.object));
                     $.each(json.object, function(index, val) {
                            console.log('Inside Looping of array');
                            if(val.widgetHeader == widget) {
                                   console.log("Inside comment Widget");
                                   var found =  checkForPage(page, val);
                                   if(found) {
                                          added = true;
                                   }
                            }
                     });
                     if(!added) {
                            $("#"+id).empty();
                     }
               });
 }


		
	return {
			init:initialise,
			addedWidget: addedWidget
	}
	
})();