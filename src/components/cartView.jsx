import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { backToView, removeItem } from '../state';

const CartView = ({
  cart,
  backToView,
  removeItem,
  lastView
}) => {
  return (
    <>
      <div>
        <button className="mx-4 my-2" onClick={e => {
          backToView(lastView);
        }}>
          <img src="/arrow-left.svg" alt="Back"/>
        </button>
        <div className="flex flex-col items-center mt-4 mb-4">
          <img src="/shopping-bag.svg" alt="" className="pb-4" />
          <h1 className="text-3xl text-center">My order</h1>
        </div>
        <div className="flex flex-col divide-y-2 divide-gray-300 divide-double">
          {
            cart.map((i, p) => (
              <div
                key={`${i.name}-${p}`}
                className="min-h-16 w-full grid grid-cols-5 p-2"
              >
                <div
                  className="w-full col-start-1 col-end-5"
                >
                  <h2 className="text-xl self-center block w-full">{i.name}</h2>
                  {
                    Boolean(i.notes && i.notes.length) &&
                    <p className="text-sm text-gray-800">{i.notes}</p>
                  }
                  <p className="text-gray-900">{i.quantity > 1 ? `${i.quantity} x ` : ''}{i.price}{i.quantity > 1 ? ` = ${(i.quantity * parseFloat(i.price)).toFixed(2)}` : ''} €</p>
                </div>
                <div className="col-start-5 col-end-6 text-right">
                  <button
                    className="mr-4"
                    onClick={() => {
                      removeItem(p);
                    }}
                  >
                    <img src="/x-circle.svg" alt="Remove"/>
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    cart: state.user.cart,
    lastView: state.user.lastView
  };
};

const mapDispatchToProps = dispatch => {
  return {
    backToView: bindActionCreators(backToView, dispatch),
    removeItem: bindActionCreators(removeItem, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartView);
