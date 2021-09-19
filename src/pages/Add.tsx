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

const defaultTransaction: TransactionObject = {
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
    transaction: defaultTransaction,
  };


  const transactionKeys = Object.keys(defaultTransaction);
  const inputLength = transactionKeys.length;
  const textInput: React.MutableRefObject<TextInput | null> = useRef(null);
  // Hooks + UseContext
  const [state, setState] = useState<AddState>(defaultState);
  const [isValid, setValidInput] = useState<boolean>(true);
  const {goBack} = useContext(Navigator);
  const dispatch = useAppDispatch();

  const resetState = () => {
    setState(defaultState);
    setValidInput(true);
  };

  /**
   * Called from the TextInput onChangeText event
   * Updates the state with the new input and validates it
   * @param text The current inputed text
   */
  const updateInput = (text: string) => {
    const newState = {...state};
    newState.input = text;
    setState(newState);

    const valid = validateInput(text);
    setValidInput(valid);
  };

  /**
   * Checks if the input is valid and fits the type of the field 
   * @param text The current inputed text (Optional)
   * @returns Whether the input is valid or not
   */
  const validateInput = (text = state.input): boolean => {
    if (text.length === 0) {
      return false;
    }

    // check if text is empty 
    if (/^\s*$/.test(text) === true) {
      return false;
    }

    const key = transactionKeys[state.index];
    // validate numbers
    if (typeof (state.transaction as any)[key] === 'number') {
      return /^\d+$/.test(text);
    } 

    return true;
  };

  /**
   * Goes to the field with respect to the `change` in index
   * Validates the current input in state.input and updates the state accordingly
   * @param change The change in the input
   * @returns void
   */
  const nextField = (change: number) => {
    const index = state.index + change;
    
    // don't need to validate if we go back, out of bounds, etc.
    if (index < 0) {
      goBack();
      return;
    } else if (change < 0) { // go back a field
      updateState(index);
      return; 
    }

    const inputValid = validateInput();

    if (!inputValid) {
      setValidInput(false);
      return;
    }

    textInput?.current?.clear();
    textInput?.current?.focus();

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

    // if within bounds, update the index
    const key = transactionKeys[state.index];
    updateState(index, state.input, key);   
  };

  /**
   * Updates the state with the new index and input
   * @param index The index of the next state
   * @param value The value of that we want to update in the state.transaction
   * @param key The key for state.transaction
   */
  const updateState = (index?: number, value?: string, key?: string) => {
    const newState = {...state};
    // if it has a key and a value then we need to update the transaction object
    if (key && value) {
      const currentField = (state.transaction as any)[key];
      let inputValue: string | number = value;
      // set to correct type 
      if (typeof currentField === 'number')
        inputValue = parseInt(value, 10);

      newState.transaction = {...state.transaction, [key]: inputValue};
    }

    if (index !== undefined) 
      newState.index = index;

    newState.input = '';
    textInput?.current?.clear();
    textInput?.current?.focus();

    setState(newState);
    setValidInput(true);
  };


  /**
   * @returns The state's transaction object
   */
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
        onChangeText={text => updateInput(text)}
      />
      <View style={[styles.divider, !isValid && styles.invalidInputDivider]} />
      {/* Name of the value being entered */}
      <Text value={transactionKeys[state.index]} style={styles.keyName} />

      <Button
        title={state.index === inputLength - 1 ? 'Done' : 'Next'}
        onPress={
          isValid ? () => nextField(1) : () => textInput?.current?.focus()
        }
      />
      <Previous backFunc={() => nextField(-1)}/>
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
