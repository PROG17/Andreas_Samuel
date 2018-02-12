const firebaseSetup = require("../firebaseSetup.js");
const firebase = firebaseSetup.getFirebase();
const customValidation = require("../customValidation/customValidations.js");

function getCurrentUser(callBackFunc) {

    let user = firebase.auth().currentUser;
    let name, email, uid, role;

    if (user != null) {
        name = user.displayName;
        email = user.email;
        uid = user.uid;

        let userRef = firebase.database().ref(`Users/${uid}`);

        userRef.on("value", (snapshot) => {
            userRef.off("value");
            let user = snapshot.val();
            role = user.role;
            callBackFunc({
                name: name,
                email: email,
                uid: uid,
                role: role
            });
        });
    }
    else
        callBackFunc(null);
}

exports.login = (req, res) => {

    let email = req.body.email;
    let password = req.body.password;
    let errorStrings = [];

    customValidation.validateEmail(email, errorStrings);
    customValidation.hasValue("lösenord", password, errorStrings);
    if (errorStrings.length > 0) {
        res.status(400).json({ validationErrors: errorStrings, status: "Kunde ej validera postad data" });
        return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
        getCurrentUser((user => {
            res.status(200).json({
                loggedIn: true,
                user: user
            });
        }));
    }).catch(function (error) {
        errorStrings.push("Inkorrekt email eller lösen.");
        res.status(400).json({ validationErrors: errorStrings, status: "Kunde ej validera postad data" });
    });
};


exports.getLoggedInStatus = (req, res) => {

    getCurrentUser((user) => {
        if (user != null) {
            res.status(200).json({
                loggedIn: true,
                user: user
            });
        }
        else {
            res.status(200).json({ loggedIn: false });
        }
    });
};

exports.logout = (req, res) => {
    firebase.auth().signOut().then(() => {
        res.send("Användare utloggad.");
    }, (error) => {
        res.status(500).json({
            message: "Oväntat fel, kunde ej logga ut användaren.",
            error: error
        });
    });
}


exports.getCurrentUser = getCurrentUser;





