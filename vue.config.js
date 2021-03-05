module.exports = {
    css: {
        loaderOptions: {
            sass: {
                data: `@import "./src/styles/scss/main.scss";`
            }
        }
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/rezerwacja-terminu/'
        : '/'
}