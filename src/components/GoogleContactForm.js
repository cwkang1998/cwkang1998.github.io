import React, { useState } from "react";
import styles from "./GoogleContactForm.module.scss";

const GoogleContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className={styles.container}>
      <form
        method="GET"
        action="https://docs.google.com/forms/d/e/1FAIpQLScKebTypPR5iOz1uBlrrJwn3sdt1Ma0LcnIDxrsRPU94SzdWQ/formResponse"
        encType="text/plain"
        target="gFormSubmit"
        onSubmit={() => setIsSubmitted(true)}
        hidden={isSubmitted}
      >
        <label htmlFor="entry.1645378407">Name</label>
        <input
          name="entry.1645378407"
          type="text"
          placeholder="John Doe"
          required
        />
        <label htmlFor="entry.1553054032">Email</label>
        <input
          name="entry.1553054032"
          type="email"
          placeholder="youemail@someemail.com"
          required
        />
        <label htmlFor="entry.2007973957">Message</label>
        <textarea
          name="entry.2007973957"
          rows="5"
          placeholder="I would like an appointment."
          required
        />
        <input type="submit" value="Submit" />
        <iframe name="gFormSubmit" title="gFormSubmit" hidden />
      </form>
      <h3 hidden={!isSubmitted}>Thank you! I will contact you soon.</h3>
    </div>
  );
};

export default GoogleContactForm;
