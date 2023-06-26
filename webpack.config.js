// import
// 절대경로 명시
const path = require('path')

// 개발 서버 오픈
// plugins
const HtmlPlugin = require('html-webpack-plugin')

// Favicon 설정
const CopyPlugin = require('copy-webpack-plugin')

const { VueLoaderPlugin } = require('vue-loader')

// export
module.exports =  {
  // 경로 명시 시 확장자 생략할 수 있게 함
  resolve: {
    extensions: ['.js', '.vue'],
    // alias=경로별칭
    // ~ 사용하면 해당 경로로 바로 jump
    alias: {
      '~': path.resolve(__dirname, 'src'), // 폴더가 모여 있는 경로
      'assets': path.resolve(__dirname, 'src/assets') // 실제 이미지가 있는 경로
    }
  },
  // parcel index.html
  // 파일을 읽어들이기 시작하는 진입점 설정
  entry: './src/main.js',

  // 결과물(번들)을 반환하는 설정
  output: {
    // webpack bundler를 동작시키면 dist에 결과물을 만들어 내어준다.
    // path는 NodeJS와 같이 절대 경로가 필요하다.
    // resolve = __dirname(해당 파일 실제 경로를 나타내주는 NodeJS의 전역변수)과 dist를 합쳐준다.(=절대경로)
    // entry점으로 사용한 main.js를 번들로 합쳐서 내어준다.
    // dist -> public / main.js -> app.js | npm run build
    // |- public 폴더에 app.js(내용은 main.js와 같다) 생성
    // |- 다시 app.js -> main.js | npm run build | app.js 남아 있다. | clean 설정


    // path: path.resolve(__dirname, 'dist'),
    // filename: 'main.js',
    clean: true // 기존에 남아 있던 파일 제거
  },

  // css 파일 읽게 하기
  // 순서 중요!
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.s?css$/, // .css 끝나는 것 찾기 | ? = s가 있을 수도 있고 없을수도 있다.
        use: [
          // 순서 중요!
          'vue-style-loader',
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        use: 'file-loader'
      }
    ]
  },

  // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: './index.html'
    }),
    // static 폴더에 있는 것을 복사하여 dist 폴더로 이동
    new CopyPlugin({
      patterns: [
        { from: 'static' }
      ]
    }),
    new VueLoaderPlugin()
  ],

  devServer: {
    host: 'localhost'
  }
}