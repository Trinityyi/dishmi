import { createStore as reduxCreateStore } from 'redux';

const initialState = {
  user: {
    view: 'families',
    family: null,
    category: null,
    item: null,
    lastView: null,
    cart: [],
    searchQuery: '',
    fromSearch: false
  },
  menu: {}
};

const reducer = (state, action) => {
  switch (action.type) {
  case 'INIT_MENU':
    return {
      ...state,
      menu: action.menu
    };
  case 'CHANGE_VIEW':
    return {
      ...state,
      user: {
        ...state.user,
        ...action.data
      }
    };
  case 'BACK_TO_VIEW':
    return {
      ...state,
      user: {
        ...state.user,
        view: action.view,
        lastView: action.lastView
      }
    };
  case 'ADD_ITEM':
    return {
      ...state,
      user: {
        ...state.user,
        cart: [
          ...state.user.cart,
          action.item
        ]
      }
    };
  case 'REMOVE_ITEM':
    return {
      ...state,
      user: {
        ...state.user,
        cart: state.user.cart.filter((i, p) => p !== action.index)
      }
    };
  case 'STORE_SEARCH_QUERY':
    return {
      ...state,
      user: {
        ...state.user,
        searchQuery: action.query
      }
    };
  case 'SET_FROM_SEARCH':
    return {
      ...state,
      user: {
        ...state.user,
        fromSearch: action.fromSearch
      }
    };
  default:
    return state;
  }
};

export const setSearchQuery = query => {
  return {
    type: 'STORE_SEARCH_QUERY',
    query
  };
};

export const addItem = item => {
  return {
    type: 'ADD_ITEM',
    item
  };
};

export const removeItem = index => {
  return {
    type: 'REMOVE_ITEM',
    index
  };
};

export const backToView = (view, lastView) => {
  return {
    type: 'BACK_TO_VIEW',
    view,
    lastView: view === 'search' ? lastView : null
  };
};

export const comingFromSearch = fromSearch => {
  return {
    type: 'SET_FROM_SEARCH',
    fromSearch
  };
};

export const changeView = (view, selection) => {
  switch (view) {
  case 'families':
    return {
      type: 'CHANGE_VIEW',
      data: {
        view,
        family: null,
        category: null
      }
    };
  case 'categories':
    return {
      type: 'CHANGE_VIEW',
      data: {
        view,
        family: selection
      }
    };
  case 'items':
    return {
      type: 'CHANGE_VIEW',
      data: {
        view,
        category: selection
      }
    };
  case 'add':
    return {
      type: 'CHANGE_VIEW',
      data: {
        view,
        item: selection
      }
    };
  case 'cart':
    return {
      type: 'CHANGE_VIEW',
      data: {
        view,
        ...(selection !== 'cart' && selection !== 'search'
          ? { lastView: selection }
          : {})
      }
    };
  case 'search':
    return {
      type: 'CHANGE_VIEW',
      data: {
        view,
        ...(selection !== 'cart' && selection !== 'search'
          ? { lastView: selection }
          : {})
      }
    };
  default:
    break;
  }
};

export const initializeMenu = rawMenuData => {
  const menuData = rawMenuData
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
      const image = rawItem.imageUrl.trim();

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
                  image,
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
              image,
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
          image,
          variations: [{ name, price }]
        });
        return menu;
      }

      // If family, category and model exist
      model.variations.push({ name, price });
      return menu;
    }, { families: [] });

  return {
    type: 'INIT_MENU',
    menu: menuData
  };
};

const createStore = () => reduxCreateStore(reducer, initialState);
export default createStore;
