$('#sssubmit')
				.click(
						function() {

							console.log($("#Start").val());
							console.log($("#End").val());
							$.ajax({
										type : 'POST',
										contentType : 'application/json',
										url : adminConfig.userBaseURL+"/ageWeek",
										dataType : "json",
										data : JSON.stringify({
											"startDate" : $("#Start").val(),
											"endDate" : $("#End").val()
										}),

										async : false,
										success : function(data) {

											$("#AgeBarChart").empty();
											var ageData = (data.object != undefined) ? data.object
													: {};

											console.log(ageData);
											console.log(ageData.length);
											$("#ageLessthanThirteen")
													.text(
															ageData.ageLessthanThirteen);
											$("#ageBetThirteenAndSeventeen")
													.text(
															ageData.ageBetThirteenAndSeventeen);
											$("#ageBetEighteenAndTwentyfour")
													.text(
															ageData.ageBetEighteenAndTwentyfour);
											$("#ageBetTwentyfiveAndThirtyfour")
													.text(
															ageData.ageBetTwentyfiveAndThirtyfour);
											$("#ageBetThirtyfiveAndFortynine")
													.text(
															ageData.ageBetThirtyfiveAndFortynine);
											$("#ageAboveFifty").text(
													ageData.ageAboveFifty);

											Morris
													.Bar({
														element : 'AgeBarChart',
														data : [
																{
																	label : '<13',
																	value : ageData.ageLessthanThirteen
																},
																{
																	label : '13-17',
																	value : ageData.ageBetThirteenAndSeventeen

																},
																{
																	label : '18-24',
																	value : ageData.ageBetEighteenAndTwentyfour

																},
																{
																	label : '25-34',
																	value : ageData.ageBetTwentyfiveAndThirtyfour

																},
																{
																	label : '35-49',
																	value : ageData.ageBetThirtyfiveAndFortynine
																},
																{
																	label : '50',
																	value : ageData.ageAboveFifty

																} ],
														xkey : 'label',
														// A list of names of data record attributes that contain y-values.
														ykeys : [ 'value' ],
														// Labels for the ykeys -- will be displayed when you hover over the
														// chart.
														labels : [ 'Count' ],
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
									});

							$.ajax({
										type : 'POST',
										contentType : 'application/json',
										url : adminConfig.userBaseURL + "/ageWeek",
										dataType : "json",
										data : JSON.stringify({
											"startDate" : $("#Start").val(),
											"endDate" : $("#End").val()
										}),
										async : false,
										success : function(data) {

											$("#GenderBarChart").empty();
											var genderData = (data.object != undefined) ? data.object
													: {};

											console.log(genderData);
											console.log(genderData.length);
											$("#maleCount").text(
													genderData.maleCount);
											$("#femaleCount").text(
													genderData.femaleCount);

											Morris
													.Bar({
														element : 'GenderBarChart',
														data : [
																{
																	label : 'Male',
																	value : genderData.maleCount
																},
																{
																	label : 'Female',
																	value : genderData.femaleCount

																} ],
														xkey : 'label',
														ykeys : [ 'value' ],
														labels : [ 'Count' ],
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
																		});
							});