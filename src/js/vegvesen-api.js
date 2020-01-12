/* Simulate vegvesen API endpoint to get vehicle registration data */
module.exports = (plate) => {  
  const makes = ['VW','Toyota','Tesla','Honda','Volvo'];
  const models = ['Golf','Prius','Model S'];
  const colors = ['Svart','Sølv', 'Rød','Grønn'];

  return new Promise((resolve, reject) => {
    // Create a frankenstein-car.
    let randMake = makes[Math.floor(Math.random() * makes.length)];
    let randModel = models[Math.floor(Math.random() * models.length)];
    let randColor = colors[Math.floor(Math.random() * colors.length)];
    setTimeout(() => {
      resolve(`${randMake} ${randModel} - Farge: ${randColor}`);
    }, 200);
  })
}