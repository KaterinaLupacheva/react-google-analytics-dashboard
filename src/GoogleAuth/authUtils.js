export const initClient = () => {
  window.gapi.load("auth2", () => {
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    window.gapi.auth2
      .init({
        client_id: CLIENT_ID,
        scope: "https://www.googleapis.com/auth/analytics.readonly",
      })
      .then(onInit, onError);
  });

  const onInit = () => {
    console.log("Success");
  };

  const onError = () => {
    console.error("Error");
  };
};

export const checkSignedIn = () => {
  return window.gapi.auth2.getAuthInstance().isSignedIn.get();
  // if (isSignedIn) {
  //   window.gapi.auth2
  //     .getAuthInstance()
  //     .attachClickHandler("signin-button", {}, onSuccess, onFailure);
  // }
};

const onSuccess = (googleUser) => {
  console.log("Logged in as: " + googleUser.getBasicProfile().getName());
};

const onFailure = (error) => {
  console.error(error);
};

export const renderButton = () => {
  window.gapi.signin2.render("signin-button", {
    scope: "profile email",
    width: 240,
    height: 50,
    longtitle: true,
    theme: "dark",
    onsuccess: onSuccess,
    onfailure: onFailure,
  });
};

export const signOut = () => {
  return window.gapi.auth2.getAuthInstance().signOut();
};
