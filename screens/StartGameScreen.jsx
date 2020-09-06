import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from "react-native";
import Card from "../components/Card";
import Color from "../constants/color";
import Input from "../components/Inout";
import NumberContainer from "../components/NumberContainer";
import TitleText from "../components/TitleText";

const StartGameScreen = (props) => {
    const [enderNumber, setEnterNumber] = useState("");
    const [isConfirm, setIsConfirm] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const inputNumberHandler = (inputText) => {
        setEnterNumber(inputText.replace(/[^0-9]/g, ""));
    };

    const resetHandler = () => {
        setEnterNumber("");
    };

    const confirmHandler = () => {
        if (isNaN(enderNumber) || enderNumber <= 0 || enderNumber > 99) {
            Alert.alert("Invalid number", "number has to be between 0 to 99", [
                { text: "Okay", style: "destructive", onPress: resetHandler },
            ]);
        }
        setIsConfirm(true);
        setSelectedNumber(parseInt(enderNumber));
        setEnterNumber("");
        Keyboard.dismiss();
    };
    let confirm;
    if (isConfirm) {
        confirm = (
            <Card style={styles.summaryContainer}>
                <Text>You Selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button
                    title='START GAME'
                    onPress={() => props.startGame(selectedNumber)}
                />
            </Card>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.screen}>
                <View style={styles.title}>
                    <TitleText>Start New Game!</TitleText>
                </View>
                <Card style={styles.inputContainer}>
                    <Text>Select a number</Text>
                    <Input
                        style={styles.input}
                        blurOnSubmit
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType='number-pad'
                        maxLength={2}
                        onChangeText={inputNumberHandler}
                        value={enderNumber}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button
                                title='Confirm'
                                color={Color.primary}
                                onPress={confirmHandler}
                            />
                        </View>
                        <View style={styles.button}>
                            <Button
                                title='Reset'
                                color={Color.accent}
                                onPress={resetHandler}
                            />
                        </View>
                    </View>
                </Card>
                {confirm}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 15,
        marginTop: 10,
    },
    inputContainer: {
        width: 300,
        maxWidth: "80%",
        alignItems: "center",
    },
    button: {
        width: 100,
    },
    input: {
        textAlign: "center",
        width: 50,
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: "center",
    },
});

export default StartGameScreen;
