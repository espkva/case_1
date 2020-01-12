module.exports = (data) => {
  return new Promise((resolve, reject) => {
    // Create a random timeout between 2 and 5 seconds
    let timeout = Math.floor(Math.random() * (5 - 2 + 1) + 2);
    setTimeout(() => {
      // Generate a random price between 100 and 1000
      let price = Math.floor(Math.random() * (1000 - 100 + 1) + 100);
      resolve(price.toFixed(2));
    }, timeout * 1000);
  })
}