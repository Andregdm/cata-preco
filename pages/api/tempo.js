async function tempo(request, response) {
    const apiSecret = process.env.AMERICANAS_API_SECRET;
    const dynamicDate = new Date();
    const buscaProd = await fetch(`https://catalogo-bff-v1-americanas.b2w.io/graphql?operationName=pageSearch&variables=${apiSecret}`);
    const buscaProdJson = await buscaProd.json();
    const nome1item = buscaProdJson.data.search.products[0].product.name;
    const preco1item = buscaProdJson.data.search.products[0].product.offers.result[0].salesPrice;
    
    response.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate');

    response.json({
        date: dynamicDate.toGMTString(),
        nome: nome1item,
        preco: preco1item
    })
}

export default tempo;