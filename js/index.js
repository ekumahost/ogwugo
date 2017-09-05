/**
 * Created by jsking on 7/7/17.
 */


$(document).ready(function(){
    //$(".clock.flip-clock-wrapper")

    
      var clock;
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {        
        clock = $('#mobileClock').FlipClock({
            clockFace: 'DailyCounter',
            autoStart: false,
            callbacks: {
                stop: function() {
                    $('.message').html('The Blazing deals are Over!')
                }
            }
        });
      }
      else{
        clock = $('#lgClock').FlipClock({
            clockFace: 'DailyCounter',
            autoStart: false,
            callbacks: {
                stop: function() {
                    $('.message').html('The Blazing deals are Over!')
                }
            }
        });
      }
      var DealHours = 10;// in second

      if (DealHours<11) {// dealHours + 1
          $(".clock.flip-clock-wrapper").find(".flip").eq(0).css({"display":"none"});
          $(".clock.flip-clock-wrapper").find(".flip").eq(1).css({"display":"none"});
          $(".clock.flip-clock-wrapper").find(".flip-clock-divider").eq(1).css({"display":"none"});

      }
      clock.setTime(DealHours);
      clock.setCountdown(true);
      clock.start();


    
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

    }
    $(".flip").on("click", ".flip-clock-active a", function (event) {
        return false;
    });
    $(document).on("click", ".toactive", function (event) {
        $(this).addClass("mdl-button--accent");
    });

    $(".toHoverMdlShadow").hover(function(){
        $(this).addClass("mdl-shadow--2dp");
    }, function(){
        $(this).removeClass("mdl-shadow--2dp");
    });

    $('#FlashDealCarousel .item').each(function(){
        var itemToClone = $(this);

        for (var i=1;i<6;i++) {
            itemToClone = itemToClone.next();


            if (!itemToClone.length) {
                itemToClone = $(this).siblings(':first');
            }


            itemToClone.children(':first-child').clone()
                .addClass("cloneditem-"+(i))
                .appendTo($(this));
        }
    });

    $('#TechDiscCarousel .item').each(function(){
        var itemToClone = $(this);

        for (var i=1;i<4;i++) {
            itemToClone = itemToClone.next();


            if (!itemToClone.length) {
                itemToClone = $(this).siblings(':first');
            }


            itemToClone.children(':first-child').clone()
                .addClass("cloneditem-"+(i))
                .appendTo($(this));
        }
    });

    $(document).on("click", ".toSpin", function (event) {
        $(this).find(".fa").addClass("fa-spin");
    });

    $(".categories-list-box.custom li .sub-cate-list").css("left",($(".categories-list-box.custom>li").width()+14+"px"));
    $(".categories-list-box.custom li .sub-cate-list").css("height",($(".categories-list-box.custom").height()+1+"px"));

    
});


$(document).on("click", "#modalAdsPPop", function (event) {


    var dialogSpec = document.querySelector('#modalAds');
    if (dialogSpec) {
        if (! dialogSpec.showModal) {
            dialogPolyfill.registerDialog(dialogSpec);
        }
        dialogSpec.showModal();
        dialogSpec.querySelector('button:not([disabled])')
            .addEventListener('click', function() {
                dialogSpec.close();
            });
    }

});

$(document).ready(function() {
    var $scrollingDiv = $(".mdl-dialog");
    var mobile = (/iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));

    $(window).scroll(function(){
        if (mobile) {
// it is a mobile device so we do not swing the modals
        }else {
            $scrollingDiv.stop().animate({"top": ($(window).scrollTop() + 72) + "px"}, "slow");
        }
    });



    var $scrollingDivcat = $(".mdl-reg-dialog");

    $(window).scroll(function(){
        $scrollingDivcat
            .stop()
            .animate({"top": ($(window).scrollTop() + 100) + "px"}, "slow" );
    });



// close any modal by the id when we click on the backdrop
   function BackdropClose(modalID){
       var ControlCard = document.querySelector(modalID);
       ControlCard.addEventListener('click', function (event) {
           var rect = ControlCard.getBoundingClientRect();
           var isInDialog=(rect.top <= event.clientY && event.clientY <= rect.top + rect.height && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
           if (!isInDialog) {
               ControlCard.close();
           }
       });


   }


    BackdropClose('#modalAds');
    BackdropClose('#RequestModalDialog');
    BackdropClose('#AddGiftCard');
    BackdropClose('#CreateStore');
    BackdropClose('#DPersonnel');
   BackdropClose('#SubmitTeller');





});