/**
 * 全局组件注册
 */
import Vue from 'vue';
import { parseTime } from '../utils';

import {
  TabPane,
  Tabs,
  Scrollbar,
  Button,
  // 表格信息
  Table,
  TableColumn,
  Pagination,
  // 表单组件
  Form,
  FormItem,
  RadioGroup,
  Input,
  CheckboxGroup,
  Checkbox,
  Radio,
  Option,
  Select,
  RadioButton,
  InputNumber,
  Switch,
  // 菜单
  Menu,
  MenuItem,
  Submenu,
  MenuItemGroup,
  // 消息框
  Dialog,
  MessageBox,
  Message,
  Upload,
  Drawer,
  Loading,
} from 'element-ui';
Vue.prototype.$ELEMENT = { size: 'small' };
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;

[
  TabPane,
  Tabs,
  Scrollbar,
  Button,
  // 表格信息
  Table,
  TableColumn,
  Pagination,
  // 表单组件
  Form,
  FormItem,
  RadioGroup,
  Input,
  CheckboxGroup,
  Checkbox,
  Radio,
  Option,
  Select,
  Upload,
  RadioButton,
  InputNumber,
  Switch,
  // 菜单
  Menu,
  MenuItem,
  Submenu,
  MenuItemGroup,
  // 消息框
  Dialog,
  Drawer,
].forEach((item) => {
  Vue.use(item);
});

// 注册loading
Vue.use(Loading.directive);

Vue.directive('format', {
  bind: function(el, binding) {
    el.innerHTML = parseTime(binding.value, '{y}-{m}-{d} {h}:{i}');
  },
});

const requireComponent = require.context('.', true, /^\S+\.vue$/);
requireComponent.keys().forEach((pathName) => {
  const componentName = pathName.split('/')[1].replace(/\.vue$/, '');
  const componentConfig = requireComponent(pathName);
  Vue.component(componentName, componentConfig.default || componentConfig);
});
