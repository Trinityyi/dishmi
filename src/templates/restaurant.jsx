import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import CategoryView from '../components/categoryView';
import ItemView from '../components/itemView';
import AddView from '../components/addView';
import CartView from '../components/cartView';
import { initializeMenu } from '../state';

const RestaurantPage = ({
  data,
  initializeMenu,
  menuData,
  view,
  family,
  category
}) => {
  useEffect(() => {
    initializeMenu(data.dataCsv.menu);
  }, [data, initializeMenu]);

  if (!menuData || !menuData.families || !menuData.families.length) return null;

  return (
    <Layout title="">
      {
        view === 'families' &&
        <CategoryView
          categories={menuData.families}
          isFamily
        />
      }
      {
        view === 'categories' &&
        <CategoryView
          categories={family.categories}
          title={family.name}
        />
      }
      {
        view === 'items' &&
        <ItemView
          items={category.items}
          title={category.name}
        />
      }
      {
        view === 'add' &&
        <AddView />
      }
      {
        view === 'cart' &&
        <CartView />
      }
    </Layout>
  );
};

const mapStateToProps = state => {
  return {
    menuData: state.menu,
    view: state.user.view,
    family: state.user.family,
    category: state.user.category,
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
