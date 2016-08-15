var name;
		var points;
		var activeUrl;
		var disabledUrl;
		var period;
		var id;
		var baseURL = adminConfig.userBaseURL;
		var editBadgeURL = baseURL+"/editBadge";
		
		window.onload = badgeDetails();

		function badgeDetails() {
			if (window.location.href.indexOf("badgeName") > -1) {
				name = getParameterByName('badgeName');
				console.log(name);

			}
			if (window.location.href.indexOf("activationPoints") > -1) {
				points = getParameterByName('activationPoints');
				console.log(points);

			}
			if (window.location.href.indexOf("activeBadgeUrl") > -1) {
				activeUrl = getParameterByName('activeBadgeUrl');
				console.log(activeUrl);

			}
			if (window.location.href.indexOf("disabledBadgeUrl") > -1) {
				disabledUrl = getParameterByName('disabledBadgeUrl');
				console.log(disabledUrl);

			}
			if (window.location.href.indexOf("badgeId") > -1) {
				id = getParameterByName('badgeId');
				console.log(id);

			}
			assignValue();
		}

		function assignValue() {
			$('#badgeName').val(name);
			$('#activationPoints').val(points);
			$('#activeUrl').val(activeUrl);
			$('#disabledUrl').val(disabledUrl);
		}

		function getParameterByName(name) {
			name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
			var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex
					.exec(location.search);
			return results === null ? "" : decodeURIComponent(results[1]
					.replace(/\+/g, " "));
		}
		
		$('#editBadgeButton').click(function() {
			editData();
			return false;
		});
		function editData(){	
			$.ajax({
				type: 'POST',
				contentType: 'application/json',
				url: editBadgeURL,
				dataType: "json",
				data: JSON.stringify({"badgeId":id,"badgeName": $('#badgeName').val(),"activeBadgeUrl": $('#activeUrl').val(),"disabledBadgeUrl": $('#disabledUrl').val()}),
				success: function(data){
					console.log(data);
					if(data.code == "771") 
					{
						console.log("Badge updated"); 
						window.opener.location.reload();
						window.close();
					}
					if(data.code == "772") 
					{
						$("#error-window").removeClass( 'hidden' );
						$("#error-msg-login").text("Badge Update Failed!!");
					}
					
				},
				error: function(jqXHR, textStatus, errorThrown){
					alert('LoginUser error: ' + textStatus);
				}
			});
		}