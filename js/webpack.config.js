const webpack = require('webpack');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    // Your existing Webpack configuration
    plugins: [
        new webpack.DefinePlugin({
            'process.env.PAYSTACK_PUBLIC_KEY': JSON.stringify(process.env.PAYSTACK_PUBLIC_KEY),
            'process.env.STRIPE_PUBLIC_KEY': JSON.stringify(process.env.STRIPE_PUBLIC_KEY),
        })
    ]
};
