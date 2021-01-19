<script>
	// TODO: i18n
	// TODO: PWA cappability
	import countryPhoneCodes from './countryCodes';
	let phoneNumber = '';
	let selectedCountryCode;
	$: currentUserCountry = 'CR';
	$: generatedCode = `https://wa.me/${selectedCountryCode}${phoneNumber}`

	fetch('https://extreme-ip-lookup.com/json/')
	.then( response => response.json())
	.then(res => {
		currentUserCountry = res.country.countryCode;
	});

	async function copyGeneratedCode() {
		await navigator.clipboard.writeText(generatedCode);
		alert('Copied!');
	}

</script>

<main>
	<h1>WhatsApp Message Link Generator</h1>
	<p>Avoid adding a number to send a message</p>
	<p class="boldLabel">Instructions:</p>
	<ul>
		<li>Select your country</li>
		<li>Type in your number</li>
		<li>Copy or use the generated link!</li>
	</ul>

	<label class="boldLabel" for="telephone">Select your country: </label>
	<select class="select" bind:value={selectedCountryCode} name="countryCode" id="country">
		{#each countryPhoneCodes as country}
			<option selected={country.code === currentUserCountry} value={country.dial_code}>{country.name}</option>
		{/each}
	</select>

	<label class="boldLabel" for="telephone">Telephone Number: </label>
	<input bind:value={phoneNumber} type="tel" inputmode="tel" name="telephone" placeholder="eg: 8675309">

	<label class="boldLabel" for="generated-link">Your Generated Link:</label>
	<div class="generated-wrap">
		<input type="text" readonly value={generatedCode} class="generated">
		<button class="button copyBtn" on:click={copyGeneratedCode}>
			<span>Copy</span>
			<img src="./images/copy.png" alt="Copy generated link">
		</button>
	</div>
	<div class="generated-wrap">
		<p class="boldLabel">or just open the app:</p>
		<a class="openLink" href={generatedCode}><img src="./images/logo_oficial.png" alt="Open generated link"></a>
	</div>


	<footer>
		<p>Like this?</p>
		<a href="https://www.buymeacoffee.com/mcambronero"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=mcambronero&button_colour=40DCA5&font_colour=ffffff&font_family=Lato&outline_colour=000000&coffee_colour=FFDD00"></a>
	</footer>
</main>

<style>

.boldLabel {
  font-weight: bold;
}

.generated-wrap {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 24px;
}

.copyBtn {
	height: 50px;
	font-weight: bold;
	margin-left: 16px;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.copyBtn img {
	width: 38px;
	border-radius: 4px;
	display: inline;
	margin-left: 4px;
}

.openLink {
	margin-left: 20px;
}

.openLink img {
	width: 90px;
	border-radius: 4px;
}

.button {
	background-color: #25D366;
	border: none;
}

.generated {
	font-family: monospace;
	font-size: 12px;
}

footer {
	margin-top: 24px;
}

</style>