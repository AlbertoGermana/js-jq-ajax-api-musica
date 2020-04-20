/* 
Attraverso una chiamata ajax all’Api di boolean avremo a disposizione una decina di dischi musicali.
Servendoci di handlebars stampiamo tutto a schermo. In questo momento non è importante la parte grafica.
quindi qua o rifacciamo da capo o finiamo il layout come da screeshot (che vi metto sotto).
BONUS: (ma solo se il resto è fatto)
 Creare una select con i seguenti generi: pop, rock, metal e jazz. In base a cosa scegliamo nella select vedremo i corrispondenti cd.
  */
$(document).ready(function(){
    // creo variabile con all'interno il compilatore Handlebar con riferimento il template .cover-template
    var source = $('#cover-template').html();
    var template = Handlebars.compile(source);
    
    $.ajax({
        url: "https://flynn.boolean.careers/exercises/api/array/music",
        method: "GET",
        success: function(data, stato){
            var album = data.response;
            console.log(album);
            
            for (var i = 0; i < album.length; i++) {
                var context = {
                    cover: album[i].poster,
                    title: album[i].title,
                    artist: album[i].author,
                    year: album[i].year
                } //context
                var html = template(context);
                $('.container').append(html);
            } //for  
        }, //success
        error: function(richiesta, stato, errore){
            console.log("E' avvenuto un errore!");
            
        } //error
    }) //ajax



    

}) //document ready
