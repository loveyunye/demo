const Layer = require('../models/layer');

class LayersCtl {

  async list(ctx) {
    const layers = await Layer.findAll({ where: { screen_id: +ctx.params.screenId, requirePath: 'DigitalFlop' } });
    console.log(layers.length);
    // console.log(layers);
    // for(let i = 0;i < layers.length;i++) {
    //   const item = await Layer.findOne({ where: {id: layers[i],id}});
    //   console.log(item);
    // } 
    ctx.body = layers;
  }

  async edit(ctx) {
    const layers = await Layer.findAll({ where: { screen_id: +ctx.params.screenId, requirePath: 'DigitalFlop'  } });
    // console.log(layers.length);
    // console.log(layers);
    for(let i = 0;i < layers.length;i++) {
      const options = layers[i].options
      const { textStyle, prefixStyle, suffixStyle } = options;
      options.textStyle = Object.assign(textStyle, {
          "gradient": {
            "angle": 0,
            "gradientColor": [
                {
                    "offset": 0,
                    "color": "rgb(51, 209, 243)"
                },
                {
                    "offset": 1,
                    "color": "#FFED91"
                }
            ],
            "show": false
        }
      })
      options.prefixStyle = Object.assign(prefixStyle, {
        "gradient": {
          "angle": 0,
          "gradientColor": [
              {
                  "offset": 0,
                  "color": "rgb(51, 209, 243)"
              },
              {
                  "offset": 1,
                  "color": "#FFED91"
              }
          ],
          "show": false
      }
    })
    options.suffixStyle = Object.assign(suffixStyle, {
      "gradient": {
        "angle": 0,
        "gradientColor": [
            {
                "offset": 0,
                "color": "rgb(51, 209, 243)"
            },
            {
                "offset": 1,
                "color": "#FFED91"
            }
        ],
        "show": false
    }
  })
      const item = await Layer.findOne({ where: {id: layers[i].id}});
      await item.update({options: options});
      // console.log(item);
    } 
    ctx.body = layers;
  }
}

module.exports = new LayersCtl();
