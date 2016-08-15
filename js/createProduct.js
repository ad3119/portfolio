var i = 1;

$("#submit").click(function() {
	var x = 0;	//counter
	var product = {};
	var name = $("#productName").val().trim();
	var description = $("#description").val().trim();
	var category = $('#category').find(":selected").text();
	var price = $("#price").val().trim();
	
	var specs = [ ];
	while($("#attr"+x).length) {
		if($("#attr"+x).val().trim() != "" && $("#val"+x).val().trim() != "") {
			specs.push({name: $("#attr"+x).val().trim(), value: $("#val"+x).val().trim()});
		}
		x++;
	}
	product.productName = name;
	product.description = description;
	product.category = category;
	
	product.price = price;
	product.specs = specs;
	console.log(product);
	
	$.ajax({
		url: adminConfig.productsBaseURL + "/insertProduct",
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(product),
		async: false,
		success: function(data) {
			console.log(data.code);
			$('#productForm')[0].reset();
		},
		error: function() {
			console.log("Insert product failed");
		}
	});
});


function loadfromFile()  {
	var temp = productsTODb;
	alert(""+temp.length);
	$.each(temp ,function(index,value) {
		if(index < 198) {
		value.id = index+1;
		console.log(value.id);
		value.price = Math.floor((Math.random() * 100000) + 1);
		value.category = "Camera";
		$.ajax({
			url: adminConfig.productsBaseURL + "/insertProduct",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(value),
			async: false,
			success: function(data) {
				console.log(data.code);
			},
			error: function() {
				console.log("Insert product failed");
			}
		});
		}
	})
}


function insertKeyValueFields() {
	var key = '<div class="form-group pull-left" style="width: 50%; display: inline-block">'+
					'<input type="text" id="attr'+i+'" placeholder="Attribute" class="form-control" />'+
				'</div>';
	var value = '<div class="form-group pull-right" style="width: 50%; display: inline-block">'+
					'<input type="text" id="val'+i+'" placeholder="Value" class="form-control" />'+
				'</div>';					
		
	$("#techSpecs").append(key);
	$("#techSpecs").append(value);
	i++;
}
