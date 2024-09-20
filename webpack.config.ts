import path from "path";
import { Configuration } from "webpack";
import CopyWebpackPlugin from "copy-webpack-plugin";

const dev = process.env.NODE_ENV === 'development';

const config: Configuration = {
  mode: dev ? 'development' : 'production',
  entry: dev ? './src/index.tsx' : './src/component/index.ts',
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
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: dev ? [
    new CopyWebpackPlugin({
      patterns: [{ from: "public" }],
    }),
  ] : [],
};

export default config;
