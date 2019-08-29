
$('#register_form').submit(function (event)  {
	event.preventDefault()
	
	

	var register_form_data = $('#register_form').serializeArray().reduce(function(obj, item) {
							obj[item.name] = item.value;
							return obj;
						}, {});
	
	
	$.ajax({
		type: "POST",
		url: API_URL + "/register",
		data: JSON.stringify(register_form_data),
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(data){
			alert(data.jwt);
		},
		failure: function(errMsg) {
			alert(errMsg);
		}
	});


	return false;
});