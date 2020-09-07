import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Text,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView,
} from "react-native";
import Card from "../components/Card";
import Color from "../constants/color";
import Input from "../components/Inout";
import NumberContainer from "../components/NumberContainer";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

const StartGameScreen = (props) => {
    const [enderNumber, setEnterNumber] = useState("");
    const [isConfirm, setIsConfirm] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(
        Dimensions.get("window").width / 4
    );

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get("window").width / 4);
        };
        Dimensions.addEventListener("change", updateLayout);
        return () => {
            Dimensions.removeEventListener("change", updateLayout);
        };
    });

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
                <MainButton onPress={() => props.startGame(selectedNumber)}>
                    START GAME
                </MainButton>
            </Card>
        );
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView
                behavior='position'
                keyboardVerticalOffset={30}
            >
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
                                <View style={{ width: buttonWidth }}>
                                    <Button
                                        title='Confirm'
                                        color={Color.primary}
                                        onPress={confirmHandler}
                                    />
                                </View>
                                <View style={{ width: buttonWidth }}>
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
            </KeyboardAvoidingView>
        </ScrollView>
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
        width: "80%",
        minWidth: 300,
        maxWidth: "95%",
        //maxWidth: "80%",
        alignItems: "center",
    },
    button: {
        //width: 100,
        width: Dimensions.get("window").width / 4,
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
