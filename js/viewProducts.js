$(function() {
	products.displayAllProducts();
});

var products = (function() {
	var removeProduct = function(productId) {
		$.ajax({
			url: adminConfig.productsBaseURL,
			type: "DELETE",
			contentType: "text/plain",
			data: productId,
			success: function(data) {
				console.log(data.code);
				// Refresh table
				$('#displayProducts').empty();
				showAllProducts();
			}
		});
	};
	var showAllProducts = function() {
		$.ajax({
			url: adminConfig.productsBaseURL + "/getAllProducts",
			type: "GET",
			success: function(data) {
				console.log(data.code);
				console.log(data.object);
				var productList = {};
				productList = data.object;
				console.log(productList.length+" product(s) found");
				var table = '<table class="table table-hover table-striped table-bordered table-condensed">\
								<thead>\
									<tr class="info">\
										<th>No.</th>\
										<th>Name</th>\
										<th>Category</th>\
										<th>Rating</th>\
										<th>Created</th>\
										<th>Updated</th>\
										<th></th>\
										<th></th>\
									</tr>\
								</thead>\
								<tbody>';
				for(var i = 0; i < productList.length; i++) {
					// Product attributes
					var productId = productList[i].productId;
					var productName = productList[i].productName;
					var category = productList[i].category;
					var productRating = productList[i].productRating;
					var productCreated = String(new Date(productList[i].productCreated)).substring(0, 25);
					var productLastUpdated = String(new Date(productList[i].productLastUpdated)).substring(0, 25);
					
					// Functions
					var deleteProductFunc = "products.deleteProduct('"+productId+"')";
					
					// Populating table row
					table += '<tr id="'+productId+'">';
					table += '<td>'+(i+1)+'</td>';
					table += '<td>'+productName+'</td>';
					table += '<td>'+category+'</td>';
					table += '<td>'+productRating+'</td>';
					table += '<td>'+productCreated+'</td>';
					table += '<td>'+productLastUpdated+'</td>';
					table += '<td><i class="fa fa-pencil"></i></td>';
					table += '<td><a href="#" onclick="'+deleteProductFunc+'"><i class="fa fa-trash"></i></a></td>';
					table += '</tr>';
				}
				table += '</tbody>';
				table += '</table>';
				$("#displayProducts").append(table);
			},
			error: function() {
				console.log("Failed to find products");
			}
		});
	};
	return {
		deleteProduct: removeProduct,
		displayAllProducts: showAllProducts
	};
}) ();