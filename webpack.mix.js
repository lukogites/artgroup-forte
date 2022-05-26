let mix = require('laravel-mix');

mix.setPublicPath('dist');
mix.options({
    processCssUrls: false,
});

mix.autoload({
    jquery: ['$', 'window.jQuery']
});


mix.js('src/js/App.js', 'js/index.js');
mix.sass('src/sass/style.scss', 'css/index.css');