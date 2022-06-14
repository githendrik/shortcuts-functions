export default async (request, context) => {

  const aareResponse = await fetch('https://aareguru.existenz.ch/v2018/today?city=bern&app=githendrik.at.github&version=0.0.1');

  if (!aareResponse.ok)
    return {
      statusCode: incompleteGamesResponse.statusCode,
      body: incompleteGamesResponse.statusText,
    };

  const aareTemp = await aareResponse
    .json()
    .then((json) => json.aare);

  let recommendation = 'Noch zu kalt.';

  if (aareTemp > 19) {
    recommendation = 'Rein da!'
  }

  const message = `Die Aare ist bei ${aareTemp} Grad.`

  return new Response(`${message} ${recommendation}`);
};
