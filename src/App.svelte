<script>
	import countryPhoneCodes from './countryCodes';
	import initializeI18n from './i18n';
	import { _ } from 'svelte-i18n';

	initializeI18n();

	let phoneNumber = '';
	let selectedCountryCode = '+506';
	$: currentUserCountry = 'CR';
	$: isNumberCopied = false;
	$: generatedCode = `https://wa.me/${selectedCountryCode.replace(' ', '')}${`${phoneNumber}`.replace('-', '')}`

	async function copyGeneratedCode() {
		await navigator.clipboard.writeText(generatedCode);
		isNumberCopied = true;
	}
</script>

<main>
	<h1>{$_('title')}</h1>
	<p>{$_('intro')}</p>
	<p class="boldLabel">{$_('instructionsLabel')}:</p>
	<ul>
		<li>{$_('instructionOne')}</li>
		<li>{$_('instructionTwo')}</li>
		<li>{$_('instructionThree')}</li>
	</ul>

	<label class="boldLabel" for="telephone">{$_('selectLabel')}: </label>
	<select class="select" bind:value={selectedCountryCode} name="countryCode" id="country">
		{#each countryPhoneCodes as country}
			<option selected={country.code === currentUserCountry} value={country.dial_code}>{country.name}</option>
		{/each}
	</select>

	<label class="boldLabel" for="telephone">{$_('phoneLabel')}: </label>
	<input bind:value={phoneNumber} type="number" inputmode="tel" name="telephone" placeholder="eg: 8675309">

	<div class="actions-wrap">
		<a class="sendLink" href={generatedCode}><img src="./images/wa_logo.png" width="60px" height="50px" alt={$_('sendMessage')}>{$_('sendMessage')}</a>
		<button class="copyButton" on:click={copyGeneratedCode}>
			<span>{$_('copy')}</span>
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
				<path d="M320 128v-128h-224l-96 96v288h192v128h320v-384h-192zM96 45.255v50.745h-50.745l50.745-50.745zM32 352v-224h96v-96h160v96l-96 96v128h-160zM288 173.255v50.745h-50.745l50.745-50.745zM480 480h-256v-224h96v-96h160v320z"></path>
				</svg>
		</button>
	</div>

	{#if isNumberCopied}
		<p class="copiedText">{$_('copied')}!</p>
	{/if}

	<p><span class="generatedLabel">{$_('generatedLink')}:</span> <span class="generated">{generatedCode} </span></p>


	<footer>
		<p>{$_('builtBy')} <a class="footerAnchor" href="https://marcialcambronero.com">Marcial Cambronero</a></p>
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