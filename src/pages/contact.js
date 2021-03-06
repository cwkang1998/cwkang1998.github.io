import React from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import GoogleContactForm from "../components/GoogleContactForm";
import config from "../../data/SiteConfig";

const ContactPage = () => (
  <Layout>
    <main>
      <Helmet title={`Contact | ${config.siteTitle}`} />
      <h1>Contact</h1>
      <GoogleContactForm />
    </main>
  </Layout>
);
export default ContactPage;
