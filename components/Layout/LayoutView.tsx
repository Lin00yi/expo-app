import React from "react";
import {StyleSheet, View} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    }
});

const LayoutView: React.FC<{ children:React.ReactNode }> = ({ children})=> {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
};

export default LayoutView;
