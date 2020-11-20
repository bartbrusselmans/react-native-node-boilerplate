import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { StyleSheet, Text, View } from 'react-native';

import { cache } from './cache';
import Launches from './components/launches';

const client = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/graphql',
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Launches />
        <StatusBar style="auto" />
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
