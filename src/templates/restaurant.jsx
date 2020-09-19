import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

const RestaurantPage = ({ data }) => {
  const menuData = data.dataCsv.menu
    .reduce((menu, rawItem) => {
      // Parse data
      const familyName = rawItem.familyName.trim();
      const categoryName = rawItem.categoryName.trim();
      const modelName = rawItem.modelName.trim().length > 0
        ? rawItem.modelName.trim()
        : rawItem.itemName.trim();
      const tags = rawItem.tagList.split(',').filter(t => t && t.length > 0);
      const description = rawItem.itemDescription.trim();
      const name = rawItem.itemName.trim();
      const price = parseFloat(rawItem.itemPrice).toFixed(2);

      // If family doesn't exist
      const fam = menu.families.find(f => f.name === familyName);
      if (!fam) {
        menu.families.push({
          name: familyName,
          categories: [
            {
              name: categoryName,
              items: [
                {
                  name: modelName,
                  description,
                  tags,
                  variations: [{ name, price }]
                }
              ]
            }
          ]
        });
        return menu;
      }

      // If family exists, category doesn't exist
      const cat = fam.categories.find(c => c.name === categoryName);
      if (!cat) {
        fam.categories.push({
          name: categoryName,
          items: [
            {
              name: modelName,
              description,
              tags,
              variations: [{ name, price }]
            }
          ]
        });
        return menu;
      }

      // If family and category exits, model doesn't exist
      const model = cat.items.find(i => i.name === modelName);
      if (!model) {
        cat.items.push({
          name: modelName,
          description,
          tags,
          variations: [{ name, price }]
        });
        return menu;
      }

      // If family, category and model exist
      model.variations.push({ name, price });
      return menu;
    }, { families: [] });

};

export default RestaurantPage;

export const query = graphql`
  query($slug: String!) {
    dataCsv(fields: { slug: { eq: $slug } }) {
      menu {
        itemName
        itemDescription
        itemPrice
        categoryName
        familyName
        modelName
        imageUrl
        tagList
      }
    }
  }
`;
