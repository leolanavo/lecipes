<script lang="ts">
	const hour = new Date().getHours();
	let title: string;

	if (hour >= 12 && hour <= 19) {
	  title = 'Boa tarde';
	} else if (hour >= 5 && hour <= 12) {
	  title = 'Bom dia';
	} else {
	  title = 'Boa noite';
	}
</script>

<h1 class="title">{title}</h1>

<style lang="scss">
	$text-color: #fff;

	.title {
		color: $text-color;
		font-family: Roboto;
		font-style: normal;
		font-weight: 900;
		font-size: 1.75rem;
		padding: 1rem;
	}
</style>
