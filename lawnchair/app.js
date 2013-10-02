// create a new store
var store = new Lawnchair({adapter:'dom', table:'people'});
 
// saving documents
store.save({name:'brian'});
 
// optionally pass a key
store.save({key:'config', settings:{color:'blue'}});
 
// updating a document in place is the same syntax
store.save({key:'config', settings:{color:'green'}});
 
// almost everything accepts a callback
var me = {name:'brian'};
 
store.save(me, function(doc){
    console.log(doc);
});
 
// terse callbacks
store.all('console.log(r)');
 
// expands to:
store.all(function(r){ console.log(r) });
 
// other ways to find documents
store.get(me, 'console.log(r)');
 
store.find('name === "brian"', 'console.log(r)');
 
// classic iteration
people.each(function(r){
    console.log(r);
});
 
// classic with terse shorthand syntax
people.each('console.log(r)');
 
// simple removal
store.remove(me, function() {
    console.log('buh bye!');
});
 
// nothing lasts forever..
store.nuke();