var cp = require('child_process');

function getEnv(overrides) {
  var out = {};
  for (var key in process.env) {
    if (process.env.hasOwnProperty(key)) {
      out[key] = process.env[key];
    }
  }

  for (var key in overrides) {
    if (overrides.hasOwnProperty(key)) {
      out[key] = overrides[key];
    }
  }

  return out;
}

function runSpawn(which, env, cb) {
  console.log('spawn with: ' + which);
  var task = cp.spawn(which, ['./called-out-to.js'], {env: env});
  task.stdout.pipe(process.stdout);
  task.stderr.pipe(process.stderr);
  task.on('close', function(code) {
    if (code === 0) {
      console.log('ok');
    }
    else {
      console.error('blurp: ' + code);
    }

    console.log('\n\n\n');

    if (cb) cb();
  });
}

function runExec(which, env, cb) {
  console.log('exec with: ' + which);
  var task = cp.exec([which, './called-out-to.js'].join(' '), {env: env}, function(err, stdout, stderr) {
    console.error(stderr);
    console.log(stdout);
    if (!err) {
      console.log('ok');
    }
    else {
      console.error('blurp: ' + err);
    }

    console.log('\n\n\n');

    if (cb) cb();
  });
}






var nodeProc = 'node';
var nodeEnv = getEnv();
var elecProc = 'electron' + (process.platform == 'win32' ? '.cmd' : '');
var elecEnv = getEnv({'ATOM_SHELL_INTERNAL_RUN_AS_NODE': 1});

runSpawn(nodeProc, nodeEnv, function() {
  runExec(nodeProc, nodeEnv, function() {
    runSpawn(elecProc, elecEnv, function() {
      runExec(elecProc, elecEnv);
    });
  });
});
