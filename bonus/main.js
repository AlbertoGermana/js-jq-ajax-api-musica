$(document).ready(function(){
    // preparo handlebars    
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);            

    //chiamata all'api
    $.ajax({
        url: "https://flynn.boolean.careers/exercises/api/array/music",
        method: "GET",
        success: function(risultato){
            //salvo tutto il risultato dentro la variabile
            var listaAlbum = risultato.response;

            //scorro col ciclo per stampare in html tutti gli elementi
            // completi di dati grazie all'aiuto di handlebars
            for(var i = 0; i < listaAlbum.length; i++) {
                //alla singola iterazione salvo i dati dell'album nella variabile                
                var albumCorrente = listaAlbum[i];
                
                //variabile da far "digerire" a handlebars con i dati da stampare su html
                var context = {
                    cover: albumCorrente.poster,
                    title: albumCorrente.title,
                    genre: albumCorrente.genre,
                    artist: albumCorrente.author,
                    year: albumCorrente.year
                }

                //in questa variabile salvo ciò che deve essere passato in html
                var html = template(context);
                //appendo html ad ogni iterazione creando una nuova "card"
                $('.container').append(html);
            }  
        },
        error: function(){}
    });

    //alla selezione di un genere
    $('.container-select select').on("input", function(){
        //salvo su "filtro" il valore di ciò che ho selezionato (in minuscolo)
        var filtro = $(this).val().toLowerCase();
        
        // ad ogni elemento con classe .card
        $('.card').each(function(){
            //crea variabile che conserva il valore del "data-attribute"
            // della singola cover (in minuscolo) ad ogni iterazione dell'each
            var genereCover = $(this).data("genre").toLowerCase();
            
            // se ciè che seleziono (filtro) è nullo oppure uguale al data-attribute
            // della cover che sta iterando in quel momento
            if (filtro === "" || filtro === genereCover){
                //mostra tutte le cover con quel genere
                $(this).show();
            
            }else{ //altrimenti
                //nascondi tutte le cover senza quel genere
                $(this).hide();
            }
        });
    });
});
