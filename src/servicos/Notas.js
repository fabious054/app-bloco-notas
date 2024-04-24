import { db } from "./SQLite";

export function criarTabela(){
    db.transaction((transaction) => {
        transaction.executeSql(
            "CREATE TABLE IF NOT EXISTS Notas (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, texto TEXT, categoria TEXT);",
            [],
            (tx, resultado) => {
                console.log("Tabela criada com sucesso")
            },
            (tx, erro) => {
                console.log(erro)
            }
        )
    })
}

export async function adicionarNota(nota){
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql(
                "INSERT INTO Notas (titulo, texto, categoria) VALUES (?, ?, ?);",
                [nota.titulo, nota.texto, nota.categoria],
                (tx, resultado) => {
                    resolve(resultado)
                },
                (tx, erro) => {
                    console.log(erro)
                }
            )
        })
    })
}
export async function atualizarNota(nota){
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql(
                "UPDATE Notas SET titulo = ?, texto = ?, categoria = ? WHERE id = ?;",
                [nota.titulo, nota.texto, nota.categoria, nota.id],
                (tx, resultado) => {
                    resolve(resultado)
                },
                (tx, erro) => {
                    console.log(erro)
                }
            )
        })
    })
}
export async function deletaNota(nota){
    console.log(nota.id);
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql(
                "DELETE FROM Notas WHERE id = ?;",
                [nota.id],
                (tx, resultado) => {
                    resolve(resultado)
                },
                (tx, erro) => {
                    console.log(erro)
                }
            )
        })
    })
}

export async function buscaNotas(categoria){
    return new Promise((resolve) => {
        if(categoria !== ''){
            db.transaction((transaction) => {
                transaction.executeSql(
                    "SELECT * FROM Notas WHERE categoria = ?;",
                    [categoria],
                    (tx, resultado) => {
                        let notas = []
                        for (let i = 0; i < resultado.rows.length; i++) {
                            notas.push(resultado.rows.item(i))
                        }
                        resolve(notas)
                    },
                    (tx, erro) => {
                        console.log(erro)
                    }
                )
            }
            )
        }else{
            db.transaction((transaction) => {
                transaction.executeSql(
                    "SELECT * FROM Notas;",
                    [],
                    (tx, resultado) => {
                        let notas = []
                        for (let i = 0; i < resultado.rows.length; i++) {
                            notas.push(resultado.rows.item(i))
                        }
                        resolve(notas)
                    },
                    (tx, erro) => {
                        console.log(erro)
                    }
                )
            }
            )
        }
    })
}
