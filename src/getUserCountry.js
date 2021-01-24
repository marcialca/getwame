async function getUserCountry() {
  const response = await fetch('https://extreme-ip-lookup.com/json/');
  const res = await response.json();

  return res.countryCode;
}

export default getUserCountry;