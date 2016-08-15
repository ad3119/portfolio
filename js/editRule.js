var name;
		var desc;
		var status;
		var value;
		var type;
		var period;
		var id;
		var baseURL =adminConfig.userBaseURL;
		var editRuleURL = baseURL + "/editRule";

		window.onload = ruleDetails();

		function ruleDetails() {
			if (window.location.href.indexOf("ruleName") > -1) {
				name = getParameterByName('ruleName');
				console.log(name);

			}
			if (window.location.href.indexOf("ruleDesc") > -1) {
				desc = getParameterByName('ruleDesc');
				console.log(desc);

			}
			if (window.location.href.indexOf("status") > -1) {
				status = getParameterByName('status');
				console.log(status);

			}
			if (window.location.href.indexOf("actionValue") > -1) {
				value = getParameterByName('actionValue');
				console.log(value);

			}
			if (window.location.href.indexOf("activityType") > -1) {
				type = getParameterByName('activityType');
				console.log(type);

			}
			if (window.location.href.indexOf("applyPeriod") > -1) {
				period = getParameterByName('applyPeriod');
				console.log(period);

			}
			if (window.location.href.indexOf("ruleId") > -1) {
				id = getParameterByName('ruleId');
				console.log(period);

			}
			assignValue();
		}

		function assignValue() {
			$('#ruleName').val(name);
			$('#ruleDesc').val(desc);
			$('#actionValue').val(value);
			$('#status').val(status);
			$('#activityType').val(type);
			$('#applyPeriod').val(period);
		}

		function getParameterByName(name) {
			name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
			var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex
					.exec(location.search);
			return results === null ? "" : decodeURIComponent(results[1]
					.replace(/\+/g, " "));
		}

		$('#editRuleButton').click(function() {
			editData();
			return false;
		});

		function editData() {

			$.ajax({
				type : 'POST',
				contentType : 'application/json',
				url : editRuleURL,
				dataType : "json",
				data : JSON.stringify({
					"ruleId" : id,
					"ruleName" : $('#ruleName').val(),
					"ruleDesc" : $('#ruleDesc').val(),
					"activityType" : $('#activityType').val(),
					"actionValue" : $('#actionValue').val(),
					"applyPeriod" : $('#applyPeriod').val(),
					"status" : $('#status').val()
				}),
				success : function(data) {
					console.log(data);
					if (data.code == "761")
					{
						console.log("Rule updated");
						window.opener.location.reload();
						window.close();
					}
					if (data.code == "762") 
					{
						$("#error-window").removeClass('hidden');
						$("#error-msg-login").text("Rule Update Failed!!");
					}

				},
				error : function(jqXHR, textStatus, errorThrown) {
					alert('LoginUser error: ' + textStatus);
				}
			});

		}