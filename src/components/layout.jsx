import React from 'react';
import Helmet from 'react-helmet';

require('../styles/index.scss');

const Layout = ({
  title,
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
      <div className="container mx-auto max-w-3xl">
        {children}
      </div>
    </>
  );
};

export default Layout;
