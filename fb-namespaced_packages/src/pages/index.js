import React from "react";
import Link from "next/link";
// everything - except Firestore
// import firebase from "firebase";

// Individual exports & core lib
// import messaging from "firebase/auth";
// import database from "firebase/database";
// import messaging from "firebase/messaging";
// import messaging from "firebase/storage";

// Scoped packages where core lib is explicit
// @firebase                                  669.3 180.53
// import { firebase } from "@firebase/app"; // 19.1   6.27
// import "@firebase/auth"; // 134.81 43.42
// import "@firebase/database"; // 193.34 47.15
// import "@firebase/firestore";          // 212.9  50.64
// import "@firebase/messaging"; // 19.66  5.63
// import "@firebase/storage"; // 35.89  10.5

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
