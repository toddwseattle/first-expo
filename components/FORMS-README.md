This is starter code for simple React Native forms, using Formik and Yup.

It is adapted from 
[expo-community-firebase-starter](https://github.com/expo-community/expo-firebase-starter).
The main changes are

- only **Form** needs to be imported; it provides **Form.Button**, etc.
- a **Form.Switch** toggle component
- title functions for **Form.Button**

Note that **Form** is not the Formik's Form. 

# Installation

To use, install Formik and Yup into your project.

```
expo install formik yup
```

Put all the source files into your components directory.

# Example

Here's the form part of [LoginScreen](https://github.com/expo-community/expo-firebase-starter/blob/master/screens/LoginScreen.js) from expo-community-starter, as it would be implemented with **Form**, including an example
of **Form.Switch** and a title function.
Event handling, Yup validation, styles, and so on, are omitted. Icon
names in the text fields are [MaterialCommunityIcons](https://icons.expo.fyi/) provided by Expo.

```
...
import Form from '../components/Form';
...

export default function LoginScreen({ navigation }) {
  ...
  return (
    <SafeView style={styles.container}>
      <Form
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={values => handleOnLogin(values)}
      >
        <Form.Field
          name="email"
          leftIcon="email"
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
        />
        <Form.Field
          name="password"
          leftIcon="lock"
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={passwordVisibility}
          textContentType="password"
          rightIcon={rightIcon}
          handlePasswordVisibility={handlePasswordVisibility}
        />
        <Form.Switch name="register">
        <Form.Button title={values => values.register ? 'Register' : 'Login'} />
        {<Form.ErrorMessage error={loginError} visible={true} />}
      </Form>
      ...
    </SafeView>
  );
}
```