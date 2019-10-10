import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';

export default function MenuScreen() {
  return (
    <ScrollView
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}> Den Menu</Text>
      <Text style={styles.text}>
        Sandwiches: {'\n'}Turkey/Ham/Tuna{'\n'}Chunky Chicken Salad{'\n'}
        Egg Salad{'\n'}BLT{'\n'}Hummus & Veggie Wrap{'\n'}Grilled Chicken
        Sandwich with lettuce & tomato on a toasted bun{'\n'}
        {'\n'}Bread Options: White, Wheat, Twelve Grain, Rye, Borealis, English
        Muffin, Bagel, Gluten Friendly Bread{'\n'}
        {'\n'}Additions: Pesto, Humus, Avocado, Extra Cheese{'\n'}
        {'\n'}From the Grill:{'\n'}Bates Burger{'\n'}Bigcat Burger{'\n'}
        Hamburger{'\n'}
        Cheeseburger{'\n'}Double Cheeseburger{'\n'}Veggie Burger{'\n'}Grilled
        Cheese{'\n'}Tuna Melt{'\n'}
        {'\n'}
        Additions: Tomato, Bacon{'\n'}
        {'\n'}
        French Fries{'\n'}Onion Rings{'\n'}Chicken Nuggets{'\n'}Wings of Fire
        {'\n'}Mozzarella Sticks (Mozz Sticks){'\n'}Jalapeno Poppers{'\n'}
        Egg-A-Muffin*{'\n'}
        Egg-A-Bagel*{'\n'} * Add bacon or sausage per slice/patty{'\n'}
      </Text>
    </ScrollView>
  );
}

MenuScreen.navigationOptions = {
  // title: 'Menu',
  header: null,
};

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 32,
    textAlign: 'center',
    paddingVertical: 20,
  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'left',
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#881124',
  },
});
