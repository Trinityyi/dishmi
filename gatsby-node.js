const path = require(`path`);
const fs = require(`fs`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `DataCsv`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug
    });
  };
};

exports.createPages = async({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allDataCsv {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);
  result.data.allDataCsv.edges.forEach(({ node }) => {
    const fileName = node.fields.slug.slice(1, -1);
    const metadata = JSON.parse(
      fs.readFileSync(`./metadata/${fileName}.json`, 'utf-8')
    );
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/restaurant.jsx`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        metadata,
        slug: node.fields.slug
      }
    });
  });
};
