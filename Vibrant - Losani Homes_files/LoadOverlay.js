
$(window).on("load", function () {
    //these snippets will pop in under the loading gif
    var words = [
        '"..our buyers are not just selecting a home, they are choosing a lifestyle."',
        '"..We see a future where quality, service and value are shaped through a tradition of excellence and an emphasis on innovation."',
        '"..Our team of in-house experts are committed to ensuring that each and every Losani homeowner has a rewarding and life enriching experience."',
        '"..Every kind of home for every kind of family."'
    ]
    //get a random snippet to show
    var item = words[Math.floor(Math.random() * words.length)];
    $('#overlay-words').text(item);

    //slide and fade in the snippet
    $(".overlay-text").fadeIn({ queue: false, duration: 'fast' }).animate({ left: "0px" }, 'fast');
    setTimeout(function () {

        //slide the overlay up and hide
        $("#overlay ").animate({ height: '0px' }, 200, 'linear', function () {
            $("#overlay").hide();
            $(".navbar").show();
        });
        $("#overlayLogo ").animate({ height: '50px', width: '150px', top: '5%' }, 200, 'linear', function () {
            //callback when animation finished

        });
    }, 1000);
    $(this).css('display', 'none');
});
$(document).ready(function () {
    //if overlay fails to hide this will force hide if animations dont work. 
    setTimeout(function () {//wait 4 seconds if animations are working 
        //jquery try hide
        $("#overlay").hide();
        //pure JS hide failsafe
        document.getElementById('overlay').style.visibility = 'hidden';
    }, 4000);
})