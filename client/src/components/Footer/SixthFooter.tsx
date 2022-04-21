import React from "react";
import "../../styles/components/Footer/SixthFooter.css";

function SixthFooter({ chosenMode }: { chosenMode: boolean | undefined }) {
  return (
    <div
      className={`sixthFooter ${
        chosenMode === false ? "sixthFooter-dark" : "sixthFooter-light"
      }`}
    >
      <footer>
        <section>About us</section>
        <section>Press</section>
        <section>Jobs</section>
        <section>Investor Relations</section>
        <section>Data privacy</section>
        <section>Preference Center(Consent Management)</section>
        <section>Terms of service</section>
        <section>Legal information</section>
      </footer>
      <footer>2022 ABOUT YOU SE &amp; Co. KG</footer>
    </div>
  );
}

export default React.memo(SixthFooter);
