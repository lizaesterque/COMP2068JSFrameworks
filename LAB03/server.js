//routing with the conncet 
const connect = require('connect');
const url = require('url');


//creating a request and a res
const calculate = (req, res) => {
  const parsedUrl = url.parse(req.url, true);

//parses the URL for method, x and y
  const method = parsedUrl.query.method;
  const x = parseFloat(parsedUrl.query.x);
  const y = parseFloat(parsedUrl.query.y);

  let result;


//using switch to do the math operation 
  switch (method) {
    case 'add':
      result = x + y;
      break;
    case 'subtract':
      result = x - y;
      break;
    case 'multiply':
      result = x * y;
      break;
    case 'divide':
      result = x / y;
      break;
    default:
      result = 'Invalid method';
  }

  //save the output in a cost
  const output = `${x} ${method} ${y} = ${result}`;

//show the output
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(` ${output}\n`);
};

//connect and calculete
const app = connect();

app.use(calculate);

//show in terminal that the server is running 
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
