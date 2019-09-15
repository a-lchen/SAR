// Load the Cloudant library.
var Cloudant = require('@cloudant/cloudant');

var me = '27f331c0-4512-475b-b570-1c82a0dc3ba6-bluemix'; // Set this to your own account.
var password = '7231b1278b518899309fefe78425637c865355f69815610229a2bcad46fad18b';

// Initialize the library with my account.
var cloudant = Cloudant({ account: me, password: password });

async function asyncCall() {
  return cloudant.use('alice').insert({ happy: true }, 'rabbit2');
}

// asyncCall().then((data) => {
//   console.log(data); // { ok: true, id: 'rabbit', ...
// }).catch((err) => {
//   console.log(err);
// });

exports.saveSearch = async function(search) {
  return cloudant.use('searches').insert({ clues: [], time: 0, searchers: [], coverage: {} }, search.id);
}
