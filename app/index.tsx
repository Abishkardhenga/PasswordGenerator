import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { object, number } from "yup"
import { Formik } from 'formik';

const PasswordSchema = object().shape({
  passwordLength: number()
    .min(4, 'Should be min of 4 characters')
    .max(20, 'Should be max of 20 characters')
    .required('Length is required')
});

export default function App() {
  const [passwordLength, setPasswordLength] = useState(0)
  const [password, setPassword] = useState("")
  const [isPassGenerated, setIsPassGenerated] = useState(false)
  const [isLowerCase, setLowerCase] = useState(true)
  const [isUpperCase, setUpperCase] = useState(true)
  const [isNumbers, setNumbers] = useState(true)
  const [isSymbols, setSymbols] = useState(true)

  const resetPasswordState = () => {
    setPasswordLength(0)
    setIsPassGenerated(false)
    setLowerCase(true)
    setUpperCase(false)
    setNumbers(false)
    setSymbols(false)
  }

  const generatePasswordString = (passwordLength: number) => {
    let passString = ""
    let lowerCase = "abcdefghijklmnopqrstuvwxyz"
    let upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let numbers = "1234567890"
    let symbols = "!@#$%^&*()_+"
    if (isLowerCase) passString += lowerCase
    if (isUpperCase) passString += upperCase
    if (isNumbers) passString += numbers
    if (isSymbols) passString += symbols

    const result = generatedPassword(passString, passwordLength)
    setPassword(result)
    setIsPassGenerated(true)
  }

  const generatedPassword = (passwordString: string, length: number) => {
    let generatePass = ""
    for (let i = 0; i < length; i++) {
      let characterIndex = Math.round(Math.random() * passwordString.length)
      generatePass += passwordString.charAt(characterIndex)
    }
    return generatePass;
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={PasswordSchema}
            onSubmit={values => {
              generatePasswordString(+values.passwordLength)
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
            }) => (
              <>
                <View style={styles.inputColumn}>
                  <Text style={styles.heading}>Password Length</Text>
                  {touched.passwordLength && errors.passwordLength && (
                    <Text style={styles.errorText}>
                      {errors.passwordLength}
                    </Text>
                  )}
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder="Eg:10"
                    keyboardType='numeric'
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include lowercase</Text>
                  <BouncyCheckbox
                    isChecked={isLowerCase}
                    onPress={() => setLowerCase(!isLowerCase)}
                    fillColor="#29AB87"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Uppercase letters</Text>
                  <BouncyCheckbox
                    isChecked={isUpperCase}
                    onPress={() => setUpperCase(!isUpperCase)}
                    fillColor="#FED85D"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Numbers</Text>
                  <BouncyCheckbox
                    isChecked={isNumbers}
                    onPress={() => setNumbers(!isNumbers)}
                    fillColor="#C9A0DC"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Symbols</Text>
                  <BouncyCheckbox
                    isChecked={isSymbols}
                    onPress={() => setSymbols(!isSymbols)}
                    fillColor="#FC80A5"
                  />
                </View>
                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={[styles.primaryBtn, !isValid && styles.disabledBtn]}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.primaryBtnTxt}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                      handleReset();
                      resetPasswordState()
                    }}
                  >
                    <Text style={styles.secondaryBtnTxt}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {isPassGenerated ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text style={styles.description}>Long Press to copy</Text>
            <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  formContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  subTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  heading: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  inputColumn: {
    marginBottom: 15,
  },
  inputStyle: {
    padding: 10,
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    fontSize: 16,
    marginTop: 8,
  },
  errorText: {
    fontSize: 14,
    color: '#ff0d10',
    marginTop: 5,
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  primaryBtn: {
    width: 140,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#29AB87',
    alignItems: 'center',
  },
  primaryBtnTxt: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  secondaryBtn: {
    width: 140,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#ccc',
    justifyContent:"center",
    alignItems: 'center',
  },
  secondaryBtnTxt: {
    color: '#333',
    fontWeight: '700',
    fontSize: 16,
  },
  disabledBtn: {
    backgroundColor: '#a3d5c5',
  },
  card: {
    padding: 20,
    borderRadius: 10,
    margin: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cardElevated: {
    elevation: 5,
  },
  generatedPassword: {
    fontSize: 24,
    textAlign: 'center',
    color: '#333',
    marginTop: 10,
  },
});
