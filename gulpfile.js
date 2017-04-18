const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');
const TS_FILES = ['src/**/*.ts'];
const JSON_FILES = ['src/**/*.json'];
const DEST = 'dist';

const tsProject = ts.createProject('tsconfig.json');

// BUILD TypeScript
gulp.task('build-ts', () => {
    const tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    return tsResult.js
        .pipe(sourcemaps.write('.', {sourceRoot:''}))
        .pipe(gulp.dest(DEST));
});

// COPY Assets
gulp.task('build-assets', function() {
    return gulp.src(JSON_FILES)
    .pipe(gulp.dest(DEST));
});

// WATCH changes
gulp.task('watch', ['build-ts', 'build-assets'], () => {
    gulp.watch(TS_FILES, ['build-ts']);
    gulp.watch(JSON_FILES, ['build-assets']);
});

gulp.task('default', ['watch']);
gulp.task('build', ['build-ts', 'build-assets']);