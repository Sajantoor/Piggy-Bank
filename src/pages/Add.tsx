import React, {useRef} from 'react';
import {useContext} from 'react';
import {useState} from 'react';
import {Text, Button, View, TextInput, StyleSheet} from 'react-native';
import {Previous} from '../components/Previous';
import {Navigator} from '../components/RoutesContext';
import {useAppDispatch} from '../redux/Hooks';
import {add} from '../redux/Slice';
import {fontColors} from '../styles/Constants';
import {textStyle} from '../styles/Styles';
import {TransactionObject} from '../utilities/constants';

interface AddState {
  inputs: [string, string, number];
  keys: Array<string>;
  index: number;
}

const Add: React.FC = () => {
  const defaultState: AddState = {
    inputs: ['', '', 0],
    keys: ['Name', 'Description', 'Price'],
    index: 0,
  };

  const [state, setState] = useState<AddState>(defaultState);
  const [isValid, setValidInput] = useState<boolean>(false);
  const textInput: React.MutableRefObject<TextInput | null> = useRef(null);
  const {goBack} = useContext(Navigator);
  const dispatch = useAppDispatch();

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
      dispatch(add(transactionObject));
      resetState();
      // navigate to home page the transaction object as a prop
      goBack();
      return;
    }

    // check bounds
    if (index > state.keys.length) return;

    // go back home
    if (index < 0) goBack();

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
      <Text style={textStyle.header}>Add New</Text>
      {state.keys.map((key, index) => {
        if (index < state.index) {
          return (
            <Text style={textStyle.text} key={key}>
              {key}: {state.inputs[index]}
            </Text>
          );
        }
      })}

      <TextInput
        style={styles.input}
        ref={textInput}
        placeholder={state.keys[state.index]}
        onChangeText={text => updateState(text)}
      />
      <View style={styles.divider} />
      <Text style={textStyle.text}>{state.keys[state.index]}</Text>

      <Button
        title={state.index === state.keys.length - 1 ? 'Done' : 'Next'}
        onPress={
          isValid ? () => nextInput(1) : () => textInput?.current?.focus()
        }
      />
      {/* {!isValid && <Text> Invalid Input </Text>} */}
      <Previous />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 0,
    color: fontColors.primary,
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    padding: 10,
  },

  divider: {
    width: '100%',
    height: 5,
    backgroundColor: '#FFF',
    opacity: 0.3,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default Add;
