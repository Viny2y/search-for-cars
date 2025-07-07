const puppeteer = require('puppeteer');
const { salvarAnuncio } = require('./db');

async function buscarMercadoLivre() {
  const url = 'https://lista.mercadolivre.com.br/veiculos/carros-caminhonetes/_PriceRange_0-50000_KILOMETERS_20000km-100000km_NoIndex_True?sb=all_mercadolibre#applied_filter_id%3DKILOMETERS%26applied_filter_name%3DQuil%C3%B4metros%26applied_filter_order%3D15%26applied_value_id%3D20000-100000%26applied_value_name%3D20000-100000%26applied_value_order%3D6%26applied_value_results%3DUNKNOWN_RESULTS%26is_custom%3Dtrue';
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Define um user-agent de navegador real
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');

  await page.goto(url, { waitUntil: 'networkidle2' });
  // Espera 3 segundos para garantir que o conteúdo carregue
  await new Promise(r => setTimeout(r, 3000));
  // Salva o HTML da página para debug
  const html = await page.content();
  const fs = require('fs');
  fs.writeFileSync('pagina_debug.html', html);

  await page.waitForSelector('a.poly-component__title', { timeout: 15000 });

  const htmlItens = await page.$$eval('li', itens => itens.map(i => i.outerHTML));
  if (htmlItens.length > 0) {
    console.log('Primeiro <li> encontrado:\n', htmlItens[0].slice(0, 500), '...');
  } else {
    console.log('Nenhum <li> encontrado na página!');
  }

  const anuncios = await page.$$eval('a.poly-component__title', itens => {
    return itens.map(item => {
      const titulo = item.innerText || '';
      const link = item.href || '';
      return { titulo, link };
    });
  });

  console.log(`Anúncios encontrados: ${anuncios.length}`);

  const categoria = 'Carros';
  const data = new Date().toISOString().split('T')[0];

  for (const anuncio of anuncios) {
    if (anuncio.titulo && anuncio.link) {
      salvarAnuncio(anuncio.titulo, anuncio.link, categoria, data);
    }
  }

  await browser.close();
}

buscarMercadoLivre();
