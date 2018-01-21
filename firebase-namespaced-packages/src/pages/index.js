import React from "react";
import Link from "next/link";
// everything
// import firebase from "firebase";

// Individual exports & core lib
// import database from "firebase/database";
// import messaging from "firebase/messaging";

// Scoped packages where core lib is explicit
// import { firebase } from "@firebase/app";
// import "@firebase/database";
// import "@firebase/messaging";

export default class Index extends React.Component {
  static getInitialProps() {
    // Runs only in the client
    return { name: "Jane Doe" };
  }

  render() {
    const { name } = this.props;
    return (
      <div>
        <h1>Home Page</h1>
        <p>Welcome, {name}</p>
        <div>
          <Link href="/about">
            <a>About Page</a>
          </Link>{" "}
          <Link href="/contact">
            <a>Contacts Page</a>
          </Link>
        </div>
      </div>
    );
  }
}
