Vite Manifest [![Tests](https://github.com/imarc/vite-manifest/actions/workflows/main.yml/badge.svg)](https://github.com/imarc/vite-manifest/actions/workflows/main.yml)
=============

This is a simple JS library for parsing [Vite](https://vitejs.dev/)
manifest.json files. It was built primarily for use with
[Fractal](https://fractal.build/), so that when Fractal built it's pattern
library it could correctly reference Vite's artifacts.

Usage
-----

```js
import viteManifest from 'vite-manifest'

const arrayOfJsFiles = viteManifest('/some/entrypoint.html', 'js')
const arrayOfCssFiles = viteManifest('/some/entrypoint.html', 'css')
```

Here's an example with [twig.js](https://github.com/twigjs/twig.js):

```twig
{% for file in viteManifest('resources/js/main.js', 'css') %}
  <link rel="stylesheet" href="/assets/{{ file }}">
{% endfor %}

// ...

{% for file in viteManifest('resources/js/main.js', 'js') %}
  <script type="module" src="/assets/{{ file }}"></script>
{% endfor %}
