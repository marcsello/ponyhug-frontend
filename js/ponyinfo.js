$( document ).ready(function () {

    var searchParams = new URLSearchParams(window.location.search)

    if (searchParams.has('ponyid')) {

            var ponyid = searchParams.get('ponyid');

    } else {
        $("#content_container").html(":(");
        return;
    }

    $.ajax({
        type: "GET",
        url: API_URL + "/ponies/" + ponyid,
        headers: {"Authorization" : "Bearer " + localStorage.getItem("ponyhug_jwt")},
        dataType: "json",
        statusCode: {
            404 : function() { // unknown (or unhugged) pony
                $("#content_container").html(":(");
            },
            200 : function(data) { // ponyget successful
                $("#content_container").html(template(data)); // please work

                    if (searchParams.has('justhugged')) { // qr code has been read
                        $("h1").html("Póni ölelés!!");
                        $("h1").css('color', '#39a33c');
                    }
            }
        }
    });

    // Template stuff

    Handlebars.registerHelper('count', function (arr) {
        return arr.length;
    });
    
    Handlebars.registerHelper('src_link', function(url) {
        
        if ((!url) || (url == '') || (url === null)) { // I don't trust JS
            return "";
        }
    
        url = Handlebars.escapeExpression(url);        
      
        return new Handlebars.SafeString(
          "<a href='" + url + "'>forrás</a>"
        );
    });

    var template_source = document.getElementById("content_template").innerHTML;
    var template = Handlebars.compile(template_source);


});
