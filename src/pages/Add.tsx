import React, {useRef} from 'react';
import {useContext} from 'react';
import {useState} from 'react';
import {Button, View, TextInput, StyleSheet} from 'react-native';
import {Previous} from '../components/Previous';
import {Navigator} from '../components/RoutesContext';
import {Header, Text} from '../components/StyledText';
import {useAppDispatch} from '../redux/Hooks';
import {add} from '../redux/Slice';
import {fontColors} from '../styles/Constants';
import {TransactionObject} from '../utilities/constants';

const defaultTransactionValues: TransactionObject = {
  Name: '',
  Price: 0,
  Store: '',
  Location: '',
  Date: '',
  Category: '',
}

interface AddState {
  input: string;
  index: number;
  transaction: TransactionObject;
}

const Add: React.FC = () => {
  const defaultState: AddState = {
    input: '', // current input
    index: 0,
    transaction: defaultTransactionValues,
  };

  const transactionKeys = Object.keys(defaultTransactionValues);
  const inputLength = transactionKeys.length;

  const [state, setState] = useState<AddState>(defaultState);
  const [isValid, setValidInput] = useState<boolean>(true);
  const textInput: React.MutableRefObject<TextInput | null> = useRef(null);
  const {goBack} = useContext(Navigator);
  const dispatch = useAppDispatch();

  const updateState = (text: string) => {
    const newState = {...state};
    newState.input = text;
    setState(newState);

    const valid = validateInput(text);
    setValidInput(valid);
  };

  // Checks whether the input is valid or not for respective field
  const validateInput = (text = state.input): boolean => {
    if (text.length === 0) {
      return false;
    }

    // check if text is empty 
    // if (/^\s*$/.test(text) === false) {
    //   return false;
    // }

    const key = transactionKeys[state.index];
    // validate numbers
    if (typeof (state.transaction as any)[key] === 'number') {
      return /^\d+$/.test(text);
    } 

    return true;
  };

  const resetState = () => {
    setState(defaultState);
    setValidInput(true);
  };

  const nextInput = (change: number) => {
    const inputValid = validateInput();

    if (!inputValid) {
      setValidInput(false);
      return;
    }

    textInput?.current?.clear();
    textInput?.current?.focus();

    const index = state.index + change;

    // if it's equal to the length then our input is finished
    if (index === inputLength) {
      // save the input
      const transactionObject = saveInput();
      dispatch(add(transactionObject));
      resetState();
      // navigate to home page the transaction object as a prop
      goBack();
      return;
    }

    // check bounds
    if (index > inputLength) return;

    // go back home
    if (index < 0) goBack();

    // if within bounds, update the index
    let newState = {...state};
    const key = transactionKeys[state.index];
    console.log(state.index);
    console.log(key);
    const currentValue = (state.transaction as any)[key];
    let value: string | number = state.input;

    if (typeof currentValue === 'number')
        value = parseInt(value, 10);

    newState.transaction = {...state.transaction, [key]: value};
    newState.index = index;
    newState.input = '';
    setState(newState);
    setValidInput(true);
  };

  const saveInput = (): TransactionObject => {
    return state.transaction;
  };

  return (
    <View>
      <Header value="Add New" />
      {transactionKeys.map((key, index) => {
        // casting it to any because typescript doesn't like it otherwise
        const value = (state.transaction as any)[key].toString();

        if (index < state.index) {
          return <Text value={key + ': ' + value} key={index} />;
        }
      })}

      <TextInput
        style={styles.input}
        ref={textInput}
        placeholder={transactionKeys[state.index]}
        onChangeText={text => updateState(text)}
      />
      <View style={[styles.divider, !isValid && styles.invalidInputDivider]} />
      {/* Name of the value being entered */}
      <Text value={transactionKeys[state.index]} style={styles.keyName} />

      <Button
        title={state.index === inputLength - 1 ? 'Done' : 'Next'}
        onPress={
          isValid ? () => nextInput(1) : () => textInput?.current?.focus()
        }
      />
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
    marginTop: 100, // TODO: make this absolute
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

  invalidInputDivider: {
    backgroundColor: 'red', // TODO: Pick another red
  },

  keyName: {
    paddingTop: 15,
    paddingBottom: 15,
  },
});

export default Add;
