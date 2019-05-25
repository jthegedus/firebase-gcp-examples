import * as functions from "firebase-functions";

const onNewUser = functions.auth.user().onCreate(user => {
  // ...
});

export { onNewUser };
