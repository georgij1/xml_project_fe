import path from "path";

module.exports = {
    entry: './src/web_project/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
};