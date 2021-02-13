import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import config from "../../data/SiteConfig";
import styles from "./Header.module.scss";

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "images/icon.png" }) {
        childImageSharp {
          fixed(width: 75, height: 75) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);
  return (
    <header>
      <h1>
        <Link to="/" activeClassName={styles.activeNav}>
          {/* {config.siteTitle} */}
          <Img fixed={data.file.childImageSharp.fixed} />
        </Link>
      </h1>
      <nav>
        <ul className={styles.mainNav}>
          <li>
            <Link to="/blog" activeClassName={styles.activeNav}>
              Blog
            </Link>
          </li>
          <li>
            <Link to="/portfolio" activeClassName={styles.activeNav}>
              Portfolio
            </Link>
          </li>
          <li>
            <Link to="/contact" activeClassName={styles.activeNav}>
              Contact
            </Link>
          </li>
          <li>
            <Link to="/about" activeClassName={styles.activeNav}>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
