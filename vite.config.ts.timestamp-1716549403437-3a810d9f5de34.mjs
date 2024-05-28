// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/Users/User/Documents/GitHub/DreamyMind/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/User/Documents/GitHub/DreamyMind/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import VueRouter from "file:///C:/Users/User/Documents/GitHub/DreamyMind/node_modules/unplugin-vue-router/dist/vite.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/Users/User/Documents/GitHub/DreamyMind/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    VueRouter({}),
    vue()
    /* ,VueDevTools() */
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
  // // décommenter pour build en mode production directement dans pocketbase
  // ,
  // build: {
  //   outDir: './pocketbase/pb_public'
  // }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxVc2VyXFxcXERvY3VtZW50c1xcXFxHaXRIdWJcXFxcRHJlYW15TWluZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcVXNlclxcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXERyZWFteU1pbmRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL1VzZXIvRG9jdW1lbnRzL0dpdEh1Yi9EcmVhbXlNaW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcblxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IFZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcclxuXHJcbmltcG9ydCBWdWVSb3V0ZXIgZnJvbSAndW5wbHVnaW4tdnVlLXJvdXRlci92aXRlJ1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbVnVlUm91dGVyKHt9KSwgdnVlKCkgLyogLFZ1ZURldlRvb2xzKCkgKi9dLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vIC8vIGRcdTAwRTljb21tZW50ZXIgcG91ciBidWlsZCBlbiBtb2RlIHByb2R1Y3Rpb24gZGlyZWN0ZW1lbnQgZGFucyBwb2NrZXRiYXNlXHJcbiAgLy8gLFxyXG4gIC8vIGJ1aWxkOiB7XHJcbiAgLy8gICBvdXREaXI6ICcuL3BvY2tldGJhc2UvcGJfcHVibGljJ1xyXG4gIC8vIH1cclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5VCxTQUFTLGVBQWUsV0FBVztBQUU1VixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFHaEIsT0FBTyxlQUFlO0FBTitLLElBQU0sMkNBQTJDO0FBU3RQLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQUEsSUFBRyxJQUFJO0FBQUE7QUFBQSxFQUFzQjtBQUFBLEVBQ25ELFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU1GLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
