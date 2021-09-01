import React, {useRef} from 'react';
import {useState} from 'react';
import {Text, Button, View, TextInput} from 'react-native';
import {NavigatorProps, TransactionObject} from '../utilities/constants';

interface Props extends NavigatorProps {}

interface AddState {
  inputs: [string, string, number];
  keys: Array<string>;
  index: number;
}

export const Add: React.FC<Props> = props => {
  const defaultState: AddState = {
    inputs: ['', '', 0],
    keys: ['Name', 'Description', 'Price'],
    index: 0,
  };

  const [state, setState] = useState<AddState>(defaultState);
  const [isValid, setValidInput] = useState<boolean>(false);
  const textInput: React.MutableRefObject<TextInput | null> = useRef(null);

  const updateState = (text: string) => {
    const valid = validateInput(text);

    if (!valid) {
      setValidInput(false);
      return;
    }

    const newState = {...state};

    if (typeof state.inputs[state.index] === 'number')
      newState.inputs[state.index] = parseInt(text, 10);
    else newState.inputs[state.index] = text;

    !isValid && setValidInput(true);
    setState(newState);
  };

  // Checks whether the input is valid or not for respective field
  const validateInput = (text: string): boolean => {
    if (text.length === 0) {
      return false;
    }

    // validate numbers
    if (typeof state.inputs[state.index] === 'number') {
      return /^\d+$/.test(text);
    }

    return true;
  };

  const resetState = () => {
    setState(defaultState);
    setValidInput(false);
  };

  const nextInput = (change: number) => {
    textInput?.current?.clear();
    textInput?.current?.focus();

    const index = state.index + change;

    // if it's equal to the length then our input is finished
    if (index === state.keys.length) {
      // save the input
      const transactionObject = saveInput();
      console.log(transactionObject);
      resetState();
      // navigate to home page the transaction object as a prop
      if (props.navigator) props.navigator('Home');

      return;
    }

    // check bounds
    if (index > state.keys.length) return;

    // go back home
    if (index < 0 && props.navigator) 
      props.navigator('Home');

    // if within bounds, update the index
    const newState = {...state};
    newState.index = index;
    setState(newState);
    setValidInput(false);
  };

  const saveInput = (): TransactionObject => {
    const object: TransactionObject = {
      Name: state.inputs[0],
      Subtitle: state.inputs[1],
      Price: state.inputs[2],
    };

    return object;
  };

  return (
    <View>
      <Text> Add </Text>
      <TextInput
        ref={textInput}
        placeholder={state.keys[state.index]}
        onChangeText={text => updateState(text)}
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

      <Button
        title={state.index === state.keys.length - 1 ? 'Done' : 'Next'}
        onPress={
          isValid ? () => nextInput(1) : () => textInput?.current?.focus()
        }
      />
      {!isValid && <Text> Invalid Input </Text>}
      <Button title="Previous" onPress={() => nextInput(-1)} />
    </View>
  );
};

export default Add;
