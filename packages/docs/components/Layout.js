import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { Button, SlidingPanel } from '@transferwise/components';
import Link from './Link';

import { getFirstPageInSection, getPageFromPath } from '../utils/pageUtils';
import sections from '../utils/sections';

import Sidebar from './Sidebar';
import ThreeColumnLayout from './layout/threeColumnLayout';

const githubURL = `https://github.com/transferwise/neptune-web/edit/main/packages/docs/pages`;

const Layout = ({ children, router: { pathname } }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuOpen2, setMenuOpen2] = useState(false);
  const pathParts = pathname.split('/');
  const rootDir = pathParts[1];
  const page = getPageFromPath(pathname);
  const editPath = `${githubURL}${pathname}.mdx`;

  const firstContent = (
    <div className="Header__Fixed" role="navigation" aria-label="Primary navigation">
      <Link href="/">
        <a className="Logo">
          <img
            src={`${process.env.ASSET_PREFIX}/static/assets/img/logo_full_inverse.svg`}
            alt="TransferWise Logo"
          />
          <span className="sr-only">TransferWise</span>
        </a>
      </Link>

      <ul className="Nav Nav--dark">
        <li className="Nav__Group">Neptune</li>
        {sections.map((section) => (
          <li key={section.title}>
            <Link href={getFirstPageInSection(section).path}>
              <a
                className={`Nav__Link ${rootDir === section.dir ? 'active' : ''}`}
                onClick={() => {
                  setMenuOpen2(true);
                }}
              >
                {section.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  const secondContent = page && (
    <Sidebar
      section={sections.find((section) => section.dir === rootDir)}
      onBackClick={() => setMenuOpen2(false)}
      onClick={() => {
        setMenuOpen2(false);
        setMenuOpen(false);
      }}
    />
  );

  const thirdContent = (
    <div className="Content" role="main">
      {page && <h1 className="colored-dot">{page.component.meta.name}</h1>}
      {page && page.component.meta.isBeta && <span className="badge">beta</span>}
      {children}
      <a className="btn btn-default m-t-4" href={editPath}>
        Edit these docs on Github
      </a>
    </div>
  );

  const mobileContent = (
    <div className="Mobile_Menu">
      {!menuOpen ? (
        <button
          className="navbar-toggle collapsed visible-sm-inline-block visible-md-inline-block"
          onClick={() => setMenuOpen(!menuOpen)}
          data-toggle="collapse"
          aria-expanded="false"
          type="button"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
      ) : (
        <button
          type="button"
          className="navbar-toggle close visible-sm-inline-block visible-md-inline-block"
          onClick={() => {
            setMenuOpen(false);
            setMenuOpen2(false);
          }}
        >
          ×
        </button>
      )}
      <SlidingPanel open={menuOpen}>
        <div className="Header">{firstContent}</div>
        <SlidingPanel open={menuOpen2}>{secondContent}</SlidingPanel>
      </SlidingPanel>
    </div>
  );

  return (
    <ThreeColumnLayout
      mobileContent={mobileContent}
      firstContent={firstContent}
      secondContent={secondContent}
      thirdContent={thirdContent}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  router: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
};

export default withRouter(Layout);
