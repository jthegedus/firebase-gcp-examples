import React from 'react';
import Link from 'next/link';

// everything - except Firestore
// import firebase from "firebase";

// Individual exports & core lib
// import messaging from "firebase/auth";
// import database from 'firebase/database';
// import firestore from 'firebase/firestore';
// import messaging from "firebase/messaging";
// import messaging from "firebase/storage";

// Scoped packages where core lib is explicit
// @firebase
// import { firebase } from "@firebase/app";
// import "@firebase/auth";
// import "@firebase/database";
// import "@firebase/firestore";
// import "@firebase/messaging";
// import "@firebase/storage";

export default class Index extends React.Component {
  static getInitialProps({ req }) {
    if (req) {
      // Runs only in the server
      const faker = require('faker');
      const name = faker.name.findName();
      return { name };
    }

    // Runs only in the client
    return { name: 'Arunoda' };
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
          </Link>
        </div>
      </div>
    );
  }
}
