import React, { useState } from 'react'
import { View, SafeAreaView, Text, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import Icon from 'react-native-vector-icons/FontAwesome'

import axios from 'axios';
import Modal from '../components/ModalResult';

const BuscaCep = () => {
  const [cep, setCep] = useState('');
  const [dataCep, setDataCep] = useState({});

  const handleChangeCep = (text) => {
    return setCep(text);
  }

  const findCep = async (cep) =>{
    const baseUrl = `https://viacep.com.br/ws/${cep}/json/`
    const modalAlert = Platform.OS === 'web' ? alert : Alert.alert

    if(!cep){
      return modalAlert('Ops... parece que você não digitou nada', 'Parece que você não digitou o CEP')
    }


    const { data } = await axios.get(baseUrl);

    setDataCep(data)

    if(!!data.uf){
      return modalAlert(`--- Resultado da busca --- \n\nCEP: ${data.cep} \nLogradouro: ${data.logradouro} \nBairro: ${data.bairro} \nCidade: ${data.localidade} \nUF: ${data.uf}`)
    }
  
  }

  return (

    
    <SafeAreaView style={styles.container}>
      <View style={styles.containerTitle} >
        <Text style={styles.title}>
          Buscar por CEP
        </Text>
        <Text style={styles.emoji}>
          {!cep ? '😃' : '😁'}
        </Text>
      </View>
      <View style={styles.containerInput}>
        <TextInputMask 
          type={'zip-code'}
          placeholder={'Ex.: 00000-000'}
          onChangeText={handleChangeCep}
          value={cep}
          style={styles.cepInput}
        />
        <TouchableOpacity style={styles.button} onPress={ () => findCep(cep) }>
            <Icon name='chevron-right' size={14} color="#fff"/>
        </TouchableOpacity>
      </View>


      {/* <Modal /> */}

    </SafeAreaView>
  )
}

export default BuscaCep


const styles = StyleSheet.create({
  container: {
    width: '70%',
  },
  containerTitle: {
    flex: 1,
    textAlign: 'center',
    marginBottom: 10
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10
  },
  emoji:{
    fontSize: 28,
  },
  containerInput: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cepInput: {
    fontSize: 18,
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 5,
    padding: 5,
    width: "80%"
  },
  button:{
    width: 35,
    height: 35,
    justifyContent: 'center',
    backgroundColor: 'green',
    borderRadius: 12,
  },
  buttonIcon: {
    fontSize:  18,
    color: 'white'
  }
})