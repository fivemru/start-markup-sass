import { resolve } from 'path'

// Entry pages
const pages = {
    index: resolve(__dirname, 'src/pages/index'),
    'nyamushka-flex': {
        path: resolve(__dirname, 'src/pages/nyamushka-flex'),
        data: { products: require('./src/data/products.json') },
    },
    'nyamushka-grid': {
        path: resolve(__dirname, 'src/pages/nyamushka-grid'),
        data: { products: require('./src/data/products.json') },
    },
}

export default pages
