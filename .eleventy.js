const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const { minify } = require("html-minifier-terser");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy('src/assets');
    eleventyConfig.addPassthroughCopy('src/CNAME');
    eleventyConfig.addPassthroughCopy('src/.nojekyll');
    eleventyConfig.addPlugin(syntaxHighlight);

    // Убираем CSS из templateFormats, так как мы обрабатываем его через addExtension
    eleventyConfig.setTemplateFormats(['html', 'njk', 'md']);

    eleventyConfig.addExtension('css', {
        outputFileExtension: 'css',
        compile: async (content, path) => {
            if (path.includes('src/assets/style')) {
                return await minify(content, {
                    minifyCSS: true,
                    collapseWhitespace: true,
                    removeComments: true
                });
            }
            return content;
        }
    });

    eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
        if (outputPath.endsWith(".html")) {
            return minify(content, {
                collapseWhitespace: true,
                removeComments: true,
                minifyJS: true,
                minifyCSS: true,
                removeEmptyAttributes: true,
                removeEmpty: true,
                removeOptionalTags: true,
                removeRedundantAttributes: true
            });
        }
        return content;
    });

    return {
        htmlTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
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