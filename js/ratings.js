count1Array = [0,0,0,0,0];
	count2Array = [0,0,0,0,0];
	count3Array = [0,0,0,0,0];
	
	
	 function createArray(ratingData, temp) {
		if (ratingData <= 1) {
			++temp[0];
		} 
		else if (ratingData <= 2) {
			++temp[1];

		} 
		else if (ratingData <= 3) {
			++temp[2];

		} 
		else if (ratingData <= 4) {
			++temp[3];

		} 
		else if (ratingData<= 5) {
			++temp[4];

		}
	} 
	
	
	$(function () {
	   $.ajax({
						type : 'GET',
						contentType : 'application/json',
						url : adminConfig.userBaseURL + "/readAllReviews",
						async : false,
						success : function(data) {

						var ratingData = (data.object != undefined || data.object != null ) ? data.object : null;
						
						if (ratingData != null) {
								if (ratingData.length == 0) {
									$("#ratingChart").append("No user reviews available.");
								}

								else {
									for (var i = 0; i < ratingData.length; i++) {

										if(ratingData[i].urlId == "11") {
											createArray(ratingData[i].userRating, count1Array);
										}
										else if(ratingData[i].urlId == "12") {
											createArray(ratingData[i].userRating, count2Array);
										}
										else if(ratingData[i].urlId == "13") {
											createArray(ratingData[i].userRating, count3Array);
										} 
									}
									
									
									 $('#ratingChart').highcharts({
									        chart: {
									            type: 'bar'
									        },
									        title: {
									            text: 'Ratings Chart'
									        },
									        xAxis: {
									            categories: ['1', '2', '3', '4', '5']
									        },
									        yAxis: {
									            min: 0,
									            title: {
									                text: 'Ratings Count'
									            }
									        },
									        legend: {
									            reversed: true
									        },
									        plotOptions: {
									            series: {
									                stacking: 'normal'
									            }
									        },
									        series: [{
									            name: 'Nikon Coolpix AW120',
									            data: count1Array
									        }, {
									            name: 'Nikon Coolpix S9700',
									            data: count2Array
									        }, {
									            name: 'Nikon Coolpix S9600',
									            data: count3Array
									        }]
									    });
									

							}  
						}
						else {
								$("#RatingChart").append("No user reviews available.");
							}
						}
					});

		});