import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeView } from '../state';

const CategoryView = ({
  categories,
  metadata,
  changeView
}) => {
  return (
    <>
      <div>
        <div className="flex flex-col items-center mt-2 mb-2">
          <div
            className="max-h-64 max-w-64 p-4 bg-cover rounded-lg inline-block mb-4 object-contain"
          >
            <img src={metadata.restaurantLogo} alt="" />
          </div>
          <h1 className="text-3xl text-center mb-4">{metadata.restaurantName}</h1>
          <p className="px-4 mb-4 text-gray-800 text-sm">{metadata.restaurantDescription}</p>
        </div>
        <div className="flex flex-col divide-y-2 divide-gray-300 divide-double">
          {
            categories.map(c => (
              <div
                key={c.name}
                className="h-16 w-full flex hover:bg-gray-200 p-4 cursor-pointer"
                onClick={() => {
                  changeView('items', c);
                }}
              >
                <h2 className="text-2xl self-center">{c.name}</h2>
              </div>
            ))
          }
        </div>
      </div>
      <div>
        <p className="text-gray-700 text-sm text-center mt-4 mb-8 px-4">{metadata.restaurantFooter}</p>
        <div className="flex flex-row justify-evenly mb-2">
          {
            Boolean(metadata.instagramLink && metadata.instagramLink.trim()) &&
            <a href={metadata.instagramLink} rel="nofollow noreferrer" target="_blank">
              <img src="/instagram.svg" alt="Instagram" />
            </a>
          }
          {
            Boolean(metadata.facebookLink && metadata.facebookLink.trim()) &&
            <a href={metadata.facebookLink} rel="nofollow noreferrer" target="_blank">
              <img src="/facebook.svg" alt="Facebook" />
            </a>
          }
          {
            Boolean(metadata.twitterLink && metadata.twitterLink.trim()) &&
            <a href={metadata.twitterLink} rel="nofollow noreferrer" target="_blank">
              <img src="/twitter.svg" alt="Twitter" />
            </a>
          }
          {
            Boolean(metadata.websiteLink && metadata.websiteLink.trim()) &&
            <a href={metadata.websiteLink} rel="nofollow noreferrer" target="_blank">
              <img src="/globe.svg" alt="Website" />
            </a>
          }
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    metadata: state.menuMetadata
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeView: bindActionCreators(changeView, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView);
