const fs = require('fs-extra');
const path = require('path');
const metaMarked = require('meta-marked');

function getPreloadedState() {
  const settings = require(path.resolve('./src/data/_settings/general.json'));
  const pages = fs.readdirSync(path.resolve('./src/data/_pages'))
    .map(filename => filename.replace('.md', ''))
    .map((page) => {
      const mdContent = fs.readFileSync(path.resolve(`./src/data/_pages/${page}.md`)).toString();
      const markup = metaMarked(mdContent);

      return ({
        route: (settings.homepage === page) ? '/' : `/${page}`,
        data: markup.meta,
        html: markup.html,
      });
    });

  return ({
    pages,
    settings,
  });
}

module.exports = getPreloadedState;