import { View, Text } from 'react-native'
import React from 'react'
import useState from 'react'

const Dice = () => {

  const [modifier, setModifier]= useState();

  return (
    <View>
      <Text>D</Text>
    </View>
  )
}

export default Dice