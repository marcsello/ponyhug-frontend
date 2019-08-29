$( document ).ready(function () {


	$("#hug_form input").on("input",function() {
			$("#errortext").html("&nbsp;");
	});


    function submitKey(key) {
        if (!key) {
            return;
        }

    	$.ajax({
		    type: "POST",
		    url: API_URL + "/hugs",
		    data: JSON.stringify({"key" : key}),
		    contentType: "application/json; charset=utf-8",
            headers: {"Authorization" : "Bearer " + localStorage.getItem("ponyhug_jwt")},
		    dataType: "json",
		    statusCode: {
			    404 : function() { // unknown key
                    $("#errortext").html("This key is invalid");
                    $('#hug_form').prop("disabled", false);
			    },
			    409 : function() { // conflict
                    $("#errortext").html("This pony have already been hugged");
                    $('#hug_form').prop("disabled", false);
			    },
                201 : function(data) { // successful hug!
                    $(location).attr("href", "ponyinfo.html?ponyid=1&justhugged"); // redirect user to the hugged pony
			    }
		    }
	    });




    }



	$("#hug_form").submit(function(event) {
		event.preventDefault()

        $('#hug_form').prop("disabled", true);

        var hug_form_data = getFormData("#hug_form");
        submitKey(hug_form_data.ponykey);

        return false;

    });



    var searchParams = new URLSearchParams(window.location.search)

    if (searchParams.has('key')) { // qr code has been read
        $('#hug_form input').val(searchParams.get('key'));
        $("#hug_form").submit();
    }


});
