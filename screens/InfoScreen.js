import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default function InfoScreen() {
  return (
    <ScrollView
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.text}>
        {' '}
        BDD delivers deliciousness to your doorstep!{'\n'}
        {'\n'} Open 9pm to 12am Sun-Thurs{'\n'}
        {'\n'} Enter your information and order in the order form and we will
        bring your food to you. You will pay when we arrive via credit/debit
        card.
        {'\n'}
        {/* {'\n'}Delivery Fees:{'\n'}Order under $8: +$3 markup{'\n'}Order over $8:
        +$4 markup{'\n'}Order over $20: +$8 markup{'\n'}Mozz Sticks ONLY: $6.99
        {'\n'}Fries ONLY: $4.99{'\n'}F’real: +$1, in addition to delivery fee
        {'\n'} */}
        {'\n'}
        {'\n'} Let us know if you have any special requests.
        {'\n'}
        {'\n'} Please allow some time for deliveries as it can get quite busy
        over here!{'\n'}
        {'\n'} If you have questions please contact us:{'\n'} snapchat
        @den-delivery{'\n'}
        instagram @bobcatdendelivery{'\n'}
        {'\n'}
        {'\n'} - BDD team {'<'}3
      </Text>
      <Text style={styles.smallText}>App made by Leo Crossman</Text>
    </ScrollView>
  );
}

InfoScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  smallText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#881124',
  },
});
