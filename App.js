import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { addDoc, collection, firestore, MESSAGES, serverTimestamp } from './firebase/Config';
import { useEffect, useState } from 'react';
import { onSnapshot, orderBy, query } from 'firebase/firestore'
import { convertFirebaseTimeStampToJS } from './helpers/Functions';

// Firebase: DemoChat-websovellus

export default function App() {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    const q = query(collection(firestore, MESSAGES), orderBy('created', 'desc'))

    const unsubscribe = onSnapshot(q,(querySnapshot) => {
      const tempMessages =[]
      
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

  const save = async () => {
    const docRef = await addDoc(collection(firestore, MESSAGES), {
      text: newMessage,
      created: serverTimestamp()
  }).catch (error => console.log(error))

  setNewMessage('')
  console.log('Message saved')
}

  return (
    <>
    <View style={styles.container}>
      <Text style={styles.h2}>Lähetä viesti:</Text>
      <TextInput style={styles.input} placeholder='Send message...' value={newMessage} onChangeText={text => setNewMessage(text)} />
      <Button title='Send' type="button" onPress={save} />
    </View>

    <View style={styles.container2}>
    <Text style={styles.h2}>Lähetetyt viestit:</Text>
      <ScrollView>
        {
          messages.map((message) => (
            <View style={styles.message} key={message.id}>
              <Text style={styles.date}>{message.created}</Text>
              <Text>{message.text}</Text>
            </View>
          ))
        }
      </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  h2: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  date: {
    color: '#666',
    fontSize: 11,
    paddingBottom: 5,
  },
  input: {
    padding: 10,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
    width: 300,
  },
  message: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
    width: 300,
  },
});
