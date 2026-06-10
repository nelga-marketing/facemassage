$(function () {
	const $lightbox = $('#lightbox');
	const $image = $lightbox.find('.lightbox-image');

	$('[data-lightbox-image]').on('click', function (event) {
		const src = $(this).attr('data-lightbox-image');

		event.preventDefault();
		$image.attr('src', src);
		$lightbox.addClass('lightbox-open');
		$('body').css('overflow', 'hidden');
	});

	$lightbox.on('click', function (event) {
		if (event.target === this || $(event.target).hasClass('lightbox-close')) {
			$lightbox.removeClass('lightbox-open');
			$image.attr('src', '');
			$('body').css('overflow', '');
		}
	});

	$(document).on('keydown', function (event) {
		if (event.key === 'Escape') {
			$lightbox.removeClass('lightbox-open');
			$image.attr('src', '');
			$('body').css('overflow', '');
		}
	});
});
