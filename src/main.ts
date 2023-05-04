import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

const importModule = (m: string) => {
  import(`./locales/${m}.js`);
  console.log(import.meta, 'main meta')
};

importModule("zh_CN");


createApp(App).mount("#app");
