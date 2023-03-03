import { View, StyleSheet, Alert } from 'react-native'
import Title from '../components/ui/Title'
import { useState, useEffect } from 'react'
import NumberContainer from '../components/game/NumberContainer'
import PrimaryButton from '../components/ui/PrimaryButton'
import Card from '../components/ui/Card'
import InstructionText from '../components/ui/InstructionText'
import { Ionicons } from '@expo/vector-icons'
function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude)
  } else {
    return rndNum
  }
}

let minBoundry = 1
let maxBoundry = 100

const GameScreen = ({ userNumber, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userNumber)
  const [currentGuess, setCurrentGuess] = useState(initialGuess)

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver()
    }
  }, [currentGuess, userNumber, onGameOver])

  function nextGuessHandler(direction) {
    // direction => "lower" , "greater"
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert("Don't Lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' },
      ])
      return
    }
    if (direction === 'lower') {
      maxBoundry = currentGuess
    } else {
      minBoundry = currentGuess + 1
    }
    const newRndNumber = generateRandomBetween(
      minBoundry,
      maxBoundry,
      currentGuess
    )
    setCurrentGuess(newRndNumber)
  }
  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Card>
          <InstructionText style={styles.instructionText}>
            Higher or Lower
          </InstructionText>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                <Ionicons name='md-remove' size={24} color='white' />
              </PrimaryButton>
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                <Ionicons name='md-add' size={24} color='white' />
              </PrimaryButton>
            </View>
          </View>
        </Card>
      </View>
      {/* <View>LOG ROUNDS</View> */}
    </View>
  )
}

export default GameScreen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
})
