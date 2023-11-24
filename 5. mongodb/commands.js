// tworzenie nowej bazy danych
// use test

db.createCollection("users");

// dodawanie pojedynczego elementu do bazy danych
db.getCollection("users").insertOne({
  name: "burek",
  age: 3,
  features: ["zjada kapcie", "pozwala sie glaskac", "rudy"],
});

// dodawanie wielu elementów do bazy danych

db.getCollection("users").insertMany([
  {
    name: "rurek",
    age: 5,
    features: ["zjada kapcie", "pozwala sie glaskac", "rudy"],
  },
  { name: "rurek2", age: 55, features: ["ciemny", "cieply"] },
]);

// wyszukiwanie elementów w bazie danych
db.getCollection("users").find({ name: "rurek" }); // zwraca wszystkie elementy tablicy ktore spelniaja warunek
db.getCollection("users").find({ age: { $gt: 5 } }); // > // zwraca wszystkie elementy tablicy ktore spelniaja warunek wiekszy niz 5
db.getCollection("users").find({ age: { $gte: 5 } }); // >= // zwraca wszystkie elementy tablicy ktore spelniaja warunek wiekszy bądz równy 5

// zwraca elementy tablicy ktore spelniaja warunek age > 5 ale bez elementow name i age. _id jest domyslnie zwracane
db.getCollection("users").find({ age: { $gt: 5 } }, { name: 0, age: 0 });

// zwraca elementy tablicy ktore spelniaja warunek age > 5 ale zwraca tylko elementy name i age tychże elementów oraz _id
db.getCollection("users").find({ age: { $gt: 5 } }, { name: 1, age: 1 });

// NIE MOZNA LACZYC PROJEKCJI 0 I 1 W JEDNYM ZAPYTANIU
!db.getCollection("users").find({ age: { $gt: 5 } }, { name: 0, age: 1 }); // BŁĄD
//WYJĄTEK
db.getCollection("users").find(
  { age: { $gt: 5 } },
  { name: 0, age: 1, _id: 0 }
); // OK

// sortowanie elementow tablicy
db.getCollection("users").find().sort({ age: 1 }); // sortowanie rosnąco
db.getCollection("users")
  .find({ age: { $gte: 5 } }, { name: 1, age: 1 })
  .sort({ age: -1 }); // sortowanie malejąco
db.getCollection("users")
  .find({ age: { $gte: 5 } }, { name: 1, age: 1 })
  .sort({ age: -1 })
  .limit(1); // sortowanie malejąco i zwracanie tylko jednego elementu
db.getCollection("users")
  .find({ age: { $gte: 5 } }, { name: 1, age: 1 })
  .sort({ age: -1 })
  .limit(1)
  .skip(1); // sortowanie malejąco i zwracanie tylko jednego elementu ale pomijając pierwszy element

db.getCollection("users")
  .find({ age: { $gt: 5 } })
  .sort({ name: 1 }); // sortowanie rosnąco po name - alfabetycznie z uwzglednieniem wielkosci liter
db.getCollection("users")
  .find({ age: { $gt: 5 } })
  .sort({ name: -1 }); // sortowanie malejąco po name
