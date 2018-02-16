function mainNavControl() {
	var targetId = $(this).data('section-id');
	console.log(targetId);
}

$('.m-main-navigation li').on('click', mainNavControl);

$('.m-main-navigation li a').on('click', function(e) {
	e.preventDefault();
});