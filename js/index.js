function weeklyLoginChart(){	
			$.ajax({
				type : 'POST',
				contentType : 'application/json',
				url : adminConfig.userBaseURL+"/dailyLoginsPerWeek",
				
				async : false,
				success : function(data) {
		           		
					
					var loginData = (data.object != undefined) ? data.object : {};
					
					console.log("Social Login Data");
					console.log(loginData);
						
					Morris.Bar({
						element : 'BarChart',
						data : [ {
							label : loginData.seventhDay,
							value :loginData.day7
							
						}, {
							label : loginData.sixthDay,
							value : loginData.day6
							
						} ,{
							label : loginData.fifthDay,
							value : loginData.day5
							
						},{
							label : loginData.fourthDay,
							value : loginData.day4
							
						},{
							label :loginData.thirdDay ,
							value : loginData.day3
							
						},{
	                        label :loginData.secondDay,
							value : loginData.day2
							
						},{ label :loginData.currDate,
							value : loginData.day1
												
						}],
							 xkey: 'label',
							  // A list of names of data record attributes that contain y-values.
							  ykeys: ['value'],
							  // Labels for the ykeys -- will be displayed when you hover over the
							  // chart.
							  labels: ['Count'],
							  barColors: function (row, series, type) {
								    if (type === 'bar') {
								      var red = Math.ceil(255 * row.y / this.ymax);
								      return 'rgb(' + red + ',0,0)';
								    }
								    else {
								      return '#000';
								    }
							  }
						});
				}
			});
		}
function loginCount() {
	
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : adminConfig.userBaseURL+"/loginCount",
		dataType : "json",
		data : '',
		async : false,
		success : function(data) {
			
			var loginCountData = (data.object != undefined) ? data.object: {};
			console.log(loginCountData);
			console.log(loginCountData.dailyloginCount);
			console.log(loginCountData.dailyregisteredCount);
			console.log(loginCountData.socialLoginCount);
			$("#socialLogins").text(loginCountData.socialLoginCount);
			$("#registeredLogins").text(loginCountData.dailyregisteredCount);
			$("#dailyLogins").text(loginCountData.dailyloginCount);
			
		}
	});
}

function drawChart() {
	
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : adminConfig.userBaseURL+"/gender_graph",
		dataType : "json",
		data : '',
		async : false,
		success : function(data) {

			var genderData = (data.object != undefined) ? data.object
					: {};
			console.log(genderData);
			Morris.Donut({
				element : 'genderPieChart',
				data : [ {
					label : "Male",
					value : genderData.maleCount
				}, {
					label : "Female",
					value : genderData.femaleCount
				} ],
				
				 backgroundColor: '#ccc',
				  labelColor: '#060',
				  colors: [
						'#67C69D',
						'#95D7BB'
				    
				  ]
				
			});
		}
	
	});

}

function drawAgeChart() {

	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : adminConfig.userBaseURL+"/age_graph",
		dataType : "json",
		data : '',
		async : false,
		success : function(data) {

			var ageData = (data.object != undefined) ? data.object
					: {};
			console.log(ageData);
			Morris.Donut({
				element : 'AgePieChart',
				data : [ {
					label : "Below 13",
					value : ageData.ageLessthanThirteen
				}, {
					label : "Between 13 and 17",
					value : ageData.ageBetThirteenAndSeventeen
				},{
					label : "Between 18 and 24",
					value : ageData.ageBetEighteenAndTwentyfour
				},
				 {
					label : "Between 25 and 34",
					value : ageData.ageBetTwentyfiveAndThirtyfour
				},
				 {
					label : "Between 25 and 34",
					value : ageData.ageBetThirtyfiveAndFortynine
				},
				 {
					label : "Between 35 and 49",
					value : ageData.ageBetThirtyfiveAndFortynine
				},
				{
					label : "Above 50",
					value : ageData.ageAboveFifty
				}		
				
				],
				 backgroundColor: '#ccc',
				  labelColor: '#146',
				  colors: [
							'#ac6699',
							'#b373a2',
							'#ba80aa',
							'#c18cb3',
							'#c899bb',
							'#d5b2cc'
					    
					  ],
				
				
			});
		}
	});

}

function allProfPic() {
	
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : adminConfig.userBaseURL+"/getAllProfPics",
		dataType : "json",
		data : '',
		async : false,
		success : function(data) {
         
			var allProfPicData = (data.object != undefined) ? data.object: {};
			
			console.log("All profile pics data start");
			console.log(allProfPicData);
			console.log(allProfPicData.length);
			console.log("All profile pics data end");	
			
			for (var i=0; i < allProfPicData.length; i++) {
				if(allProfPicData[i].indexOf("https://")> -1){
					img_url = allProfPicData[i];
				}
				else {
					img_url = adminConfig.restBaseURL+allProfPicData[i];
				}
				
				var temp = "<li><a href='#'><img src='"+img_url+"'></a></li>";
				
				$("#gridImages").append(temp);
			}
			
			
			
				
				$( '#ri-grid' ).gridrotator();
	         						
	}
});
}