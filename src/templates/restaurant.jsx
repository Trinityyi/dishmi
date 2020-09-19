import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import { initializeMenu } from '../state';

const RestaurantPage = ({
  data,
  initializeMenu,
  menuData
}) => {
  useEffect(() => {
    initializeMenu(data.dataCsv.menu);
  }, [data, initializeMenu]);

  if (!menuData || !menuData.families || !menuData.families.length) return null;

  return (
    <Layout title="">
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
    </Layout>
  );
};

const mapStateToProps = state => {
  return {
    menuData: state.menu
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initializeMenu: bindActionCreators(initializeMenu, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantPage);

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
