<script>
	// TODO: i18n
	// TODO: PWA cappability
	import countryPhoneCodes from './countryCodes';
	let phoneNumber = '';
	let selectedCountryCode;
	$: currentUserCountry = 'CR';
	$: isNumberCopied = false;
	$: generatedCode = `https://wa.me/${selectedCountryCode}${phoneNumber}`

	fetch('https://extreme-ip-lookup.com/json/')
	.then( response => response.json())
	.then(res => {
		currentUserCountry = res.countryCode;
	});

	async function copyGeneratedCode() {
		await navigator.clipboard.writeText(generatedCode);
		isNumberCopied = true;
	}

</script>

<main>
	<h1>WhatsApp Message Link Generator</h1>
	<p>Avoid adding a number to your contacts just to send a message</p>
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

	<div class="actions-wrap">
		<a class="sendLink" href={generatedCode}><img src="./images/wa_logo.png" width="60px" height="50px" alt="Open generated link">Send Message</a>
		<button class="copyButton" on:click={copyGeneratedCode}>
			<span>Copy URL </span>
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
				<path d="M320 128v-128h-224l-96 96v288h192v128h320v-384h-192zM96 45.255v50.745h-50.745l50.745-50.745zM32 352v-224h96v-96h160v96l-96 96v128h-160zM288 173.255v50.745h-50.745l50.745-50.745zM480 480h-256v-224h96v-96h160v320z"></path>
				</svg>
		</button>
	</div>

	{#if isNumberCopied}
		<p class="copiedText">Copied!</p>
	{/if}

	<p><span class="generatedLabel">Generated Link:</span> <span class="generated">{generatedCode} </span></p>


	<footer>
		<p>Built by <a class="footerAnchor" href="https://marcialcambronero.com">Marcial Cambronero</a></p>
	</footer>
</main>

<style>

.boldLabel {
	font-weight: bold;
}

.actions-wrap {
	display: flex;
	align-items: center;
	margin: 24px 0;
}

.sendLink {
	display: flex;
	align-items: center;
	padding: 10px;
	padding-right: 30px;
	margin-right: 20px;
	border-radius: 4px;
	background: #fafafa;
	color: #333;
	text-decoration: none;
	box-shadow: 0px 1px 5px 0px rgb(0 0 0 / 75%);
}

.sendLink:hover, 
.sendLink:visited, 
.sendLink:focus {
	color: #333;
	text-decoration: none;
}

.sendLink:active {
	box-shadow: 0px 1px 5px 0px rgb(0 0 0 / 75%) inset;
}

.copyButton {
	display: flex;
	align-items: center;
	padding: 35px 10px;
	background: #fafafa;
	color: #333;
	border: none;
	text-decoration: none;
	box-shadow: 0px 1px 5px 0px rgb(0 0 0 / 75%);
}

.copyButton:active {
	box-shadow: 0px 1px 5px 0px rgb(0 0 0 / 75%) inset;
}

.copyButton span {
	padding-right: 10px;
}

.copiedText {
	color: #34B7F1;
	text-align: center;
	font-weight: bold;
}

.generatedLabel {
	font-weight: bold;
	font-size: 12px;
}

.generated {
	font-family: monospace;
	font-size: 12px;
}

footer {
	margin-top: 48px;
	text-align: center;
}

.footerAnchor {
	font-weight: bold;
}

</style>