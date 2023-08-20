import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import path from "node:path";
import dts from "vite-plugin-dts";
import { UserConfigExport } from "vite";
import { name } from "./package.json";
import libAssetsPlugin from "@laynezh/vite-plugin-lib-assets";

const app = async (): Promise<UserConfigExport> => {
	return defineConfig({
		plugins: [
			react(),
			libAssetsPlugin({}),
			dts({
				insertTypesEntry: true,
			}),
		],

		build: {
			lib: {
				entry: path.resolve(__dirname, "src/index.ts"),
				name,
				formats: ["es", "umd"],
				fileName: (format) => `${name}.${format}.js`,
			},
			rollupOptions: {
				external: ["react", "react-dom"],
				output: {
					globals: {
						react: "React",
						"react-dom": "ReactDOM",
					},
				},
			},
		},
	});
};
// https://vitejs.dev/config/
export default app;
