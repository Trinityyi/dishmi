import React, { useState, useRef } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeView, backToView, addItem } from '../state';

const AddView = ({
  changeView,
  backToView,
  lastView,
  selectedCategory,
  selectedItem,
  fromSearch,
  addItem
}) => {
  const withVariations = selectedItem.variations.length > 1;
  const [selectedVariation, setSelectedVariation] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const notesInput = useRef(null);

  return (
    <>
      <div>
        <button className="mx-4 my-2" onClick={e => {
          if (fromSearch) backToView('search', lastView);
          else changeView('items', selectedCategory);
        }}>
          <img src="/arrow-left.svg" alt="Back"/>
        </button>
        <div className="flex flex-col items-center mt-4 mb-4">
          {
            Boolean(selectedItem.image) &&
            <div className="col-start-4 col-end-5 text-right">
              <div
                className="h-48 w-64 bg-cover rounded-lg inline-block"
                style={{ backgroundImage: `url(${selectedItem.image})` }}
              />
            </div>
          }
          <h1 className="text-3xl text-center">{selectedItem.name}</h1>
          <p className="text-md pt-2 px-4 pb-4 text-gray-800">{selectedItem.description}</p>
          {
            withVariations ? (
              <div className="flex flex-col divide-y-2 divide-gray-300 divide-double w-full">
                {
                  selectedItem.variations.map((v, i) => (
                    <button
                      key={v.name}
                      className="min-h-16 w-full p-4 grid grid-cols-8 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        setSelectedVariation(i);
                      }}
                    >
                      {
                        selectedVariation === i &&
                        <img src="/check.svg" alt="Selected" />
                      }
                      <div className="col-start-2 col-end-7 text-left">
                        {v.name}
                      </div>
                      <div className="col-start-7 col-end-9">
                        {v.price} €
                      </div>
                    </button>
                  ))
                }
              </div>
            ) : (
              <p className="text-lg font-bold">
                {selectedItem.variations[0].price} €
              </p>
            )
          }
          <form className="w-full grid grid-cols-5 mt-4 pt-4 items-center pb-4 border-t-2 border-gray-200">
            <p className="col-start-1 col-end-6 text-center text-lg pb-2">Quantity:</p>
            <button
              className="col-start-2 col-end-3 text-lg flex flex-row justify-center w-8 h-8 mx-auto"
              onClick={e => {
                e.preventDefault();
                if (quantity > 1) setQuantity(quantity - 1);
              }}
            >
              <img src="/minus-circle.svg" alt="Decrease quantity" height="32" width="32"/>
            </button>
            <div className="col-start-3 col-end-4 text-center w-full text-3xl">{quantity}</div>
            <button
              className="col-start-4 col-end-5 flex flex-row justify-center w-8 h-8 mx-auto"
              onClick={e => {
                e.preventDefault();
                setQuantity(quantity + 1);
              }}
            >
              <img src="/plus-circle.svg" alt="Increase quantity" height="32" width="32"/>
            </button>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline col-start-2 col-end-5 mt-2"
              aria-label="Notes"
              placeholder="Notes..."
              ref={notesInput}
            />
            <button
              className="col-start-2 col-end-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
              onClick={e => {
                e.preventDefault();
                const notes = notesInput.current && notesInput.current.value.trim().length > 0
                  ? notesInput.current.value.trim()
                  : null;
                const variationDescription = selectedItem.variations.length > 1
                  ? ` (${selectedItem.variations[selectedVariation].name})`
                  : '';
                addItem({
                  name: `${selectedItem.name}${variationDescription}`,
                  quantity,
                  notes,
                  price: selectedItem.variations[selectedVariation].price
                });
                if (fromSearch) backToView('search', lastView);
                else changeView('items', selectedCategory);
              }}
            >
              Add to order
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    selectedCategory: state.user.category,
    selectedItem: state.user.item,
    lastView: state.user.lastView,
    fromSearch: state.user.fromSearch
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeView: bindActionCreators(changeView, dispatch),
    backToView: bindActionCreators(backToView, dispatch),
    addItem: bindActionCreators(addItem, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddView);
