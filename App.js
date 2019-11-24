import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableWithoutFeedback,
  Text,
  Dimensions,
  Button
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Modal from 'react-native-modal';

class App extends Component {

  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
    this.handleInnerPressIn = this.handleInnerPressIn.bind(this);
    this.handleInnerPressOut = this.handleInnerPressOut.bind(this);
  }

  state = {
    entries: [
      'slide 1',
      'slide 2',
      'slide 3',
      'slide 4',
    ],
    outerScrollViewScrollEnabled: true,
    modalVisible: false
  };

  handleInnerPressIn = () => this.setState({outerScrollViewScrollEnabled: false});
  handleInnerPressOut = () => this.setState({outerScrollViewScrollEnabled: true});

  _renderItem({item, index}) {
    return (
      <TouchableWithoutFeedback onPressIn={this.handleInnerPressIn} onPressOut={this.handleInnerPressOut}>
        <View style={styles.slide}>
          <Text style={styles.title}>{item}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const {outerScrollViewScrollEnabled} = this.state;

    return (
      <ScrollView pagingEnabled={true}>
        <ScrollView horizontal={true} pagingEnabled={true} scrollEnabled={outerScrollViewScrollEnabled}>
          <View style={[styles.page, {backgroundColor: 'pink'}]}>
            <View style={styles.titleBar}>
              <Text style={styles.title}>Screen 1</Text>
            </View>
            <View style={styles.pageContent}>
              <Carousel
                ref={(c) => {
                  this._carousel = c;
                }}
                data={this.state.entries}
                renderItem={this._renderItem}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={Dimensions.get('window').width - 60}
              />
            </View>
          </View>
          <View style={[styles.page, {backgroundColor: 'green'}]}>
            <View style={styles.titleBar}>
              <Text style={styles.title}>Screen 2</Text>
            </View>
            <View style={styles.pageContent}>
              <Carousel
                ref={(c) => {
                  this._carousel = c;
                }}
                data={this.state.entries}
                renderItem={this._renderItem}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={Dimensions.get('window').width - 60}
              />
            </View>
          </View>
          <View style={[styles.page, {backgroundColor: 'orange'}]}>
            <View style={styles.titleBar}>
              <Text style={styles.title}>Screen 3</Text>
            </View>
            <View style={styles.pageContent}>
              <Carousel
                ref={(c) => {
                  this._carousel = c;
                }}
                data={this.state.entries}
                renderItem={this._renderItem}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={Dimensions.get('window').width - 60}
              />
            </View>
          </View>
        </ScrollView>
        <View style={[styles.page, {backgroundColor: 'yellow'}]}>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Screen 4</Text>
          </View>
          <View style={[styles.pageContent, {justifyContent: 'flex-end', flex: 1, height: '100%', padding: 20}]}>
            <Button title='Press me' onPress={() => this.setState({modalVisible: true})} />
          </View>
        </View>
        <Modal isVisible={this.state.modalVisible}
               useNativeDriver={true}
               style={styles.modal}
        >
          <TouchableWithoutFeedback onPress={() => this.setState({modalVisible: false})}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTxr}>Press me to close</Text>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 24,
    flex: 1,
    backgroundColor: '#ccc',
  },
  titleBar: {
    height: 60,
    backgroundColor: '#80cbff',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  pageContent: {
    marginTop: 20,
    position: 'relative',
  },
  slide: {
    height: 200,
    width: '100%',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    margin: 0
  },
  modalContent: {
    backgroundColor: '#0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 400
  },
  modalTxr: {
    fontSize: 20
  }
});

export default App;
