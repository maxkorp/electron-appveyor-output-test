function log (str) {
  console.log('1_ ' + str);
  process.stdout.write('2_ ' + str + '\n');
}

function err (str) {
  console.error('1_ ' + str);
  process.stderr.write('2_ ' + str + '\n');
}

log('I AM A MESSAGE');
err('I AM AN ERROR');
