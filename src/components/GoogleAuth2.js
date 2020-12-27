export default class GoogleAuth2 extends HTMLElement {

  async init() {
    await new Promise(auth2_ready => gapi.load('auth2', auth2_ready));   
    await gapi.auth2.init({
        client_id: "797375738456-r4adr5pij0v9hevj1iufk3nitu2cltko.apps.googleusercontent.com"
      }).then(() => {
        this.googleAuth = gapi.auth2.getAuthInstance();      
    });
    this.googleAuth.isSignedIn.listen(this.updateSigninStatus);
    this.updateSigninStatus(this.googleAuth.isSignedIn.get());
  }

  async signIn() {
    await this.googleAuth.signIn();   
  }

  async signOut() {
    await this.googleAuth.signOut();   
  }

  isSigned() {
    return this.googleAuth.isSignedIn.get();
  }

  getProfileImage() {
    if (this.googleAuth.currentUser.get().getBasicProfile() === undefined) {
      return;
    } else {
      return this.googleAuth.currentUser.get().getBasicProfile().getImageUrl();
    }
  }

  getUserName() {
    if (this.googleAuth.currentUser.get().getBasicProfile() === undefined) {
      return;
    } else {
      return this.googleAuth.currentUser.get().getBasicProfile().getName();
    }
  }

  updateSigninStatus(isSigned) {
    if (isSigned) {
      const profile = this.googleAuth.currentUser.get().getBasicProfile();
      console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log("Name: " + profile.getName());
      console.log("Image URL: " + profile.getImageUrl());
      console.log("Email: " + profile.getEmail()); 
      console.log("Token: ", this.googleAuth.currentUser.get().getAuthResponse().id_token); 
    } else {
      console.log('Signed out');
    }
  }
}

customElements.define("google-auth2", GoogleAuth2);
