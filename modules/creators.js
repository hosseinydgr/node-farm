const x = (productsArray, tempCard) => {
  return productsArray.map((product) => {
    let output = tempCard.replace(/{%IMAGE%}/g, product.image);
    output = output.replace("{%PRODUCTNAME%}", product.productName);
    output = output.replace(
      "{%NOT_ORGANIC%}",
      product.organic ? "" : "not-organic"
    );
    output = output.replace("{%QUANTITY%}", product.quantity);
    output = output.replace("{%PRICE%}", product.price);
    output = output.replace("{%ID%}", product.id);
    return output;
  });
};

const y = (id, productsArray, tempProduct) => {
  const product = productsArray[id];
  let output = tempProduct.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(
    "{%NOT_ORGANIC%}",
    product.organic ? "" : "not-organic"
  );
  output = output.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace("{%QUANTITY%}", product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace("{%NUTRIENTS%}", product.nutrients);
  output = output.replace("{%FROM%}", product.from);
  output = output.replace("{%DESCRIPTION%}", product.description);
  return output;
};

module.exports = { cardsCreator: x, productCreator: y };
