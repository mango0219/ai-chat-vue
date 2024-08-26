import './assets/main.css'
import '../src/router/premission'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia} from 'pinia'
import 'vant/lib/index.css';
import { Image , Button, Row, Col, NavBar,Field, CellGroup, Checkbox,ConfigProvider,
    Form,Highlight,Tabbar, TabbarItem,PullRefresh,Empty,Search,List,Icon,FloatingBubble,SwipeCell} from 'vant';

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(Button);
app.use(Image);
app.use(Row);
app.use(Col);
app.use(NavBar);
app.use(Field);
app.use(CellGroup);
app.use(Checkbox);
app.use(ConfigProvider);
app.use(Form);
app.use(Highlight);
app.use(Tabbar);
app.use(TabbarItem);
app.use(PullRefresh);
app.use(Empty);
app.use(Search);
app.use(List);
app.use(Icon);
app.use(FloatingBubble);
app.use(SwipeCell);
// app.use(showConfirmDialog);

app.mount('#app')
