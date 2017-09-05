$(document).ready(function () {

	/*$(".dropdown.cartMenu").hover(function(){
		$(this).addClass("open");
		$(this).find(".dropdown-toggle").attr("aria-expanded","true");
	}, function(){
		$(this).removeClass("open");
		$(this).find(".dropdown-toggle").attr("aria-expanded","false");
	});*/
	// $("#country_selector").countrySelect({
	// 	//defaultCountry: "jp",
	// 	//onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
	// 	preferredCountries: ['ca', 'gb', 'us']
	// });
	$("#home-leftmenu .sub-cate").css({"width": $(".banner-sec").width()+"px", "left": $("#home-leftmenu").width()+"px"});

	if ($(".banner-sec").width()==undefined) {
		if ($(window).width()>=768) {
			menuWidth = ($(window).width()* (76.33333333/100));
		}
		$(".slider-top-menu .sub-cate").css({"width": menuWidth+"px", "top": "35px", "position": "absolute"});
		
		$(".slider-top-menu li").each(function(){
	        $(this).find(".sub-cate").css({"left": "-"+($(this).offset().left-$(".list-inline.slider-top-menu.no-side-padd").offset().left)+"px"})
	    });
	}
	else{
		$(".slider-top-menu .sub-cate").css({"width": $(".banner-sec").width()+"px", "top": "35px", "position": "absolute"});
		$(".slider-top-menu li").each(function(){
	        $(this).find(".sub-cate").css({"left": "-"+($(this).offset().left-$(".banner-sec").offset().left)+"px"})
	    });
	}

	setTimeout(function(){
		$(".auth-form").parent().addClass("right-0-lg")
	},2000);

	$('.dropdown.cartMenu.login').find("button").click(function(e){
			// checked the dropdown either added or not the mdl runtime class in onload, to add box-shadow of the .cartMenu class
			if($(this).parent().siblings(".auth-form").html()==undefined){
				$('.dropdown.cartMenu.login').toggleClass("active");
			}
			
	});
	$(document).mouseup(function (e)
	{
	    var container = $(".dropdown.cartMenu.login");

	    if (!container.is(e.target) // if the target of the click isn't the container...
	        && container.has(e.target).length === 0) // ... nor a descendant of the container
	    {
	        $('.dropdown.cartMenu.login').removeClass("active");
	    }
	});
	
	$("#selectAllCate li a").click(function(){
		$("#txtAllCate").val($(this).text()).attr("data-value",$(this).parent("li").attr("data-value")).parent(".mdl-textfield").addClass("is-dirty");
	});

	mdlInput();

	$(document).on("click", "#NewAdder", function(){
		mdlInput();
	})

	$(".mdl-radio__outer-circle").click(function(){
		$(this).parent(".mdl-radio").click();
		//alert($(this).siblings("a").attr("href"));
	});

	$(".t-categories-list-box>li>a").click(function(){
		$(this).siblings(".sub-cate").css("display","block");
		return false;
	});

	$(".t-categories-list-box li .sub-cate").click(function(e){
		e.stopPropagation();
	});

	$(".t-categories-list-box li").each(function(index){
		$(this).find(".sub-cate").append('<button id="BackBtn'+index+'" class="btn-back"><i class="material-icons">keyboard_backspace</i></button> <div class="mdl-tooltip" data-mdl-for="BackBtn'+index+'"><strong>Back</strong>')
	});
	$(".btn-back").click(function(){
		$(this).parents(".sub-cate").css("display","none");
	});
//	alert($(".navbar.navbar-tshop .mdl-layout__container").attr("class"));
//	$(".navbar.navbar-tshop .mdl-layout__container").addClass("activated");
	

	
	$('.carousel').carousel({
      //cycle: false
    });
	/*$("a.product-slider-control").hover(function(){
		if ($(this).hasClass("disabled")) {
			//$(this).toggleClass("mdl-button mdl-js-button mdl-button--fab");
		}
		else{
			$(this).toggleClass("mdl-button--colored");
		}
	});
    $("a.product-slider-control.next").click(function(e){
    	$(this).closest('.carousel').find(".control-box").find(".prev").removeAttr('disabled');
    	if($(this).closest('.carousel').find('.carousel-inner').find('.item:last').hasClass('active')){
    		//$(this).addClass("disabled");
	    	e.preventDefault();
	    	return false;
	    }
    });
    $("a.product-slider-control.prev").click(function(e){
    	$(this).closest('.carousel').find(".control-box").find(".next").removeAttr('disabled');
    	if($(this).closest('.carousel').find('.carousel-inner').find('.item:first').hasClass('active')){
    		//$(this).addClass("disabled");

	    	e.preventDefault();
	    	return false;
	    }
    });*/

    $('carousel').on('slid.bs.carousel', '', function(e) {
	  var $this = $(this);

	  if($(this).find(".carousel-inner").find('.item:first').hasClass('active')) {
	    //$this.find('.prev').addClass("disabled");
	    $this.find('.prev').attr('disabled', 'disabled');
	  } else if($(this).find(".carousel-inner").find('.item:last').hasClass('active')) {
	    //$this.find('.next').addClass("disabled");
	    $this.find('.next').attr('disabled', 'disabled');
	  }
	});

    // this click event used to stop vimeo video in Product page when click close button
	$(document).on("click",".ajs-close",function(){
        $(this).parents(".ajs-modal").find("iframe").attr("src",($(this).parents(".ajs-modal").find("iframe").attr("src")));
	});
	
	// $(document).on("click","header .mdl-layout__drawer-button",function(){
 //        $(".navbar.navbar-tshop .mdl-layout__container").toggleClass("activated");
 //    });
    
});

$(document).click(function(){
    if($("header .mdl-layout__drawer-button").attr("aria-expanded")=="false"){
        $(".navbar.navbar-tshop .mdl-layout__container").removeClass("activated");     
        $(".navbar-fixed-top.megamenu .mdl-layout__container").css("height","120px")
    }
});
$(document).on("click", ".navbar-fixed-top.megamenu .mdl-layout__container .mdl-layout__drawer-button", function(){
   $(".navbar-fixed-top.megamenu .mdl-layout__container").css("height","100%")
   $(".navbar.navbar-tshop .mdl-layout__container").addClass("activated");
});
function mdlInput(){
	$("input").each(function(){
		if ($(this).val()!="") {
			$(this).parent(".mdl-textfield").addClass("is-dirty");
		}
	});
	$('input').change(function() { 
		if ($(this).val()!="") {
			$(this).parent(".mdl-textfield").addClass("is-dirty");
		}
	});
}



    $(document).ready(function(){

    	// 	Login Mobile-View MDL Modal
        var MblLoginMdlDialog1 = document.getElementById("MdlLoginDialog");
        var showMblLoginMdlDialogButton = document.querySelector('#SignInBTNMobile');
        
        if (! MblLoginMdlDialog1.showModal) {
          dialogPolyfill.registerDialog(MblLoginMdlDialog1);
        }
        showMblLoginMdlDialogButton.addEventListener('click', function() {
          MblLoginMdlDialog1.showModal();
        });
        MblLoginMdlDialog1.querySelector('.close').addEventListener('click', function() {
          MblLoginMdlDialog1.close();
        });

        // 	Login MDL Modal
        var dialogBTNdrop = document.getElementById("MdlLoginDialog");
        var showDialogButton = document.querySelector('#SignInBTN');
        if (! dialogBTNdrop.showModal) {
          dialogPolyfill.registerDialog(dialogBTNdrop);
        }
        showDialogButton.addEventListener('click', function() {
            dialogBTNdrop.showModal();
        });
        dialogBTNdrop.querySelector('.close').addEventListener('click', function() {
            dialogBTNdrop.close();
        });



        // 	Login MDL Modal ccap
        var dialogcap = document.getElementById("MdlLoginDialog");
        var showDialogButton = document.querySelector('#SignInBTNi');
        if (! dialogcap.showModal) {
            dialogPolyfill.registerDialog(dialogcap);
        }
        showDialogButton.addEventListener('click', function() {
            dialogcap.showModal();
        });
        dialogcap.querySelector('.close').addEventListener('click', function() {
            dialogcap.close();
        });
        //  Orders Edit MDL Modal
    	
		
	    // dialogOEDM1.querySelector('.close').addEventListener('click', function() {
	    //   dialogOEDM1.close();
	    // });

    });
    $(document).on("click","#showEditOrderModal1",function(){
    		var dialogOEDM1 = document.getElementById("orderDetailsEditModal");
		//var showEditOrderDialogButton = document.getElementsByClassName("showEditOrderModal")[0];
	    var showEditOrderDialogButton1 = document.querySelector('#showEditOrderModal1');
	    if (! dialogOEDM1.showModal) {
	      dialogPolyfill.registerDialog(dialogOEDM1);
	    }
	    dialogOEDM1.showModal();
	    $("#MakePayment").modal("hide");
	    // showEditOrderDialogButton1.addEventListener('click', function() { alert();
	    //   dialogOEDM1.showModal();
	    // });
	});

		$("#SignInBTNMobile").click(function(){
			//$("header .mdl-layout__drawer-button").attr("aria-expanded","false");
			$(".mdl-layout__drawer-button").click();
			$(".navbar.navbar-tshop .mdl-layout__container").removeClass("activated");
		});
    //  Orders Edit MDL Modal
    
	var dialogOEDM = document.getElementById("orderDetailsEditModal");
    var showEditOrderDialogButton = document.querySelector('#showEditOrderModal');
    if (! dialogOEDM.showModal) {
      dialogPolyfill.registerDialog(dialogOEDM);
    }
    showEditOrderDialogButton.addEventListener('click', function() {
      dialogOEDM.showModal();
    });
    dialogOEDM.querySelector('.close').addEventListener('click', function() {
      dialogOEDM.close();
    });


    //  Orders Accept MDL Modal

	var dialogOADM = document.getElementById("orderAcceptModal");
    var showAcceptOrderDialogButton = document.querySelector('#showAcceptOrderModal');
    if (! dialogOADM.showModal) {
      dialogPolyfill.registerDialog(dialogOADM);
    }
    showAcceptOrderDialogButton.addEventListener('click', function() {
      dialogOADM.showModal();
    });
    dialogOADM.querySelector('.close').addEventListener('click', function() {
      dialogOADM.close();
    });

    //  Orders Reject MDL Modal

	var dialogORDM = document.getElementById("RejectModal");
    var showRejectOrderDialogButton = document.querySelector('#showRejectOrderModal');
    if (! dialogORDM.showModal) {
      dialogPolyfill.registerDialog(dialogORDM);
    }
    showRejectOrderDialogButton.addEventListener('click', function() {
      dialogORDM.showModal();
    });
    dialogORDM.querySelector('.close').addEventListener('click', function() {
      dialogORDM.close();
    });

    //  Orders Payment MDL Modal

	var dialogORPM = document.getElementById("MakePayment");
    var showPaymentOrderDialogButton = document.querySelector('#ShowMakePaymentModal');
    if (! dialogORPM.showModal) {
      dialogPolyfill.registerDialog(dialogORPM);
    }
    showPaymentOrderDialogButton.addEventListener('click', function() {
      dialogORPM.showModal();
    });
    dialogORPM.querySelector('.close').addEventListener('click', function() {
      dialogORPM.close();
    });