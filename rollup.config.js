import typescript from '@rollup/plugin-typescript';
import hash from 'rollup-plugin-hash';
import html from '@rollup/plugin-html';
import { readFileSync } from 'fs';
import handlebars from 'handlebars';
import replace from '@rollup/plugin-replace';
import copy from '@rollup-extras/plugin-copy';
import { del } from '@kineticcafe/rollup-plugin-delete';

export default {
    input: 'src/index.ts',
    output: {
        dir: 'dist', 
        format: 'cjs',
        entryFileNames: '[name]-[hash].js',
    },
    plugins: [
        typescript(),
        del({ targets: 'dist/*' }),
        hash(),
        copy({
            src: "src/assets/**/*.png",
            dest: "assets"
        }),
        replace({ // Add the replace plugin before html
            'preventAssignment': true, 
            values: {
              'process.env.NODE_ENV': JSON.stringify( 'production' ) // Optional: for minification in production
            }
        }),
        html({ // Add the HTML plugin
            title: 'World of Chonla', // Optional: Set the title of your HTML page
            template: ({ title, files }) => { // Customize the template
                const templateSource = readFileSync('index.html', 'utf8');
                const template = handlebars.compile(templateSource);

                const scripts = files.js.map(({ fileName }) => {
                    return `<script src="${fileName}"></script>`;
                }).join('\n'); 
      
                return template({ title, scripts });
            }
        })
    ] 
};