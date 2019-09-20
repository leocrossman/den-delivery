import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert,
} from 'react-native';

import { MonoText } from '../components/StyledText';

import t from 'tcomb-form-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

const Form = t.form.Form;

const Order = t.struct({
  name: t.String,
  location: t.String,
  phone: t.Number,
  order: t.String,
});

const formStyles = {
  ...Form.stylesheet,
  textbox: {
    // the style applied without errors
    normal: {
      color: '#000000',
      fontSize: 17,
      height: 36,
      padding: 7,
      borderRadius: 4,
      borderColor: '#cccccc', // <= relevant style here
      borderWidth: 1,
      marginBottom: 5,
    },

    // the style applied when a validation error occures
    error: {
      color: '#000000',
      fontSize: 17,
      height: 36,
      padding: 7,
      borderRadius: 4,
      borderColor: '#a94442', // <= relevant style here
      borderWidth: 1,
      marginBottom: 5,
    },
  },
  controlLabel: {
    normal: {
      color: 'black',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600',
    },
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600',
    },
  },
};

const options = {
  fields: {
    name: {
      error: 'Enter your name.',
    },
    location: {
      error: 'Enter your dorm or house.',
    },
    phone: {
      label: 'Phone Number',
      error: 'Enter your phone number (only numbers).',
    },
    order: {
      error: `What'll it be dawg?`,
    },
  },
  stylesheet: formStyles,
};

export default function HomeScreen() {
  // function constructor(props) {
  //   this.state = {
  //     value: null,
  //   };
  // }
  getInitialState = () => {
    return { value: null };
  };
  // onChange = value => {
  //   this.setState({ value });
  // };
  clearForm = () => {
    // clear content from all textbox
    this.setState({ value: null });
  };
  onPress = () => {
    // call getValue() to get the values of the form
    const value = this.form.getValue();
    // const value = this.refs.form.getValue();

    if (value) {
      // if validation fails, value will be null
      console.log(value); // value here is an instance of Order
      this.clearForm();
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('../assets/images/robot-dev.png')
                : require('../assets/images/bdd.png')
              // : require('../assets/images/robot-prod.png')
            }
            style={styles.welcomeImage}
          />
        </View>

        <View style={styles.getStartedContainer}>
          <Text style={styles.getStartedText}>Bobcat Den Delivery</Text>
        </View>

        <View style={styles.formContainer}>
          <Form
            ref={c => (this.form = c)} // assign a ref
            type={Order}
            // value={e => (this.state.value = e)} // avoid .bind(this) with arrow func
            // onChange={e => (this.onChange = e)}
            options={options} // pass the options via props
          />
          <TouchableHighlight
            style={styles.button}
            onPress={this.onPress}
            underlayColor="#99d9f4"
          >
            <Text style={styles.buttonText}>Submit Order</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        {/* Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton} */}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        {/* You are not in development mode: your app will run at full speed. */}
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
  formContainer: {
    justifyContent: 'center',
    marginTop: 0,
    padding: 20,
    backgroundColor: '#ebef5a',
  },
  container: {
    flex: 1,
    backgroundColor: '#ebef5a',
  },
  developmentModeText: {
    marginBottom: 20,
    color: '#000000',
    // color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 0,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 32,
    color: '#000000',
    // color: 'rgba(96,100,109, 1)',
    lineHeight: 32,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
