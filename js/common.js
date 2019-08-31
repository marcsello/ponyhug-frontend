function checkRegistration(this_is_registration_page, next) {

	var jwt = localStorage.getItem("ponyhug_jwt"); // no need any further check, since invalid jwt will be refused by the backend anyways
	if (jwt) {

		if (this_is_registration_page) {

            if (next) {
                var nextpage = next;
            } else {
                var nextpage = "/";
            }


 			$(location).attr("href", nextpage); // redirect user to herd.html

		}

 	} else {

		if (!this_is_registration_page) {

 			$(location).attr("href", "register.html"); // redirect user to register.html

		}


	}


}


function getFormData(jquery_selector) {


    return $(jquery_selector).serializeArray().reduce(function(obj, item) {
								obj[item.name] = item.value;
								return obj;
							}, {});

}


$( document ).ready(function () {

    var playername = localStorage.getItem("ponyhug_name"); 
    
    if (playername) {
	$("#playername").html(playername)
    }

});