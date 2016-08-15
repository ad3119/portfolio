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

function getAllProducts() {
	   $.ajax({
			type : 'GET',
			contentType : 'application/json',
			url : adminConfig.productsBaseURL + "/getAllProducts",
			async : false,
			success : function(data) {
				if(data.object != null && data.code == "500") {
					
					if(data.object.length > 0) {
						
					}
					else {
						$("#ratingChart").append("None of products has been reviewed");
					}
				}
				else {
					alert("Error generating Graph, Please try again later");
				}
		}
	   });
			
}
