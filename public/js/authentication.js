var database = firebase.database();

function check_auth_home() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            document.getElementById("page_content_logout").classList.remove("hidden_element");
            document.getElementById("page_content_name").classList.remove("hidden_element");

            document.getElementById("page_content_name").innerText = "Logged in as " + firebase.auth().currentUser.email;

            document.getElementById("page_content_guest_details").classList.add("hidden_element");
        } else {
            // No user is signed in.
            document.getElementById("page_content_guest_details").classList.remove("hidden_element");
            document.getElementById("page_content_logout").classList.add("hidden_element");
            document.getElementById("page_content_name").classList.add("hidden_element");
        }
    });
}

function check_auth_register() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            window.location = "/";
        }
    });
}

function logout() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        window.location = "/";
    }).catch(function (error) {
        // An error happened.
    });
}

function register() {
    var name = document.getElementById("page_controls_name").value;
    var email = document.getElementById("page_controls_email").value;
    var password = document.getElementById("page_controls_password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
        var user = firebase.auth().currentUser;
        //save in DB
        writeUserData(user.uid, name);
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode + " " + errorMessage);
    });
}

function login() {
    var email = document.getElementById("page_controls_email").value;
    var password = document.getElementById("page_controls_password").value;

    firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
        var user = firebase.auth().currentUser;
        window.location = "";
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode + " " + errorMessage);
    });
}

function writeUserData(userId, name) {
    firebase.database().ref('users/' + userId).set({
        id: userId,
        name: name
    }, function (error) {
        if (error) {
            // The write failed...
        } else {
            // Data saved successfully!
            window.location = "/";
        }
    });
}