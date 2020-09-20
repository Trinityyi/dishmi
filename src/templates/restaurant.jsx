import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import CategoryView from '../components/categoryView';
import ItemView from '../components/itemView';
import AddView from '../components/addView';
import CartView from '../components/cartView';
import SearchView from '../components/searchView';
import { initializeMenu, changeView } from '../state';

const RestaurantPage = ({
  data,
  initializeMenu,
  changeView,
  menuData,
  view,
  category
}) => {
  useEffect(() => {
    initializeMenu(data.dataCsv.menu);
  }, [data, initializeMenu]);

  useEffect(() => {
    if (!view) changeView('categories');
  }, [changeView, view]);

  if (!menuData || !menuData.categories || !menuData.categories.length) return null;

  return (
    <Layout title="">
      {
        view === 'categories' &&
        <CategoryView
          categories={menuData.categories}
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
      {
        view === 'search' &&
        <SearchView />
      }
    </Layout>
  );
};

const mapStateToProps = state => {
  return {
    menuData: state.menu,
    view: state.user.view,
    category: state.user.category,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initializeMenu: bindActionCreators(initializeMenu, dispatch),
    changeView: bindActionCreators(changeView, dispatch)
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
        modelName
        imageUrl
        tagList
      }
    }
  }
`;
