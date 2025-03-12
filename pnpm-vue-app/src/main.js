import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from "./router";
const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
import * as ELIcons from '@element-plus/icons-vue'
for(let iconName in ELIcons){
    app.component(iconName,ELIcons[iconName])

}
