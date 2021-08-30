import React, { ReactComponentElement, useRef } from 'react';
import { useState } from 'react';
import { Text, Button, View, TextInput } from 'react-native';
import { TransactionObject } from '../utilities/constants';

interface AddState {
  inputs: [string, string, number];
  keys: Array<string>;
  index: number;
}

interface AddProps {}

export const Add: React.FC<AddProps> = () => {
  const defaultState: AddState = {
    inputs: ['', '', 0],
    keys: ['Name', 'Description', 'Price'],
    index: 0,
  };

  const [state, setState] = useState<AddState>(defaultState);

  const textInput: React.MutableRefObject<TextInput | null> = useRef(null);

  const updateState = (text: string) => {
    // check if the type of input is number and then remove non numbers from input
    if (typeof state.keys[state.index] === 'number') {
      const newText = text.replace(/[^\d.-]/g, '');
      const price = parseInt(newText);
			console.log(price);

      setState({
        ...state,
        inputs: [state.inputs[0], state.inputs[1], price],
      });
      return;
    }

    const newState = { ...state };
    newState.inputs[state.index] = text;
    setState(newState);
  };

  const resetState = () => {
    setState(defaultState);
  };

  const nextInput = (change: number) => {
    // clear current input, focus on input
    textInput?.current?.clear();
    textInput?.current?.focus();

    const index = state.index + change;

    // if it's equal to the length then our input is finished
    if (index === state.keys.length) {
      // save the input
      const transactionObject = saveInput();
      // resetState();
      // navigate back to the last page and pass the transaction object as a prop
      // props.navigation.navigate('Home', { newTransaction: transactionObject });

      return;
    }

    // check bounds
    if (index > state.keys.length - 1 || index < 0) {
      return;
    }

    // if within bounds, update the state
    const newState = { ...state };
    newState.index = index;
    setState(newState);
  };

  const saveInput = (): TransactionObject => {
    const object: TransactionObject = {
      Name: state.inputs[0],
      Subtitle: state.inputs[1],
      Price: state.inputs[2],
    };
		
    return object;
  };

  //   const nextInput = (change: number) => {
  //     // clear current text input
  //     textInput?.current?.clear();
  //     const index = state.index + change;
  //     textInput?.current?.focus();

  //     // if it's equal to the length then our input is finished
  //     if (index === state.keys.length) {
  //       // save the input
  //       const transactionObject = saveInput();
  //       resetState();
  //       // navigate back to the last page and pass the transaction object as a prop
  //       props.navigation.navigate('Home', { newTransaction: transactionObject });

  //       return;
  //     }

  //     // check bounds
  //     if (index > state.keys.length - 1 || index < 0) {
  //       return;
  //     }

  //     // if within bounds, update the state
  //     const newState = { ...state };
  //     newState.index = index;
  //     setState(newState);
  //   };

  return (
    <View>
      <Text> Add </Text>
      <TextInput
        ref={textInput}
        placeholder={state.keys[state.index]}
        onChangeText={(text) => updateState(text)} 
				value={state.inputs[state.index].toString()}
      />
      <Text> Updating: {state.keys[state.index]} </Text>

      {state.keys.map((key, index) => {
        if (index < state.index) {
          return (
            <Text key={key}>
              {key}: {state.inputs[index]}
            </Text>
          );
        }
      })}

      <Button title="Next" onPress={() => nextInput(1)} />
      <Button title="Previous" onPress={() => nextInput(-1)} />
    </View>
  );
};

export default Add;
