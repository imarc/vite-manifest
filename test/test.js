import { resolve } from 'path'
import { build } from 'vite'
import assert from 'assert'
import viteManifest from '../index.js';

describe('viteManifest test suite', function() {
  before(async function() {
    return build({
      root: resolve(resolve(), './test/assets/'),
      build: {
        manifest: true,
        rollupOptions: {
          input: {
            main: resolve(resolve(), './test/assets/index.html'),
            secondary: resolve(resolve(), './test/assets/secondary.html')
          },
        },
      },
    }).then(() => {
      this.viteManifest = viteManifest(resolve(resolve(), './test/assets/dist/manifest.json'))
    })
  })

  it('returns an array', function() {
    assert(this.viteManifest('index.html') instanceof Array)
  })

  it('contains a main.js', function() {
    assert(this.viteManifest('index.html', 'js').some(file => file.match(/assets\/main\.[a-f0-9]+\.js$/)))
  })

  it('contains a vendor.js', function() {
    assert(this.viteManifest('index.html', 'js').some(file => file.match(/assets\/vendor\.[a-f0-9]+\.js/)))
  })

  it('filtering on js only returns js', function() {
    assert(!this.viteManifest('index.html', 'js').some(file => !file.match(/\.js/)))
  })

  it('contains a main.css', function() {
    assert(this.viteManifest('index.html', 'css').some(file => file.match(/assets\/main\.[a-f0-9]+\.css/)))
  })

  it('filtering on css only returns css', function() {
    assert(!this.viteManifest('index.html', 'css').some(file => !file.match(/\.css/)))
  })

  it('can lookup different entry points with different content', function() {
    assert(this.viteManifest('secondary.html', 'js').some(file => file.match(/assets\/secondary\.[a-f0-9]+\.js$/)))
  })
})
