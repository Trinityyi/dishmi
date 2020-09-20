import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeView } from '../state';

const ItemView = ({
  items,
  title = '',
  changeView,
  selectedFamily
}) => {
  return (
    <>
      <div>
        <button onClick={e => {
          changeView('categories', selectedFamily);
        }}>
          <img src="/arrow-left.svg" alt="Back"/>
        </button>
        <div className="flex flex-col items-center mt-8 mb-4">
          <h1 className="text-3xl text-center">{title}</h1>
        </div>
        <div className="flex flex-col divide-y-2 divide-gray-300 divide-double">
          {
            items.map(i => {
              const withVariations = i.variations.length > 1;
              return (
                <div
                  key={i.name}
                  className="min-h-16 w-full p-4 grid grid-cols-4 hover:bg-gray-200 cursor-pointer"
                  onClick={e => {
                    changeView('add', i);
                  }}
                >
                  <div
                    className={ withVariations
                      ? 'col-start-1 col-end-5'
                      : 'col-start-1 col-end-4'
                    }
                  >
                    <h2 className="text-xl self-center block w-full mb-1">
                      {i.name}
                      {
                        Boolean(i.tags.length) &&
                        i.tags.map(tag => (
                          <span className="bg-gray-200 text-base px-2 py-1 mx-2 rounded-lg">{tag}</span>
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
    selectedFamily: state.user.family
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeView: bindActionCreators(changeView, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemView);
