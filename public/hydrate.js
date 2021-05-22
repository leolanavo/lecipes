export default async () => {
	if (!document) return;
	const elements = document.getElementsByClassName('hydrate-me');

	for (let element of elements) {
		const component = element.getAttribute('data-component');
		const props = element.getAttribute('data-props');

		const { default: Component } =
			await import(`/build/js/views/components/${component}.js`);

		new Component({
			target: element,
			hydrate: true,
			props: JSON.parse(props),
		});
	}
}