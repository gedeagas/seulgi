const natural = require('natural');
const classifier = new natural.BayesClassifier();
console.log(natural.PorterStemmer.stem("what the gu")); // stem a single word

classifier.addDocument('bagai mana cuaca hari ini', 'weather');
classifier.addDocument('cuaca hari ini', 'weather');
classifier.addDocument('cuaca di kota', 'weather');
classifier.addDocument('cuaca hari ini apa', 'weather');
classifier.addDocument('i want to sleep', 'honda');

classifier.train();

console.log(classifier.getClassifications('gi cuaca hari ini apa'));
console.log(classifier.getClassifications('fuck off'));
