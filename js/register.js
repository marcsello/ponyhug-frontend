$( document ).ready(function () {

	$("#register_form input").on("input",function() {
			$("#errortext").html("&nbsp;");
	});


	$('#register_form').submit(function(event)  {
		event.preventDefault()



        var register_form_data = getFormData("#register_form");

		var playername = register_form_data.playername;


		$('#register_form').prop("disabled", true);

		$.ajax({
			type: "POST",
			url: API_URL + "/register",
			data: JSON.stringify(register_form_data),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			statusCode: {
				403 : function() {
					$("#errortext").html("Ez a név már használatban van!");
					$('#register_form').prop("disabled", false);
				},
				201 : function(data) {
					if (data.jwt) {
						localStorage.setItem("ponyhug_jwt",data.jwt);
						localStorage.setItem("ponyhug_name",data.playername);
						$(location).attr("href", "/"); // redirect user to herd.html

					} else {
						$("#errortext").html("Could not get JWT token"); // faszom ez csak maradhat angol...
						$('#register_form').prop("disabled", false);
					}
				}
			}
		});


		return false;
	});


});
