//Embed Code
$('#generateCode').click(function() {
	console.log("Inside c");
	
	$("#codeText").removeClass( 'hidden' );
	var pre = $("<pre />");
	var p=$('<code />');
	var p1 = $("<p />");
	p1.text("<div class=\"side-bar\">");
	var p2 =$("<p />");
	p2.text("<div>");
	
	var code =	"<div class=\"ratingPlugin\"><div class=\"showOverallRating\" id=\"show-overall-rating\"></div><div class=\"showUserRating\" id=\"show-user-rating\"></div><div class=\"showRateComntsBox\" id=\"show-rate-comnts-box\"limitRatingToOne=YES></div></div>";
	
	var code_new = code.replace(/&lt;/g, "&lt;\n");
	p.text(code_new);
	
	p.appendTo('#code');
	return false;
});
