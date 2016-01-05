import gulp from 'gulp'
import babel from 'gulp-babel'

gulp.task('default', () => {
  return gulp.src('src/**/*.*')
    .pipe(babel({
      presets: ['es2015', 'react']
    }))
    .pipe(gulp.dest('lib'))
})
