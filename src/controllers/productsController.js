const axios = require("axios");

/* Datos de los productos buscados */
exports.productosSearch = async function (req, res) {
    const { q } = req.query;
    try {
      const itemsData = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${q}&limit=4`)
      /* Controlo que exista algun producto buscado */
      if (Object.entries(Object.keys(itemsData.data.results)).length === 0) {
        return res.status(404).send(
          {
            error:true,
            data:null
          }
        );
      }

      const { results, filters, available_filters } = itemsData.data;
     
      //Adapta respuesta
      const items = results.map(
        ({
          id,
          title,
          price,
          currency_id,
          thumbnail,
          thumbnail_id,
          condition,
          shipping: { free_shipping },
          address,
        }) => {
          return {
            id,
            title,
            price: {
              currency: currency_id,
              amount: Math.floor(price).toString(),
              decimals: ((price % 1) * 100).toFixed(0),
            },
            thumbnail,
            picture: `http://http2.mlstatic.com/D_${thumbnail_id}-L.jpg`,
            condition,
            free_shipping,
            address,
          };
        }
      );
  
      //Obteniendo categorias a traves de filter o de avaiable filters.
      let itemCategories;
      if (filters.length) {
        itemCategories = filters[0].values[0].path_from_root.map(
          (category) => category.name
        );
      } else {
        let firstCategory = available_filters[0]?.values;
  
        //Categoría con más resultados.
        firstCategory.sort(function (a, b) {
          if (a.results > b.results) {
            return -1;
          }
          if (a.results < b.results) {
            return 1;
          }
          return 0;
        });
  
        firstCategory = firstCategory[0].id;
  
        itemCategories = await axios.get(
          `https://api.mercadolibre.com/categories/${firstCategory}`
        );
  
        itemCategories = itemCategories.data.path_from_root.map(
          (category) => category.name
        );
        //Devuelve los ultimos 5 en caso que haya mas
        itemCategories =
          itemCategories.length > 5 ? itemCategories.slice(-5) : itemCategories;
      }
  
      const data = {
        author: {
          name: "Rafael",
          lastname: "Dimatz",
        },
        categories: itemCategories,
        items,
      };
  
      res.status(200);
      res.send({
        error:false,
        data:data
      })
  
    } catch (error) {
      console.error(error);
  
      res.status(500);
      res.send(error);
    }
  };