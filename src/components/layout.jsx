import React from 'react';
import Helmet from 'react-helmet';

require('../styles/index.scss');

const Layout = ({
  title,
  isIndex = false,
  children
}) => {
  return (
    <>
      <Helmet
        htmlAttributes={ { lang: 'en' } }
        title={ title ? title : 'dishmi' }
        titleTemplate={ title ? `%s - dishmi` : '%s' }
        meta={[
          {
            name: 'description',
            content: 'e-Menu application'
          }
        ]}
      >
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <div className="container mx-auto max-w-3xl pt-4 pb-20 min-h-screen flex flex-col justify-between">
        {children}
      </div>
      {
        !isIndex &&
        <div className="fixed bottom-0 left-0 right-0 h-16 border-t-2 border-gray-200 bg-white grid grid-cols-12">
          <button className="col-start-1 col-end-3 flex items-center justify-center">
            <img src="/shopping-bag.svg" alt="" className="px-4" />
            <span className="hidden sm:inline">Cart</span>
          </button>
          <button className="col-start-3 col-end-11 text-2xl">0.00 €</button>
          <button className="col-start-11 col-end-13 flex items-center justify-center">
            <img src="/search.svg" alt="" className="px-4" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      }
    </>
  );
};

export default Layout;
