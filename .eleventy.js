const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy('src/assets');
    eleventyConfig.addPassthroughCopy('src/CNAME'); // Для кастомного домена
    eleventyConfig.addPassthroughCopy('src/.nojekyll'); // Для GitHub Pages

    eleventyConfig.addPlugin(syntaxHighlight);

    eleventyConfig.env.process();

    return {
        htmlTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
        templateFormats: ['html', 'njk', 'md'],
        dir: {
            input: 'src',
            output: 'site',
            includes: 'includes',
            data: 'data',
            layouts: 'layouts'
        },
        pathPrefix: process.env.SITE_PREFIX || '',
        quiet: false,
        htmlOutputSuffix: '.html'
    };
};