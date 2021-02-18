import React from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import styles from "./about.module.scss";

const AboutPage = () => (
  <Layout>
    <Helmet title={`About | ${config.siteTitle}`} />
    <main className={styles.about}>
      <h1>Hi, I&apos;m Chen!</h1>
      <p>
        I am a full-stack software engineer from Kuala Lumpur, Malaysia. Born in
        1998 and graduated in 2020 with a Bachelor&apos;s degree in Computer
        Science. Always enthuasiastic in exploring new or cutting edge
        technologies, I soon found myself enjoying programming, and working in a
        job where I get to play around and experiment with code daily to create
        solutions to modern problems.
      </p>

      <p>
        As someone with a lot of curiousity in many topics, I became greedy and
        also found myself interested and making a hobby out of a lot of things
        other than programming, including but not limited to:
        <ul>
          <li>Computer Science</li>
          <li>Cooking</li>
          <li>Composing</li>
          <li>Piano</li>
          <li>Writing</li>
          <li>And recently, custom mechanical keyboards.</li>
        </ul>
      </p>

      <p>
        I am currently working at{" "}
        <a href="https://tinkerve.com/" target="_blank" rel="noreferrer">
          Tinkerve
        </a>{" "}
        as a full-stack software engineer, working daily on the maintenance and
        improvement of their existing solutions while also participating in the
        development of new systems that attempts to address modern workplace
        issues.
      </p>

      <p>
        At the same time, I also work for myself as a freelance full-stack
        software engineer, providing consultation and software services based on
        the needs and requirements of my client. If you are interested,
        don&apos;t hesitate to drop me your{" "}
        <a href="/contact" target="_blank" rel="noreferrer">
          contact
        </a>
        !
      </p>
    </main>
  </Layout>
);

export default AboutPage;
