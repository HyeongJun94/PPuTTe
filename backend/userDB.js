// firebase 
const admin = require('firebase-admin');
var serviceAccount = require('../../service_key/ppute-b271b-1bc93df86d6e.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

// const variables
const EXIST = 1;
const NOT_EXIST = 0;
const ERROR = -1;

// db initialize
function init_db(ip){
    var doc_ref = db.collection('users').doc(ip);

    var set_ada = doc_ref.set({
        nickname : 'default',
        win : 0,
        lose : 0,
    })

    console.log('Create new account : ', ip);
}

// find userinfo data in DB by ip
// If userinfo is already existed in db, return userinfo
// If not, initialize db and then return userinfo
exports.find_db = async function find_db(ip){
    var data = 'default data';
    
    var doc_ref = db.collection('users').doc(ip);
    var get_doc = await doc_ref.get()
        .then(doc =>{
            if(!doc.exists){
                init_db(ip);
                data = find_db(ip);
            }
            else{
                data = doc.data();
            }
        })
        .catch(err => {
            console.log('Error getting document', err);
        });

    return data;
}

exports.update_db = function update_db(ip,field,value){
    var doc_ref = db.collection('users').doc(ip);
    
    if(field === 'nickname'){
        doc_ref.update({
            nickname : value
        })
    }
    else if(field === 'win'){
        doc_ref.update({
            win : value
        })
    }
    else if(field === 'lose'){
        doc_ref.update({
            lose : value
        })
    }
    else{
        console.log('[update_db] ERROR')
    }
} 

function is_number(value){
    if(typeof value === "number") return true
    else return false
}
