module.exports = {
  siteMetadata: {
    title: `dishmi`,
    description: `e-Menu application`,
    author: `Isabelle Viktoria Maciohsek`,
    siteUrl: `dishmi.netlify.app`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `dishmi`,
        short_name: `dishmi`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `static/favicon.ico`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify`
  ],
}
