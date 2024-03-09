const connect = require('connect');
const url = require('url');

const calculate = (req, res) => {
  const parsedUrl = url.parse(req.url, true);

  const method = parsedUrl.query.method;
  const x = parseFloat(parsedUrl.query.x);
  const y = parseFloat(parsedUrl.query.y);

  let result, operator;

  switch (method) {
    case 'add':
      result = x + y;
      operator = '+';
      break;
    case 'subtract':
      result = x - y;
      operator = '-';
      break;
    case 'multiply':
      result = x * y;
      operator = '*';
      break;
    case 'divide':
      result = x / y;
      operator = '/';
      break;
    default:
      result = 'Invalid method';
  }

  const output = `${x} ${operator} ${y} = ${result}`;

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(` ${output}\n`);
};

const app = connect();

app.use(calculate);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
