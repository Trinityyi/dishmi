import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

const RestaurantPage = ({ data }) => {
};

export default RestaurantPage;

export const query = graphql`
  query($slug: String!) {
    dataCsv(fields: { slug: { eq: $slug } }) {
      menu {
        itemName
        itemDescription
        itemPrice
        categoryName
        familyName
        modelName
        imageUrl
        tagList
      }
    }
  }
`;
