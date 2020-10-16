import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import Background from '../assets/imdb.png';

export default function Home({navigation}) {
    const [search, setSearch] = useState('')
    const [movies, setMovies] = useState([])
    const callApi = () => {
    let url = 'http://www.omdbapi.com/?s='+search+'&apikey=87d10179'
    fetch(url)
    .then(response => response.json())
    .then(responseJson => {
        //setIsLoading(false);
        console.log(responseJson); 
        setMovies(responseJson["Search"])       
    })
    .catch(error => {
        //setIsLoading(false);
        console.log(error);
        //when it got error then it will jump back to previous
    })
    }

  return (
    <View style={styles.container}>
        <View style={{flexDirection:'row'}}>
      <TextInput placeholder="Enter a movie" style={styles.TextInput} value={search} onChangeText={(text) => setSearch(text)} />
      <Button /*style = {styles.button}*/ onPress={callApi} title = "Search a movie" style = {{flex:1, backgroundColor: 'blue'}} />
      </View>

      <FlatList data = {movies} renderItem = {({item}) => (
          <TouchableOpacity key = {item.imdbID}
          onPress = {() => navigation.push('Detail', {imdbID:item.imdbID})}>
              <View key = {item.imdbID} style = {styles.viewStyle}>
              <Image source = {{uri:item.Poster}} style = {{flex:1, marginRight:10, background: 'cover'}} />
              <Text>{item.Title}</Text>
              <Text style = {{fontSize: 20}}>{item.Year}</Text>
          </View>
          </TouchableOpacity>
      )}
      />

    <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
    TextInput: {
        borderColor: 'black',
        height: 40,
        borderWidth: 1,
        flex: 2,
        padding: 10,
        marginRight: 10
    },

    viewStyle: {
        flex: 1,
        backgroundColor: 'pink',
        padding: 10,
        marginBottom: 10,
        flexDirection: 'row',
        height: 100,
    },

    button: {
        backgroundColor: '#E29F2D',
        padding: 10, 
        alignItems: 'center',
        borderRadius: 15,
        marginBottom: 80
      },
    
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
