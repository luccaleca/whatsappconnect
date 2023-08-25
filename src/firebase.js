var admin = require("firebase-admin");

var serviceAccount = require("../whatsappconnectbot-firebase-adminsdk-v6u00-3168ce627c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();



exports.save = async function (user) {
    user['date'] = firebaseadmin.firestore.Timestamp.fromDate(new Date());
    let newRegister = await db.collection('usuarios').add(user);
    ewRegister.data['id'] = newRegister.id;
    return user;
}

exports.queryByPhone = async function (phone) {
    let userdata = null;
    try {
        const queryRef = await db.collection('usuarios')
            .where('whatsapp', '==', phone)
            .get();
        if (!queryRef.empty) {
            queryRef.forEach((user) => {
                userdata = user.data();
                userdata['id'] = user.id;
            });
        }
    } catch (_error) {
        console.log(_error);
    }
    return userdata;
}

exports.update = async function (userdata) {
    const userRegister = await db.collection('usuarios').doc(userdata['id']).set(userdata);
    return userRegister;
}

