import { dts } from "rollup-plugin-dts";

const config = [
    {
        input: "./types/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "es" }],
        external: [/\.(sass|scss|css)$/] /* ignore style files */,
        plugins: [dts()],
    },
];

export default config;