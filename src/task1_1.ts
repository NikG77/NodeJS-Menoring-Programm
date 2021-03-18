const LineFeed = '\n';

process.stdin.on('data', (data) => {
  const result = reverse(data.toString().trim());
  process.stdout.write(`${result}${LineFeed.repeat(3)}`);
});

function reverse(value: string): string {
  return value.split('').reverse().join('');
}
