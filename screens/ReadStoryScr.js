import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import db from '../config';

export default class ReadStoryScr extends React.Component{
    constructor(){
        super();
        this.state={
            search:'',
            bookAuthor: '',
            title:'',
            allBooks:[],
            lastBook:''
        }
}

updateSearch = (search) =>{
    this.setState({search});
}

retriveStories=async(text)=>{
    var enteredText= text.split("")
    
        const transaction = await db.collection("stories").where('title','==',text).get()
        transaction.docs.map((doc)=>{
            this.setState({
                allBooks:[this.state.allBooks,doc.data()],
                lastBook: doc
            })
        })
    
}

fetchMoreTransactions=async()=>{
    var text= this.state.search
    var enteredText= text.split("")
    const query= await db.collection("transactions").where('bookId','==',text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
    query.docs.map((doc)=>{
      this.setState({
        allBooks:[...this.state.allBooks,doc.data()],
        lastBook: doc
      })
    })
}
    render(){
        return(
            <View style={styles.container}>
                <View>
                    <TouchableOpacity
                    style={styles.searchButton}
                    onPress={()=>{
                        this.retriveStories(this.state.search)
                    }}
                    >
                        <Text>Search</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                data={this.state.allBooks}
                renderItem={({item})=>(
                    <Text>{"Book: "+item.title}</Text>
                )}
                keyExtractor={(item,index)=>index.toString()}
onEndReached={this.fetchMoreTransactions}
onEndReachedThreshold={0.7}
                />
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
      flex:1,
      marginTop:20
    },
    searchBar:{
      flexDirection:'row',
      height:40,
      width:'auto',
      borderWidth:0.5,
      alignItems:'center',
      backgroundColor:'grey'
    },
    bar:{
      borderWidth:2,
      height:30,
      width:300,
      paddingLeft:10,
      marginTop: 40
    },
    searchButton:{
      borderWidth:1,
      height:30,
      width:50,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'green',
      marginTop:40
    }
  })