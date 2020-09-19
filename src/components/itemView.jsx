import React from 'react';

const ItemView = ({
  items,
  title = '',
}) => {
  return (
    <>
      <div>
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
                  className={`
                    min-h-16 w-full p-4 grid grid-cols-9
                    ${!withVariations ? 'hover:bg-gray-200 cursor-pointer' : ''}
                  `}
                >
                  <div className="col-start-1 col-end-9">
                    {
                      Boolean(i.image) &&
                      <div
                        className="col-start-1 col-end-10 h-32 w-1/3 bg-cover rounded-lg inline-block float-left"
                        style={{ backgroundImage: `url(${i.image})` }}
                      />
                    }
                    <div className={Boolean(i.image) ? 'w-2/3 inline-block pl-4' : ''}>
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
                    </div>
                  </div>
                  <div className="col-start-9 col-end-10 flex flex-row items-center justify-end">
                    <p className="text-lg font-medium">
                      {
                        !withVariations && i.variations[0].price
                      }
                    </p>
                  </div>
                  {
                    withVariations &&
                    i.variations.map(v => (
                      <>
                        <div className="col-start-1 col-end-10 hover:bg-gray-200 cursor-pointer">
                          <h3 className="text-lg self-center inline-block py-1 pl-4 w-5/6">
                            {v.name}
                          </h3>
                          <div className="float-right flex flex-row items-center justify-end">
                            <p className="text-lg font-medium">{v.price}</p>
                          </div>
                        </div>
                      </>
                    ))
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

export default ItemView;
