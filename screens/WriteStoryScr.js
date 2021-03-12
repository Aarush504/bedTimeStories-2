import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert} from 'react-native';
import {Header} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';

export default class WriteStoryScr extends React.Component{
constructor(){
    super();
    this.state={
        title:'',
        author:'',
        story:'',
    }
}

submitStory =()=>{
    db.collection("stories").add({
        title: this.state.title,
        author: this.state.author,
        story: this.state.story
    })
    this.setState({
        title:'',
        author:'',
        story:'',
    })
    alert('Your Story is saved successfully ');
}

    render(){
        return(
            <View style={styles.container}>
                <TextInput style={styles.story} placeholder={'What is the name of your story?'} onChangeText={text=>this.setState({title: text})}/>
    <TextInput style={styles.story} placeholder={'who is the author of this story?'} onChangeText={text=>this.setState({author: text})}/>
    <TextInput style={styles.inputBox2}  placeholder={'Write your story here'} onChangeText={text=>this.setState({story: text})} multiline={true}/>
    <TouchableOpacity style={styles.submit} onPress={this.submitStory}>
        <Text>Submit</Text>
    </TouchableOpacity>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    story:{
        marginTop: 50,
    width: 380,
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    backgroundColor: '#FFFD9B'
    },
    inputBox2:{
        marginTop: 50,
      width: 380,
      alignSelf: 'center',
      height: 200,
      textAlign: 'center',
      borderWidth: 4,
      backgroundColor: '#FFFD9B'
    },
    submit:{
        justifyContent:'center',
        borderWidth:4,
        backgroundColor:'pink',
        marginTop:20,
        marginLeft:650,
        width:100,
        height:45, 
    }
})