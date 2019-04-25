module.exports = {
    runtimeCompiler: true,
    css: {
        sourceMap: true
    },
    devServer: {
        // host: '0.0.0.0',
        port: 9000
        // proxy: {
        // '/api': {
        //     target: '<url>',
        //     ws: true,
        //     changeOrigin: true
        // },
        // '/foo': {
        //     target: '<other_url>'
        // }
        // }
    }
}
