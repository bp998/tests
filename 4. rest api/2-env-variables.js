require("dotenv").config();
// w nawiasach .config() można podać ścieżkę do pliku .env, jeśli jest ona inna niż domyślna

console.log(process.env.PORT);
console.log(process.env.NODE_ENV);
