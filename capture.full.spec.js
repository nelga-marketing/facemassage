const { test } = require('@playwright/test');

test('capture full page', async ({ page }) => {
	await page.setViewportSize({ width : 1440, height : 900 });
	await page.goto('https://facemassage.skin', {
		waitUntil : 'domcontentloaded'
	});
	await page.waitForTimeout(3500);

	const pageHeight = await page.evaluate(function () {
		return Math.max(
			document.body.scrollHeight,
			document.documentElement.scrollHeight,
			document.body.offsetHeight,
			document.documentElement.offsetHeight
		);
	});

	const viewportHeight = page.viewportSize().height;
	let offset = 0;

	while (offset < pageHeight - viewportHeight) {
		await page.evaluate(function (nextOffset) {
			window.scrollTo(0, nextOffset);
		}, offset);
		await page.waitForTimeout(450);
		offset += Math.floor(viewportHeight * 0.72);
	}

	await page.evaluate(function () {
		window.scrollTo(0, document.documentElement.scrollHeight);
	});
	await page.waitForTimeout(1200);
	await page.evaluate(function () {
		window.scrollTo(0, 0);
	});
	await page.waitForTimeout(800);

	await page.screenshot({
		path     : 'facemassage-full.png',
		fullPage : true
	});
});
