const cp = require('child_process')

const version = cp.execSync('git rev-parse --short HEAD').toString().trim()

/** @type {import('snowpack').SnowpackUserConfig } */
module.exports = {
  mount: {
    'public': '/',
    'src': '/dist'
  },
  routes: [
    /* Enable an SPA Fallback in development: */
    { match: 'routes', src: '.*', dest: '/index.html' },
  ],
  packageOptions: {
    installTypes: true,
    polyfillNode: true,
  },
  plugins: [
    '@snowpack/plugin-typescript',
    [
      'snowpack-plugin-replace',
      {
        list: [
          { from: 'GIT_VERSION', to: JSON.stringify(version) }
        ],
      },
    ]
  ],
}
