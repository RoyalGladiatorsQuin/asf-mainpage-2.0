module.exports = {
    devServer: {
        open: false,
        proxy: {
            '/api/cfj': {
                target: 'http://ilovemiku.com:7123',
                changeOrigin: true,
                pathRewrite: {
                    '^/api/cfj': '/cfj'
                }
            },
            '/api': {
                target: 'https://support-api.asoulfan.com/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }
    }
}