const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const eleventyPluginFilesMinifier = require("@codestitchofficial/eleventy-plugin-minify");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy('src/assets');
    eleventyConfig.addPassthroughCopy('.nojekyll');
    eleventyConfig.addPassthroughCopy('robots.txt');
    eleventyConfig.addPassthroughCopy('src/sitemap.xml');
    eleventyConfig.addPassthroughCopy('manifest.webmanifest');
    eleventyConfig.addPassthroughCopy('src/scripts/**/*');

    eleventyConfig.setTemplateFormats(['html', 'njk', 'md']);

    eleventyConfig.addPlugin(eleventyPluginFilesMinifier);
    eleventyConfig.addPlugin(eleventyPluginFilesMinifier);
    eleventyConfig.addPlugin(syntaxHighlight, {
        templateFormats: ["njk", "md"],
        lineSeparator: "\n",
        preAttributes: {
            tabindex: 0
        }
    });

    return {
        htmlTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
        dir: {
            input: 'src',
            output: 'site',
            includes: 'includes'
        },
        pathPrefix: '/conspect',
    };
};