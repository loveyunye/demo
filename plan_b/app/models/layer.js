const { Sequelize, Model } = require('sequelize');
const sequelize = require('../core/mysql');

class Layer extends Model {
  static async belongToScreen(layerId, screenId) {
    console.log(layerId, typeof screenId);
    const layer = await Layer.findOne({
      where: {
        screenId,
        id: layerId,
      },
    });
    return layer;
  }
}

Layer.init(
  {
    lid: {
      // 主键 唯一
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id: {
      type: Sequelize.STRING(128),
      allowNull: false,
      defaultValue: '大屏',
    },
    type: {
      type: Sequelize.ENUM,
      field: 'layer_type',
      values: ['component', 'group'],
      allowNull: false,
    },
    name: {
      type: Sequelize.CHAR(128),
      allowNull: false,
      defaultValue: '',
    },
    alias: {
      type: Sequelize.CHAR(128),
      allowNull: false,
      defaultValue: '',
    },
    version: {
      type: Sequelize.CHAR(128),
      allowNull: false,
      defaultValue: '0.0.1',
    },
    requirePath: {
      type: Sequelize.CHAR(128),
      allowNull: false,
      defaultValue: '',
    },
    poster: {
      type: Sequelize.STRING(1024),
      allowNull: false,
      defaultValue: '',
    },
    componentName: {
      type: Sequelize.CHAR(128),
      allowNull: false,
      defaultValue: '',
    },
    componentType: {
      type: Sequelize.CHAR(128),
      allowNull: false,
      defaultValue: '',
    },
    view: {
      // 组件位置 大小 变形 锁定 透明度 等信息
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: '',
      set(val) {
        const value = typeof val === 'string' ? val : JSON.stringify(val);
        this.setDataValue('view', value);
      },
      get() {
        const value = this.getDataValue('view');
        if (value) {
          return JSON.parse(value);
        }
        return {};
      },
    },
    children: {
      // 组件数据配置信息
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: '',
      set(val) {
        const value = typeof val === 'string' ? val : JSON.stringify(val);
        this.setDataValue('children', value);
      },
      get() {
        const value = this.getDataValue('children');
        if (value) {
          return JSON.parse(value);
        }
        return [];
      },
    },
    interaction: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: '',
      set(val) {
        const value = typeof val === 'string' ? val : JSON.stringify(val);
        this.setDataValue('interaction', value);
      },
      get() {
        const value = this.getDataValue('interaction');
        if (value) {
          return JSON.parse(value);
        }
        return {};
      },
    },
    source: {
      // 组件数据配置信息
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: '',
      set(val) {
        const value = typeof val === 'string' ? val : JSON.stringify(val);
        this.setDataValue('source', value);
      },
      get() {
        const value = this.getDataValue('source');
        if (value) {
          return JSON.parse(value);
        }
        return {};
      },
    },
    options: {
      // 组件渲染配置信息
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: '',
      set(val) {
        const value = typeof val === 'string' ? val : JSON.stringify(val);
        this.setDataValue('options', value);
      },
      get() {
        const value = this.getDataValue('options');
        if (value) {
          return JSON.parse(value);
        }
        return {};
      },
    },
  },
  {
    sequelize,
    tableName: 'layer',
    modelName: 'layer',
    underscored: true,
  },
);

module.exports = Layer;
