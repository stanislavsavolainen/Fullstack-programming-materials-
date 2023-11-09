
//anti-bootsrap css styles updater

console.log("Force updater begined !");

setTimeout(function () {
    
    //$(".priceblock2").css("color", "blue");
    //$(".priceblock1").css("color", "green");

    $.when($.get("styles/mainstyles.css")).done(function(response){
        //alert(response)

        // 1:  main problem is bootstrap, don't allow custom styles, such as font: color, size,
        // types like italic or anything else rich text properties

        // 2 : parse css key-value pairs and force insert it to html components, after
        //page is loaded and bootstrap styles are done.

        // 3: dont't do it at the moment, css !important paremeter solve some problems...

        console.log("Force updater done !");
    });

}, 2000);


