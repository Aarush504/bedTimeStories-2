import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
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
        }
}

updateSearch = (search) =>{
    this.setState({search});
}

retriveStories=async()=>{
const query= await db.collection("stories").where('')
}
    render(){
        return(
            <View>
                <Text>Read the story</Text>
            </View>
        )
    }
}