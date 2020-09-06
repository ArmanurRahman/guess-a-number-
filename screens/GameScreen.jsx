import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import { Ionicons } from "@expo/vector-icons";

const generateRandomNumber = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNumber = Math.floor(Math.random() * (max - min)) + min;
    if (rndNumber === exclude) {
        return generateRandomNumber(min, max, exclude);
    }
    return rndNumber;
};

const renderList = (value, index) => {
    return (
        <View key={value} style={styles.listItem}>
            <Text>#{index}</Text>
            <Text>{value}</Text>
        </View>
    );
};
const GameScreen = (props) => {
    const [guessNumber, setGuessNumber] = useState(
        generateRandomNumber(0, 100, props.userChoice)
    );

    //const [rounds, setRounds] = useState(0);
    const [guess, setGuess] = useState([]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (guessNumber === props.userChoice) {
            props.onGameOver(guess.length);
        }
    }, [guessNumber, userChoice, onGameOver]);
    const nextGusessHandler = (direction) => {
        if (
            (direction === "lower" && guessNumber < props.userChoice) ||
            (direction === "higher" && guessNumber > props.userChoice)
        ) {
            Alert.alert("dont'n lie", "You know that it is wrong", [
                {
                    text: "sorry",
                    style: "cancel",
                },
            ]);
            return;
        }

        if (direction === "lower") {
            currentHigh.current = guessNumber;
        } else {
            currentLow.current = guessNumber + 1;
        }

        const nextGuess = generateRandomNumber(
            currentLow.current,
            currentHigh.current,
            guessNumber
        );
        setGuess((currenGuess) => [nextGuess, ...currenGuess]);
        setGuessNumber(nextGuess);
    };
    return (
        <View style={styles.screen}>
            <Text> Opponent's Guess</Text>
            <NumberContainer>{guessNumber}</NumberContainer>
            <View>
                <Card style={styles.buttonContainer}>
                    <MainButton onPress={() => nextGusessHandler("lower")}>
                        <Ionicons name='md-remove' size={24} color='white' />
                    </MainButton>
                    <MainButton onPress={() => nextGusessHandler("higher")}>
                        <Ionicons name='md-add' size={24} color='white' />
                    </MainButton>
                </Card>
            </View>
            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {guess.map((gus, index) =>
                        renderList(gus, guess.length - index)
                    )}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
        width: 300,
        maxWidth: "80%",
    },
    listItem: {
        flexDirection: "row",
        marginVertical: 10,
        borderColor: "gray",
        borderWidth: 1,
        justifyContent: "space-between",
        padding: 10,
        width: "60%",
    },
    listContainer: {
        flex: 1,
        width: "80%",
    },
    list: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "flex-end",
    },
});

export default GameScreen;
