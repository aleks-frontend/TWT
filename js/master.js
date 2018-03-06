$(window).on('resize', function() {
	if ( $('.m-hamburger-menu').is(':visible') ) {
		$('.l-main-header').addClass('is-mobile-layout');
	} else {
		$('.l-main-header').removeClass('is-mobile-layout');
	}
}).trigger('resize');

$('.m-hamburger-menu').on('click', function() {
	var mainNavigation = $('.m-main-navigation'),
		hamburgerMenuBtn = $(this);

	if ( !mainNavigation.hasClass('is-scrolled-in') ) {
		mainNavigation.addClass('is-scrolled-in');
		hamburgerMenuBtn.addClass('is-in-x-mode');
		mainNavigation.after('<div class="mobile-menu-overlay"></div>')
		$('.mobile-menu-overlay').animate({
			opacity: 0.8
		});

		$('.mobile-menu-overlay').on('click', function() {
			mainNavigation.removeClass('is-scrolled-in');
			hamburgerMenuBtn.removeClass('is-in-x-mode');
			$('.mobile-menu-overlay').fadeOut(300, function() {
				$(this).remove();
			});
		})
	} else {
		mainNavigation.removeClass('is-scrolled-in');
		hamburgerMenuBtn.removeClass('is-in-x-mode');
		$('.mobile-menu-overlay').fadeOut(300, function() {
			$(this).remove();
		});
	}
});

$('.js-job-post-hidden-toggle').on('click', function(e) {
	var $this = $(this),
		hiddenText = $this.closest('.m-job-posts_item').find('.m-job-posts_hidden-text');

	if ( hiddenText.is(':visible') ) {
		$this.text('Read more');
		hiddenText.slideUp(600);
	} else {
		$this.text('Read less');
		hiddenText.slideDown(600);
	}

	e.preventDefault();
})
