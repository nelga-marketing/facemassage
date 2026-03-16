$(function () {
	$('.carousel').each(function () {
		const $carousel = $(this);

		// Build expected markup if cards are direct children.
		if (!$carousel.children('.viewport').length) {
			const $directCards = $carousel.children('.card');
			if ($directCards.length) {
				$directCards.wrapAll('<div class="viewport"><div class="track"></div></div>');
			}
		}

		const $viewport = $carousel.children('.viewport');
		const $track = $viewport.children('.track');
		const $cards = $track.children('.card');
		const $prev = $carousel.children('.arrow-prev');
		const $next = $carousel.children('.arrow-next');

		if (!$track.length || !$cards.length) return;

		let index = 0;
		let perView = 2;
		let maxIndex = 0;

		function getGap() {
			return parseFloat($track.css('gap')) || 0;
		}

		function updateMetrics() {
			perView = window.innerWidth <= 991 ? 1 : 2;
			maxIndex = Math.max(0, $cards.length - perView);
			if (index > maxIndex) index = maxIndex;
		}

		function update() {
			updateMetrics();

			const gap = getGap();
			const cardWidth = $cards.first().outerWidth() || 0;
			const step = cardWidth + gap;
			const offset = index * step;

			$track.css('transform', 'translateX(-' + offset + 'px)');
			$prev.prop('disabled', index === 0);
			$next.prop('disabled', index === maxIndex);
		}

		$next.on('click', function () {
			if (index < maxIndex) {
				index += 1;
				update();
			}
		});

		$prev.on('click', function () {
			if (index > 0) {
				index -= 1;
				update();
			}
		});

		$(window).on('resize', update);
		update();
	});
});
