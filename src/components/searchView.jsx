import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { backToView, changeView, setSearchQuery, comingFromSearch } from '../state';

const SearchView = ({
  items,
  searchQuery,
  setSearchQuery,
  comingFromSearch,
  backToView,
  changeView,
  lastView
}) => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const query = searchQuery.trim();
    if (query.length <= 2) {
      setSearchResults([]);
      return;
    }
    const queryRegexp = new RegExp(query, 'gi');
    const results = items.filter(i =>
      queryRegexp.test(i.name) ||
      queryRegexp.test(i.description) ||
      queryRegexp.test(i.category) ||
      i.tags.some(t => queryRegexp.test(t)) ||
      i.variations.some(v => queryRegexp.test(v.name))
    );
    setSearchResults(results);
  }, [items, searchQuery]);

  return (
    <>
      <div>
        <button className="mx-4 my-2" onClick={e => {
          backToView(lastView);
        }}>
          <img src="/arrow-left.svg" alt="Back"/>
        </button>
        <div className="flex flex-col items-center mt-4 mb-4">
          <img src="/search.svg" alt="" className="pb-4" />
          <h1 className="text-3xl text-center">Search</h1>
        </div>
        <div className="flex flex-col divide-y-2 divide-gray-300 divide-double">
          <input
            type="search"
            className="shadow appearance-none border rounded w-auto mx-4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
            aria-label="Search"
            placeholder="Search..."
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col divide-y-2 divide-gray-300 divide-double">
          {
            searchQuery.trim().length > 0 &&
            searchResults.length > 0 &&
            searchResults.map(i => {
              const withVariations = i.variations.length > 1;
              return (
                <div
                  key={i.name}
                  className="min-h-16 w-full p-4 grid grid-cols-4 hover:bg-gray-200 cursor-pointer"
                  onClick={e => {
                    comingFromSearch(true);
                    changeView('add', i, true);
                  }}
                >
                  <div
                    className={ Boolean(i.image)
                      ? 'col-start-1 col-end-4'
                      : 'col-start-1 col-end-5'
                    }
                  >
                    <h2 className="text-xl self-center block w-full mb-1">
                      {i.name}
                      {
                        Boolean(i.tags.length) &&
                        i.tags.map(tag => (
                          <span key={tag} className="bg-gray-200 text-base px-2 py-1 mx-2 rounded-lg">{tag}</span>
                        ))
                      }
                    </h2>
                    <p className="text-sm text-gray-800">{i.description}</p>
                    {
                      withVariations ? (
                        <span className="bg-black text-white px-2 py-1 rounded-md">
                          {i.variations.length} options
                        </span>
                      ) : (
                        <p className="text-lg font-bold">
                          {i.variations[0].price} €
                        </p>
                      )
                    }
                  </div>
                  {
                    Boolean(i.image) &&
                    <div className="col-start-4 col-end-5 text-right">
                      <div
                        className="h-24 w-24 bg-cover rounded-lg inline-block"
                        style={{ backgroundImage: `url(${i.image})` }}
                      />
                    </div>
                  }
                </div>
              );
            })
          }
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    items: state.menu.categories.reduce((a, c) => {
      return [...a, ...c.items.map(i => ({ ...i, category: c.name }))];
    }, []),
    lastView: state.user.lastView,
    searchQuery: state.user.searchQuery
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeView: bindActionCreators(changeView, dispatch),
    backToView: bindActionCreators(backToView, dispatch),
    setSearchQuery: bindActionCreators(setSearchQuery, dispatch),
    comingFromSearch: bindActionCreators(comingFromSearch, dispatch)
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(SearchView);
