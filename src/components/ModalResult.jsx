import React, { useState } from 'react'
import { Alert, View, StyleSheet, Text } from 'react-native'
import Modal from 'react-native-modal'

const ModalResult = () => {

  const [modalVisible, setmodalVisible] = useState(true)

  const closeModal = () => {
   Alert.alert("Modal has been closed");
   setModalVisible(!modalVisible)
  }

  return (
    <View>
      <Modal isVisible={true}>
        <View style={{flex: 1}}
        coverScreen={true}>
          <Text>I am the modal content!</Text>
        </View>
      </Modal>
    </View>
  )
}

export default ModalResult

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
})