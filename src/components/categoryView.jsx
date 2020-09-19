import React from 'react';

const CategoryView = ({
  categories,
  isFamily = false,
  title = '',
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
            <div className="flex flex-col items-center mt-8 mb-4">
              <h1 className="text-3xl text-center">{title}</h1>
            </div>
          )
        }
        <div className="flex flex-col divide-y-2 divide-gray-300 divide-double">
          {
            categories.map(c => (
              <div
                key={c.name}
                className="h-16 w-full flex hover:bg-gray-200 p-4 cursor-pointer"
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

export default CategoryView;
