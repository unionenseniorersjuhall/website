const bs = require('browser-sync').create();
const build = require('./lib/build');

build();

bs.init({ server: './dist' });

bs.watch('_pages/*.md', function (event, file) {
  if (event === 'change') {
    build();
    bs.reload();
  }
});
