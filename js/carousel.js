$(function () {
  $('.carousel').each(function () {
    const $carousel = $(this);
    const $viewport = $carousel.find('.viewport');
    const $track = $carousel.find('.track');
    const $cards = $carousel.find('.card');
    const $prev = $carousel.find('.arrow-prev');
    const $next = $carousel.find('.arrow-next');

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
      const cardWidth = $cards.outerWidth();
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