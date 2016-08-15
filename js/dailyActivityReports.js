$( document ).ready(function() {
				 dailyActvityGraph();	
	});
						function dailyActvityGraph() {

							
							$
									.ajax({
										type : 'POST',
										contentType : 'application/json',
										url : adminConfig.userBaseURL + "/dailyActivitiesGraph",
										dataType : "json",
										data : '',
										async : false,
										success : function(data) {

											
											var dailyActvityData = (data.object != undefined) ? data.object
													: {};

											console.log(dailyActvityData);
											console.log(dailyActvityData.length);
											$("#loginCount")
													.text(
															dailyActvityData.dailyLoginCount);
											$("#regCount")
													.text(
															dailyActvityData.dailyRegCount);
											$("#rateCount")
													.text(
															dailyActvityData.dailyRateCount);
											$("#reactionCount")
											.text(
													dailyActvityData.dailyReactionCount);

											Morris
													.Bar({
														element : 'reportComments_Graph',
														data : [
																{
																	label : 'Login',
																	value : dailyActvityData.dailyLoginCount
																},
																{
																	label : 'Registration',
																	value : dailyActvityData.dailyRegCount

																},{
																	label : 'Rate',
																	value : dailyActvityData.dailyRateCount

																},{
																	label : 'Reaction',
																	value : dailyActvityData.dailyReactionCount

																}],


																
														xkey : 'label',
														// A list of names of data record attributes that contain y-values.
														ykeys : [ 'value' ],
														// Labels for the ykeys -- will be displayed when you hover over the
														// chart.
														labels : [ 'Count' ],
														//barColors: ['#7A2443'],
														
														barColors : function(
																row, series,
																type) {
															if (type === 'bar') {
																var red = Math
																		.ceil(255
																				* row.y
																				/ this.ymax);
																return 'rgb('
																		+ red
																		+ ',0,0)';
															} else {
																return '#000';
															}
														}
													});
										}
									//,
									//error : function(jqXHR, textStatus, errorThrown) {
									//alert('drawing ratingGraph error: ' + textStatus);
									//	}
									
						});}