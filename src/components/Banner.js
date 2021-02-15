import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import styles from "./Banner.module.scss";

const Banner = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "images/profile-pic.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 150, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <div className={styles.banner}>
      <div className={styles.imageContainer}>
        <Img fluid={data.file.childImageSharp.fluid} />
      </div>
      <div className={styles.bannerTitle}>
        <h1>
          Hi, <a href="/about">I&apos;m Chen</a>,{" "}
        </h1>
        <h1>Full stack software engineer.</h1>
      </div>
    </div>
  );
};

export default Banner;
