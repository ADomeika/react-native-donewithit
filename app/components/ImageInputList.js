import React, { useRef } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import ImageInput from './ImageInput';

export default function ImageInputList({
  images = [],
  onRemoveImage,
  onAddImage,
}) {
  const scrollView = useRef();

  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={styles.container}>
          {images.map((image, index) => {
            return (
            <View key={index} style={styles.image}>
              <ImageInput
                image={image}
                onChangeImage={() => onRemoveImage(image.uri)}
              />
            </View>
          )})}
          <ImageInput onChangeImage={(image) => onAddImage(image)} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  image: {
    marginRight: 10,
  },
});
