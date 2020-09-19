import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeView } from '../state';

const CategoryView = ({
  categories,
  isFamily = false,
  title = '',
  changeView
}) => {
  return (
    <>
      <div>
        {
          isFamily ? (
            <div className="flex flex-col items-center mt-2 mb-4">
              {/* TODO: Add custom HTML etc. */}
              <h1 className="text-3xl text-center">My restaurant</h1>
            </div>
          ) : (
            <>
              <button onClick={e => {
                changeView('families');
              }}>
                <img src="/arrow-left.svg" alt="Back"/>
              </button>
              <div className="flex flex-col items-center mt-8 mb-4">
                <h1 className="text-3xl text-center">{title}</h1>
              </div>
            </>
          )
        }
        <div className="flex flex-col divide-y-2 divide-gray-300 divide-double">
          {
            categories.map(c => (
              <div
                key={c.name}
                className="h-16 w-full flex hover:bg-gray-200 p-4 cursor-pointer"
                onClick={() => {
                  if (isFamily) changeView('categories', c);
                  else changeView('items', c);
                }}
              >
                <h2 className="text-2xl self-center">{c.name}</h2>
              </div>
            ))
          }
        </div>
      </div>
      {
        isFamily ? (
          <div>
            <p className="text-gray-700 text-sm text-center mt-4 mb-2">Cool restaurant located at a place far far away</p>
          </div>
        ) : null
      }
    </>
  );
};

const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeView: bindActionCreators(changeView, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView);
