const axios = require("axios");

/* Detalle de un Producto */
exports.productDetail = async function (req, res) {
    const itemId = req.params.id;
  
    try {
     const itemData = await axios.get(`https://api.mercadolibre.com/items/${itemId}`)
     const itemDescription = await axios.get(`https://api.mercadolibre.com/items/${itemId}/description`)
      
      const {
        id,
        title,
        price,
        currency_id,
        secure_thumbnail,
        pictures,
        condition,
        shipping: { free_shipping },
        sold_quantity,
        category_id,
      } = itemData.data;
      
      let itemCategory = await axios.get(`https://api.mercadolibre.com/categories/${category_id}`);
  
      itemCategory = itemCategory.data.path_from_root.map(
        (category) => category.name
      );
  
      const data = {
        author: {
          name: "Rafael",
          lastname: "Dimatz",
        },
        item: {
          id,
          title,
          price: {
            currency: currency_id,
            amount: Math.floor(price).toString(),
            decimals: ((price % 1) * 100).toFixed(0),
          },
          thumbnail: secure_thumbnail,
          picture: pictures[0].secure_url,
          condition,
          free_shipping,
          sold_quantity,
          description: itemDescription.data.plain_text,
          categories: itemCategory,
        },
      };
      res.status(200).send({
        error:false,
        data:data
      })
   
    } catch (error) {
      if (error.response.data.status === 404){
        res.status(404).send({
          error:true,
          data:null
        })
      }else{
      res.status(500).send({
        error:true,
        data:null
      })
    }
    }
  };
  