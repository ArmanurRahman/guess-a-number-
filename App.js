import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOver from "./screens/GameOver";
//import * as Font from 'ex'

export default function App() {
    const [userNumber, setUserNumber] = useState();
    const [guessRound, setGuessRound] = useState(0);

    const startGameHandler = (number) => {
        setUserNumber(number);
    };

    const gameOverScreen = (numberOfRound) => {
        setGuessRound(numberOfRound);
    };

    const restartGameHandler = () => {
        setGuessRound(0);
        setUserNumber(null);
    };
    let content = <StartGameScreen startGame={startGameHandler} />;
    if (userNumber && guessRound <= 0) {
        content = (
            <GameScreen userChoice={userNumber} onGameOver={gameOverScreen} />
        );
    } else if (guessRound > 0) {
        content = (
            <GameOver
                numberOfRound={guessRound}
                guessNumber={userNumber}
                restartGame={restartGameHandler}
            />
        );
    }

    return (
        <View style={styles.screen}>
            <Header title='Guess a Number' />
            {content}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
});
