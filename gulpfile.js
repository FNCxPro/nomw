/**
 * nomw
 * 
 * File...................gulpfile.js
 * Created on.............Sunday, 31st December 2017 2:02:02 am
 * Created by.............Relative
 * 
 */
const gulp = require('gulp')
const gulpBabel = require('gulp-babel')
const gulpEslint = require('gulp-eslint')
const gulpIf = require('gulp-if')
const gulpIgnore = require('gulp-ignore')
const gulpMinify = require('gulp-minify')

const debug = (typeof process.env.DEBUG === 'string' && process.env.DEBUG === 'true')
const del = require('del')
const { exec } = require('pkg')

const paths = {
  scripts: ['src/**/*.js'],
  assets: ['env/*.json', '!env/*.example.json']
}

const exclude = (file) => {
  const name = file.relative
  if (!debug && name === 'debug.json') return true
  if (debug && name !== 'debug.json') return true
  return false
}

gulp.task('clean', () => {
  return del.sync(['dist'])
})

gulp.task('assets', () => {
  return gulp.src(paths.assets)
    .pipe(gulpIgnore.exclude(exclude))
    .pipe(gulp.dest('dist'))
})

gulp.task('scripts', ['assets', 'clean'], () => {
  return gulp.src(paths.scripts)
    .pipe(gulpBabel())
    /*.pipe(gulpEslint())
    .pipe(gulpEslint.format())
    .pipe(gulpEslint.failAfterError())*/
    .pipe(gulpIf(!debug, gulpMinify({
      ext: {
        src: '.debug-js',
        min: '.js'
      },
      ignoreFiles: ['-min.js', '.min.js'],
    })))
    .pipe(gulp.dest('dist'))
})

gulp.task('build', ['scripts'], () => {
  if (debug) console.log('> Building in debug mode.')
  return exec(['.', '--targets', 'node8-linux-x64,node8-macos-x64,node8-win-x64', '--out-path', 'dist/binaries'])
})

gulp.task('default', ['build'])
