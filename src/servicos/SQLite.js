import * as SQLite from 'expo-sqlite';

function abreConexao() {
  const database = SQLite.openDatabase('notes.db');
  return database;
}

export const db = abreConexao();

