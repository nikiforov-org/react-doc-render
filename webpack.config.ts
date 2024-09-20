import path from "path";
import { Configuration } from "webpack";
import CopyWebpackPlugin from "copy-webpack-plugin";

const dev = process.env.NODE_ENV === 'development';

const config: Configuration = {
  mode: dev ? 'development' : 'production',
  entry: dev ? './src/index.tsx' : './src/component/index.tsx',
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: dev ? [
    new CopyWebpackPlugin({
      patterns: [{ from: "public" }],
    }),
  ] : [
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/component/index.d.ts", to: "index.d.ts" },
      ],
    }),
  ],
};

export default config;
