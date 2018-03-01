
var isRealScroll = true;

$(window).on('scroll', mainNavScrollControl).trigger('scroll');
$('.m-main-navigation-item').on('click', mainNavClickControl);
$('.js-contact-us-trigger').on('click', mainNavClickControl);
$('.js-about-us-trigger').on('click', {extraPadding: 100}, mainNavClickControl);

/* Hover Effect for the Services Boxes Section */
$('.m-services-box').on('mouseenter', function() {
	var $this = $(this),
		serviceBoxSiblings = $this.closest('.js-m-services-box-wrapper').find('.m-services-box').not($this);

	$this.addClass('m-services-box-is-active');
	serviceBoxSiblings.removeClass('m-services-box-is-active');
});

function mainNavClickControl(e) {
	var $this = $(this),
		targetId = $(this).attr('href')
		extraPadding = 0;

	if ( e.data != undefined && e.data.extraPadding != undefined ) {
		extraPadding = e.data.extraPadding;
	}

	$('.m-main-navigation-item').removeClass('is-active-m-main-navigation-item');

	$this.addClass('is-active-m-main-navigation-item');

	isRealScroll = false;
	$('html, body').animate({
		scrollTop: $(targetId).position().top - extraPadding
	}, {
		duration: 1000,
		easing: 'swing',
		complete: function() {
			isRealScroll = true
		}
	});


	e.preventDefault();
}

function mainNavScrollControl() {
	headerStyleScrollChange();
	navigationItemsScrollSet();
}

function headerStyleScrollChange() {
	// changing the height and the opacity of the header
	
		if ( $(this).scrollTop() > 70 && !$('.l-main-header').hasClass('is-mobile-layout') ) {
			$('.l-main-header-top').slideUp(300);
			$('.l-main-header').addClass('l-main-header-is-scrolled')
		} else {
			$('.l-main-header-top').slideDown(300);
			$('.l-main-header').removeClass('l-main-header-is-scrolled')
		}		
	
}

function navigationItemsScrollSet() {
    var scrollPos = $(document).scrollTop();
	
	// Setting the active navigation item on scroll event - but only if it's the 'real' scroll event and not triggered by click
	if ( isRealScroll && !$('.l-main-header').hasClass('is-mobile-layout') ) {
	    $('.m-main-navigation-item').each(function () {
	        var currLink = $(this);
	        var refElement = $('#' + currLink.data('section-id'));
	        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
	            $('.m-main-navigation-item').removeClass('is-active-m-main-navigation-item');
	            currLink.addClass('is-active-m-main-navigation-item');
	        }
	        else{
	            currLink.removeClass('is-active-m-main-navigation-item');
	        }
	    });		
	}
}
