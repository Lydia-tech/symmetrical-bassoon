let db;
const request = indexedDB.open('budget', 1);

// const db = event.target.result;

db.createObjectStore('pending', { autoIncrement: true });

request.onsuccess = function(event) {
    db = event.target.result;
    if (navigator.onLine) {

    }
};

request.onerror = function(event) {
    console.log(event.target.errorCode);
};

function saveRecord(record) {
    const transaction = db.transaction(['pending'], 'readwrite');
    const budgetObjectStore = transaction.objectStore('pending');
    budgetObjectStore.add(record);

};