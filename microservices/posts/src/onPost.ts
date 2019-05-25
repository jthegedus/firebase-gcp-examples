import * as functions from "firebase-functions";

const onPost = functions.firestore
  .document("posts/{postId}")
  .onCreate((snap, context) => {
    // ...
  });

export { onPost };
