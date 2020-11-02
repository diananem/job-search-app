import React, { Component } from "react";
import {
  View,
  Text,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager,
} from "react-native";

import { Card, Button } from "react-native-elements";

import CardComponent from "./Card";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Deck extends Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {},
  };

  constructor(props) {
    super(props);
    this.state = { currentCard: 0 };
    this.position = new Animated.ValueXY();
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,

      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > SWIPE_THRESHOLD) {
          this.forceSwipe("right");
        } else if (gestureState.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe("left");
        } else {
          this.resetPosition();
        }
      },
    });
  }

  UNSAFE_componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({ currentCard: 0 });
    }
  }

  forceSwipe(direction) {
    const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => this.onSwipeComplete(direction));
  }

  onSwipeComplete(direction) {
    const { onSwipeRight, onSwipeLeft, data } = this.props;
    const item = data[this.state.currentCard];

    direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
    this.position.setValue({ x: 0, y: 0 });
    this.setState({ currentCard: this.state.currentCard + 1 });
  }

  resetPosition() {
    Animated.spring(this.position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  }

  getCardStyle() {
    const rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["-120deg", "0deg", "120deg"],
    });

    return { ...this.position.getLayout(), transform: [{ rotate }] };
  }

  renderCards() {
    const { currentCard } = this.state;
    const { data, location, navigation } = this.props;
    if (currentCard >= data.length) {
      return (
        <Card
          title="No more jobs"
          titleStyle={{
            minHeight: 40,
            paddingTop: 10,
            textAlignVertical: "center",
          }}
        >
          <Text style={{ marginBottom: 10 }}>
            There is no jobs in this region for now... Search in another city or
            try later
          </Text>
          <Button
            title="Go back to Map"
            large
            icon={{ name: "my-location" }}
            onPress={() => navigation.navigate("Map")}
          />
        </Card>
      );
    }
    return data
      .map((item, index) => {
        if (index < currentCard) {
          return null;
        }
        if (index === currentCard) {
          return (
            <Animated.View
              key={item.id}
              style={[this.getCardStyle(), styles.cardStyle, { zIndex: 99 }]}
              {...this._panResponder.panHandlers}
            >
              <CardComponent job={item} location={location} />
            </Animated.View>
          );
        }
        return (
          <Animated.View
            key={item.id}
            style={[
              styles.cardStyle,
              { top: 10 * (index - currentCard), zIndex: 5 },
            ]}
          >
            <CardComponent job={item} location={location} />
          </Animated.View>
        );
      })
      .reverse();
  }
  render() {
    return <View>{this.renderCards()}</View>;
  }
}

const styles = {
  cardStyle: {
    position: "absolute",
    width: SCREEN_WIDTH,
  },
};

export default Deck;
