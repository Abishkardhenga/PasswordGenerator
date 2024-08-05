import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import BouncyCheckbox from "react-native-bouncy-checkbox";
import   { object, number} from "yup"

import { Formik } from 'formik';
const PasswordSchema = object().shape({
  passwordLength: number()
  .min(4, 'Should be min of 4 characters')
  .max(16, 'Should be max of 16 characters')
  .required('Length is required')
  
})
export default function App() {

 

    const  [passwordLength, setPasswordLength ] = useState(0)
    const  [password, setPassword ] = useState("")
    const  [isPassGenerated, setIsPassGenerated ] = useState(false)
    const  [isLowerCase, setLowerCase ] = useState(true)
    const  [isUpperCase, setupperCase ] = useState(true)
    const  [isNumbers, setNumbers ] = useState(true)
    const  [isSymbols, setSymbols ] = useState(true)

    

  const resetPasswordState = () => {
    setPasswordLength(0)
    setIsPassGenerated(false)
    setLowerCase(true)
    setupperCase(false)
    setNumbers(false)
    setSymbols(false)
    
    
  }


  const generatePasswordString = (passwordLength:number)=>{
    let  passString = ""
    let lowecase = "abcdefghijklmnopqrstuvwxyz"
    let capitalcase = "ABCDEFGHIJKLMNOPQURSTUVWXYZ"
    let number = "1234567890"
    let symbols = "!@#$%^&*()_+"
    if(isLowerCase){
        passString += lowecase

    }
    if(isUpperCase){
        passString += capitalcase

    }
    if(isNumbers){
        passString += number
    }
    if(isSymbols){
        passString+= symbols
    }
console.log("this is passString", passString)
const result = generatedPassword(passString, passwordLength)
setPassword(result)
setIsPassGenerated(true)

  }


  const generatedPassword = (passwordString:string , length:number)=>{
    let generatePass  = ""
    for(let i=0;i<length; i++){
        let characterIndex = Math.round(Math.random()*passwordString.length)
        generatePass += passwordString.charAt(characterIndex)

    }
    console.log("generatePass" , generatePass)
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
       onSubmit={ values => {
        console.log(values);
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
         <View style={styles.inputWrapper}>
          <View style={styles.inputColumn}>
            <Text style={styles.heading}>Password Length</Text>
            {touched.passwordLength && errors.passwordLength && (
              <Text style={styles.errorText}>
                {errors.passwordLength}
              </Text>
            )}
            
          </View>
          <TextInput
            style={styles.inputStyle}
            value={values.passwordLength}
            onChangeText={handleChange('passwordLength')}
            placeholder="Ex. 8"
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
                    onPress={() => setupperCase(!isUpperCase)}
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
          style={styles.primaryBtn}
          onPress={handleSubmit}
          >
            <Text style={styles.primaryBtnTxt}>Generate Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={ () => {
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
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    width:"100%",
    display:"flex",
    backgroundColor:"blue",
    alignItems: 'center',
    justifyContent: "space-between",
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  },
});