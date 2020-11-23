/**
 * 全局组件注册
 */
import Vue from 'vue';

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
  // 菜单
  Menu,
  MenuItem,
  Submenu,
  MenuItemGroup,
  // 消息框
  Dialog,
].forEach((item) => {
  Vue.use(item);
});

const requireComponent = require.context('.', true, /^\S+\.vue$/);
requireComponent.keys().forEach((pathName) => {
  const componentName = pathName.split('/')[1].replace(/\.vue$/, '');
  const componentConfig = requireComponent(pathName);
  Vue.component(componentName, componentConfig.default || componentConfig);
});
