import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import Link from './Link';

import { getPagesInSection } from '../utils/pageUtils';

const getLinks = ({ pathname, section, onClick }) => {
  return getPagesInSection(section).map(({ group, component, path }, index) => {
    const key = index.toString();
    if (group) {
      return {
        content: (
          <li className="Nav__Group m-t-2" key={key}>
            {group}
          </li>
        ),
      };
    }
    const isSelected = pathname === path;
    const name = component.meta.linkText || component.meta.name;

    return {
      content: (
        <li key={key}>
          <Link href={path}>
            <a className={`Nav__Link ${isSelected ? 'active' : ''}`} onClick={onClick}>
              {name} {component.meta.isPlaceholder && '*'}
              {component.meta.isBeta && <span className="badge badge-success">beta</span>}
            </a>
          </Link>
        </li>
      ),
      name: name.toLowerCase(),
    };
  });
};

const Sidebar = ({ router: { pathname }, section, onClick, onBackClick }) => {
  const [links, updateLinks] = useState([]);
  const [filteredLinks, updateFilteredLinks] = useState('');

  const [searchInput, updateSearchInput] = useState('');
  const searchEl = useRef(null);

  useEffect(() => {
    if (window) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      if (window) {
        window.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, []);

  useEffect(() => {
    if (searchInput) {
      const searchString = searchInput.toLowerCase();
      updateFilteredLinks(
        links
          .filter(({ name }) => typeof name !== 'string' || name.indexOf(searchString) !== -1)
          .map(({ content }) => content),
      );
    } else {
      updateFilteredLinks(links.map(({ content }) => content));
    }
  }, [searchInput, links]);

  useEffect(() => {
    updateSearchInput('');
    updateLinks(getLinks({ pathname, section, onClick }));
  }, [section]);

  useEffect(() => {
    updateLinks(getLinks({ pathname, section, onClick }));
  }, [pathname]);

  const handleKeyDown = (event) => {
    // Allow user to type slash into liveEditor.
    if (event.target.className !== 'npm__react-simple-code-editor__textarea') {
      if (event.code === 'Slash' || event.keyCode === 191) {
        event.preventDefault();
        if (searchEl && searchEl.current) {
          searchEl.current.focus();
        }
      }
    }
  };

  return (
    <div className="Sidebar__Fixed" role="navigation" aria-label="Secondary navigation">
      <div className="Sidebar__Header">
        <button
          onClick={onBackClick}
          className="btn p-x-0 m-r-1 visible-xs-inline-block visible-sm-inline-block visible-md-inline-block "
        >
          <svg width="20" height="16" viewBox="0 0 20 16" xmlns="http://www.w3.org/2000/svg">
            <title>ICON: Back</title>
            <path d="M0 8l8-8 1.5 1.5L4 7h16v2H4l5.5 5.5L8 16" fill="#00B9FF" fillRule="evenodd" />
          </svg>
        </button>
        <h5 className="Sidebar__Title">{section.title}</h5>
      </div>
      {section.searchable && (
        <input
          className="Sidebar__Search"
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => updateSearchInput(e.target.value)}
          ref={searchEl}
        />
      )}
      <div className="Sidebar__Inner">
        <ul className="Nav">{filteredLinks}</ul>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  router: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
  section: PropTypes.shape({
    title: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(
      PropTypes.shape({ title: PropTypes.string.isRequired, dir: PropTypes.string.isRequired }),
    ),
    searchable: PropTypes.bool,
  }).isRequired,
};

export default withRouter(Sidebar);
