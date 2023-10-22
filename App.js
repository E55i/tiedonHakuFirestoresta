import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { MESSAGES, addDoc, collection, firestore, serverTimestamp, query, onSnapshot, orderBy} from './database/Config';
import { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import {convertFirebaseTimeStampToJS} from './helpers/Functions'

//toimii

export default function App() {

  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState([])

  const save = async() => {
    const docRef = await addDoc(collection(firestore,MESSAGES), {
      text: newMessage,
      created: serverTimestamp()
    }).catch(error => console.log(error))
    setNewMessage('')
  }

useEffect(() => {
  const q = query(collection(firestore,MESSAGES),orderBy('created', "desc"))
  
  const unsubscribe = onSnapshot(q,(querySnapshot)=>{
    const tempMessages = []

    querySnapshot.forEach((doc) => {
     const messageObject = {
        id: doc.id,
        text: doc.data().text,
        created: convertFirebaseTimeStampToJS(doc.data().created)
      }
     tempMessages.push(messageObject)
    })
    setMessages(tempMessages)
  })

  return () => {
    unsubscribe()
  }
}, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        {
          messages.map((message) => (
            <View style={styles.message} key={message.id}>
              <Text style={styles.messageInfo}>{message.created}</Text>
              <Text>{message.text}</Text>
            </View>
          ))
        }
      </ScrollView>
      <View style={styles.sendArea}>
      <TextInput 
      style={styles.textInput}
      placeholder='Enter message...'
      value={newMessage}
      onChangeText={text => setNewMessage(text)}
      />
      <Button
      style={styles.sendButton} 
      title="Send"
      type="button"
      onPress={save}
      />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1, 
    height: 50, 
    borderRadius: 5,
    borderWidth: 1,
    padding: 8,
    borderColor: "#57B0FF",
    marginRight: 10,
  },
  sendButton:{
   marginLeft: 10, 
  },
  message: {
    padding:10,
    marginTop:10,
    marginBottom:10,
    backgroundColor:'#D0E8FF',
    borderColor: '#A5C9FF',
    borderWidth: 1,
    borderRadius:5,
    marginLeft:10,
    marginRight:10,
  },
  messageInfo: {
    fontSize: 12,
  },
  scroll:{
    marginBottom:16,
  },
  sendArea:{
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '80%', 
  }
});
