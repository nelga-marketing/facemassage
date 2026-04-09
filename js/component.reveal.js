document.addEventListener('DOMContentLoaded', function () {
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const revealRegistry = [];
	const groupConfigs = [
		{
			selector : '#hook h4, #hook h1, #hook h5, #hook .cta-row, #hook .visual',
			step     : 90
		},
		{
			selector : '#problem .image-placeholder, #problem .problem-content h4, #problem .problem-content h1, #problem .problem-content h5, #problem .problem-content .cta-row',
			step     : 80
		},
		{
			selector : '#lesson .lesson-copy h1, #lesson .lesson-body h5, #lesson .lesson-figure h4, #lesson .lesson-notes li, #lesson .lesson-flow, #lesson .lesson-media',
			step     : 75
		},
		{
			selector : '#master .master-head h1, #master .master-head h4, #master .master-media, #master .master-intro h3, #master .master-list li, #master .master-list > h5, #master .master-list > h4',
			step     : 85
		},
		{
			selector : '#mechanism .mechanism-copy h1, #mechanism .mechanism-copy h4, #mechanism .mechanism-copy h5, #mechanism .mechanism-copy .cta-row, #mechanism .gallery-card',
			step     : 85
		},
		{
			selector : '#proof .intro h4, #proof .intro h1, #proof .top-image, #proof .proof-copy h5, #proof .proof-subtitle, #proof .card, #proof .arrow',
			step     : 80
		},
		{
			selector : '#education .education-center h3',
			step     : 0
		},
		{
			selector : '#education .circle-center',
			step     : 120,
			modifier : 'reveal-pop'
		},
		{
			selector : '#education .circle-1, #education .circle-2, #education .circle-3, #education .circle-4, #education .circle-5, #education .circle-6',
			step     : 90,
			modifier : 'reveal-pop'
		},
		{
			selector : '#education .education-card',
			step     : 85,
			modifier : 'reveal-soft'
		},
		{
			selector : '#authority .authority-copy h1, #authority .authority-copy h5, #authority .authority-copy .cta-row, #authority .authority-media',
			step     : 90
		},
		{
			selector : '#upgrade .offer-again-copy h1, #upgrade .offer-again-copy h4, #upgrade .offer-again-copy h5, #upgrade .offer-card, #upgrade .offer-again-foot h4',
			step     : 90
		},
		{
			selector : '#guarantee .guarantee-shell h1, #guarantee .guarantee-shell h3, #guarantee .guarantee-shell h5, #guarantee .guarantee-lines li, #guarantee .guarantee-feature, #guarantee .guarantee-media, #guarantee .guarantee-actions',
			step     : 85
		},
		{
			selector : '#faq .faq-head h1, #faq .faq-head h5, #faq .faq-side-image, #faq .faq-card, #faq .faq-bottom',
			step     : 80
		},
		{
			selector : '#final-cta .final-cta-copy h1, #final-cta .final-cta-copy h4, #final-cta .final-cta-copy h5, #final-cta .final-cta-reassurance, #final-cta .final-cta-action, #final-cta .final-cta-note',
			step     : 90
		}
	];

	function addReveal(element, index, step, modifier) {
		let delay = index * step;

		element.classList.add('reveal');
		element.style.setProperty('--reveal-delay', delay + 'ms');

		if (modifier) {
			element.classList.add(modifier);
		}

		revealRegistry.push(element);
	}

	function registerGroup(config) {
		const elements = document.querySelectorAll(config.selector);

		elements.forEach(function (element, index) {
			addReveal(element, index, config.step || 0, config.modifier || '');
		});
	}

	groupConfigs.forEach(function (config) {
		registerGroup(config);
	});

	if (prefersReducedMotion) {
		revealRegistry.forEach(function (element) {
			element.classList.add('reveal-visible');
		});
	} else {
		const observer = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('reveal-visible');
					observer.unobserve(entry.target);
				}
			});
		}, {
			rootMargin : '0px 0px -12% 0px',
			threshold  : 0.16
		});

		revealRegistry.forEach(function (element) {
			observer.observe(element);
		});
	}
});
