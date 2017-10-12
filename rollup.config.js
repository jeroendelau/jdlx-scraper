/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default {
  input: 'src/jdlx-scraper.js',
  output: {
    file: 'dist/jdlx-scraper.js',
    format: 'umd',
    name: 'jdlx-scraper'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      plugins: ["external-helpers"]
    })
  ],
  watch: {
    include: 'src/**'
  }
};