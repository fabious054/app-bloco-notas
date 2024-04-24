import { SafeAreaView, StatusBar, StyleSheet,FlatList,Text, View } from "react-native"
import React, { useState,useEffect } from "react"
import NotaEditor from "./src/componentes/NotaEditor"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Nota } from "./src/componentes/Nota"  
import { criarTabela,buscaNotas } from "./src/servicos/Notas"
import { Picker } from "@react-native-picker/picker"


export default function App() {

  
  const [notaSelecionada, setNotaSelecionada] = useState({}) 
  const [notas, setNotas] = useState([])
  const [categoriaBusca, setCategoriaBusca] = useState("")
  
  useEffect(() => {
    criarTabela()
    mostraNotas()
  }, [categoriaBusca])
  async function mostraNotas() {
    const allKeys = await buscaNotas(categoriaBusca)
    console.log(allKeys);
    setNotas(allKeys)
  }

  return (

      <SafeAreaView style={estilos.container}>
          <Text style={estilos.textFiltro}>Filto</Text>
          <Picker selectedValue={categoriaBusca} onValueChange={(itemValue) => setCategoriaBusca(itemValue)}>
            <Picker.Item label="Pessoal" value="Pessoal" />
            <Picker.Item label="Trabalho" value="Trabalho" />
            <Picker.Item label="Outros" value="Outros" />
            <Picker.Item label="Todos" value="" />
          </Picker>
        <FlatList 
            data={notas}
            renderItem={(item) => <Nota {...item} setNotaSelecionada={setNotaSelecionada} />}
            keyExtractor={(item) => item.id}
          />
        <NotaEditor mostraNotas={mostraNotas} notaSelecionada={notaSelecionada} setNotaSelecionada={setNotaSelecionada}/>
        <StatusBar/>
      </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "stretch",
		justifyContent: "flex-start",
	},
  textFiltro: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
})

