document.addEventListener('DOMContentLoaded', function () {
	const education = document.querySelector('#education');
	const pairItems = education ? education.querySelectorAll('[data-education-pair]') : [];
	const pairMap = new Map();

	pairItems.forEach(function (item) {
		const pairName = item.dataset.educationPair;
		const group = pairMap.get(pairName) || [];

		group.push(item);
		pairMap.set(pairName, group);
	});

	function syncPairState(pairName, isActive) {
		const group = pairMap.get(pairName);

		if (group) {
			group.forEach(function (item) {
				item.classList.toggle('education-pair-active', isActive);
			});
		}
	}

	pairItems.forEach(function (item) {
		const pairName = item.dataset.educationPair;

		item.addEventListener('mouseenter', function () {
			education.classList.add('education-pairs-live');
			syncPairState(pairName, true);
		});

		item.addEventListener('mouseleave', function () {
			education.classList.remove('education-pairs-live');
			syncPairState(pairName, false);
		});
	});
});
