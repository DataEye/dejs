import gulp from 'gulp'
import babel from 'gulp-babel'

gulp.task('css', () => {
  return gulp.src('src/**/*.css')
    .pipe(gulp.dest('lib'))
})

gulp.task('default', ['css'], () => {
  return gulp.src('src/**/*.js')
    .pipe(babel({
      presets: ['es2015', 'react']
    }))
    .pipe(gulp.dest('lib'))
})
