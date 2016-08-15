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
	//var code2 = "<div>";
	//var code1 = $("<p>Hello!!</p>");
	//code1.append('\n');
	var code =	"<div class=\"side-bar\"> <div>&lt;<div role=\"tabpanel\" style=\"border: 1px solid; padding: 5px;\">" +
			"<h4>User Community</h4>" +
			"<div id=\"MyBoard\">" +
			"<div class=\"roundCorner\">" +
			"<table class=\"table\" id=\"userpoints\"></table></div></div><div class=\"roundCorner\"><div class=\"row\"><div class=\"col-md-12\" id=\"userbadges\"style=\"padding-top: 10px;\"></div></div></div><div class=\"roundCorner\"><div class=\"row\"><div class=\"col-md-12\" id=\"leaderboard\"></div></div></div></div></div></div>";	
	//var code="<div class=\"side-bar\">";
	//var code1="<div role=\"tabpanel\" style=\"border: 1px solid; padding: 5px;\">";
	//code = code+code1;
	var code_new = code.replace(/&lt;/g, "&lt;\n");
	p.text(code_new);
	//p.append(("<script type=\"text/javascript\" src=\"js/gamification.js\"></script>").html());
	//code.nl2br();
	//p.align(justify);
	//p1.append(p2);
	
	//p.text(code3);
	//pre.append(p);
	p.appendTo('#code');
	return false;
});



/*String.prototype.nl2br = function()
{
    return this.replace(/\n/g, "<br />");
}*/

/*jQuery.nl2br = function(varTest){
	  return varTest.replace(/(\r\n|\n\r|\r|\n)/g, "<br>");
	};
	
	
	$(function(){
	     var code = $('#code').text().replace(/&lt;/g, "&lt;\n");
	     $('#code').text(code);    
	});*/