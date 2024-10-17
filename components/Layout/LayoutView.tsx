import React from "react";
import {StyleSheet} from "react-native";
import {ThemedView} from "@/components/ThemedView";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    }
});

const LayoutView: React.FC<{ children:React.ReactNode }> = ({ children})=> {
    return (
        <ThemedView style={styles.container}>
            {children}
        </ThemedView>
    );
};

export default LayoutView;
