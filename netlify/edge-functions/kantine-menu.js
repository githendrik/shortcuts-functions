import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

export default async (request, context) => {

  const apiResponse = await fetch('https://swisscom-worblaufen.sv-restaurant.ch/de/menuplan/');

  if (!apiResponse.ok)
    return {
      statusCode: apiResponse.statusCode,
      body: apiResponse.statusText,
    };

  const menuDom = await apiResponse.text();
  const doc = new DOMParser().parseFromString(menuDom, "text/html");

  const dishes = [...doc.querySelectorAll('.menu-item')].map(d => {
    const where = d.querySelector('.menuline').innerText;
    const what = d.querySelector('.menu-title').innerText;

    const kcal = d.querySelector('.nutrition-table td') && d.querySelector('.nutrition-table td').innerText;

    console.log(`${what} - ${kcal}`);

    return `${where}: ${what} (${kcal}kcal)`
  })

  const resp = `
   ${dishes[0]}
   
   ${dishes[1]}
   
   ${dishes[2]}
  `

  return new Response(resp);
};
