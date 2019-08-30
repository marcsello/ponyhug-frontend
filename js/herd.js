$( document ).ready(function () {



    $.ajax({
        type: "GET",
        url: API_URL + "/hugs",
        headers: {"Authorization" : "Bearer " + localStorage.getItem("ponyhug_jwt")},
        dataType: "json",
        statusCode: {
            200 : function(data) { // ponyget successful
                $("#content_container").html(template(data)); // please work
            }
        }
    });


    var template_source = document.getElementById("content_template").innerHTML;
    var template = Handlebars.compile(template_source);

});
