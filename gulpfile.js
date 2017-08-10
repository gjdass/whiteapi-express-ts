const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');
const tslint = require('gulp-tslint');
const stylish = require('tslint-stylish')
const TS_FILES = ['src/**/*.ts'];
const TESTS_FILES = ['tests/**/*.ts'];
const JSON_FILES = ['src/**/*.json'];
const DEST = 'dist';
const DEST_TESTS = 'dist-tests';

const tsProject = ts.createProject('tsconfig.json');
const testProject = ts.createProject('tsconfig-tests.json');

// BUILD TypeScript
gulp.task('build-ts', () => {
    const tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    return tsResult.js
        .pipe(sourcemaps.write('.', {sourceRoot:''}))
        .pipe(gulp.dest(DEST));
});

gulp.task('tslint', () => {
    gulp.src(TS_FILES)
    .pipe(tslint())
    .pipe(tslint.report(stylish, {
        emitError: true,
        sort: true,
        bell: true
    }));
})

// COPY Assets
gulp.task('build-assets', function() {
    return gulp.src(JSON_FILES)
    .pipe(gulp.dest(DEST));
});

// WATCH changes
gulp.task('watch', ['tslint', 'build-ts', 'build-assets'], () => {
    gulp.watch(TS_FILES, ['tslint', 'build-ts']);
    gulp.watch(JSON_FILES, ['build-assets']);
});

gulp.task('build-tests', () => {
    const tsResult = testProject.src()
        .pipe(sourcemaps.init())
        .pipe(testProject());
    return tsResult.js
        .pipe(sourcemaps.write('.', {sourceRoot:''}))
        .pipe(gulp.dest(DEST_TESTS));
});

gulp.task('default', ['watch']);
gulp.task('build', ['tslint', 'build-ts', 'build-assets']);