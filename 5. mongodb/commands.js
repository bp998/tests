// use test

//db//

//   {
//     "_id" : ObjectId("655fed1143c70eeceeac948b"),
//     "name" : "burek",
//     "age" : 5.0
// }

// /* 2 */
// {
//     "_id" : ObjectId("655fed2d43c70eeceeac948c"),
//     "name" : "burek",
//     "age" : 3.0
// }

// /* 3 */
// {
//     "_id" : ObjectId("655fee9043c70eeceeac948d"),
//     "name" : "burek",
//     "age" : 3.0,
//     "features" : [
//         "zjada kapcie",
//         "pozwala sie glaskac",
//         "rudy"
//     ]
// }

// /* 4 */
// {
//     "_id" : ObjectId("655ff08343c70eeceeac948e"),
//     "name" : "rurek",
//     "age" : 5.0,
//     "features" : [
//         "zjada kapcie",
//         "pozwala sie glaskac",
//         "rudy"
//     ]
// }

// /* 5 */
// {
//     "_id" : ObjectId("655ff08343c70eeceeac948f"),
//     "name" : "rurek2",
//     "age" : 55.0,
//     "features" : [
//         "ciemny",
//         "cieply"
//     ]
// }

// tworzenie nowej bazy danych
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

//ZLICZANIE ELEMENTOW TABLICY
db.getCollection("users").count(); // zwraca liczbe elementow w tablicy
db.getCollection("users").count({ age: 3 }); // zwraca liczbe elementow w tablicy spelniajacych warunek

//SPRWADZANIE CZY DANY OPERATOR ISTNIEJE
db.getCollection("users").find({ features: { $exists: true } }); // zwraca elementy ktore zawieraja pole features

db.getCollection("users").find({ name: { $regex: "b" } }); // zwraca elementy ktore zawieraja w polu name litere b
db.getCollection("users").find({ name: { $regex: /b/ } }); // to samo co wyzej ale jest to nowszy zapis js/regex
db.getCollection("users").find({ name: { $regex: /B/i } }); // i= ignore casing // to samo co wyzej ale zwraca elementy ktore zawieraja w polu name litere b niezaleznie od wielkosci litery
db.getCollection("users").find({ name: /B/i }); // to samo co wyzej ale jest to nowszy zapis js/regex i nie trzeba dodawac $regex

db.getCollection("users").find({ name: /b/i, age: 5 }); // zwraca elementy ktore zawieraja w polu name litere b niezaleznie od wielkosci litery i w polu age wartosc 5

//OR
db.getCollection("users").find({ $or: [{ name: /b/i, age: 3 }, { age: 5 }] }); // zwraca elementy ktore zawieraja w polu name litere b niezaleznie od wielkosci litery i w polu age wartosc 3 LUB w polu age wartosc 5

//AND
db.getCollection("users").find({ $and: [{ name: /r/i }, { age: 55 }] }); // zwraca elementy ktore zawieraja w polu name litere r niezaleznie od wielkosci litery i w polu age wartosc 3

//zwraca wszystkie elementy name tablicy
let cursor = db.getCollection("users").find();

while (cursor.hasNext()) {
  obj = cursor.next();
  print(obj["name"]);
}

//USUWANIE ELEMENTOW TABLICY

db.getCollection("users").deleteOne({ name: "burek" }); // usuwa pierwszy element tablicy ktory spelnia warunek
db.getCollection("users").deleteMany({ name: "burek" }); // usuwa wszystkie elementy tablicy ktore spelniaja warunek
db.getCollection("users").deleteMany({}); // usuwa wszystkie elementy tablicy // NIEUWZYWAC

//ZMIANA ELEMENTOW TABLICY
//ZMIANA JEDNEGO ELEMENTU TABLICY
db.getCollection("users").updateOne(
  { name: "burek" },
  { $set: { name: "Tom" }, $inc: { age: 2 } }
); // zmienia pierwszy element w tym wypadku - name: burek na name: Tom oraz zwieksza age o 2

//ZMIANA WIELOKROTNIE ELEMENTOW TABLICY
db.getCollection("users").updateMany({}, { $inc: { age: 1 } }); // zwieksza age o 1 dla wszystkich elementow tablicy

//PUT
db.getCollection("users").updateOne(
  { name: "burek" },
  {
    $set: {
      name: "Tom",
      age: "15",
      features: ["nie lubi wychodzic na dwor", "nie lubi ludzi"],
    },
  },
  { upsert: true }
);
// zmienia jeden element name: "burek" na name: "Tom", age: "15", features: ["nie lubi wychodzic na dwor", "nie lubi ludzi"]
// a jesli nie znajdzie elementu name: "burek" to go utworzy
// upsert: true - jezeli nie znajdzie elementu to go utworzy

// $set, $setOnInsert
db.getCollection("users").updateOne(
  { name: "koks" },
  {
    $set: {
      name: "koks",
      age: "15",
      features: ["nie lubi wychodzic na dwor", "nie lubi ludzi"],
    },
    $setOnInsert: { createdAt: new Date().toString() },
  },
  { upsert: true }
);
// zmienia pierwszy name: 'burek' wedlug wzoru a jesli nie znajdzie to go utworzy razem z createdAt
