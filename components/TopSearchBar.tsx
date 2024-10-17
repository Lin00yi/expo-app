import React, { useState } from 'react';
import {Box, Input, Icon, Button} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import {Platform, StyleSheet} from "react-native";

interface TopSearchBarProps {
    onSearch: (searchQuery: string) => void;
    onPublish: () => void;
}

const TopSearchBar:React.FC<TopSearchBarProps> = ({ onSearch,onPublish }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        if (onSearch) {
            onSearch(searchQuery);
        }
    };

    const handlePublish = () => {
        if (onPublish) {
            onPublish();
        }
    };

    return (
        <Box my={2} flexDirection="row" alignItems="center" style={styles.topBarBox}>
            <Input
                flex={1}
                placeholder="宝马3系"
                variant="filled"
                bg="gray.200"
                borderRadius="5"
                py="2"
                px="2"
                InputLeftElement={
                    <Icon
                        ml="2"
                        size="5"
                        color="gray.400"
                        as={<MaterialIcons name="search" />}
                    />
                }
                InputRightElement={
                    <Button
                        size="sm"
                        rounded="none"
                        w="1/6"
                        h="full"
                        onPress={handleSearch}
                    >
                        搜索
                    </Button>
                }
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
                onSubmitEditing={handleSearch} // 点击搜索后执行搜索
                returnKeyType="search"
            />
            <Button
                ml={2}
                size='sm'
                onPress={handlePublish}
                leftIcon={
                    <Icon
                        as={MaterialIcons}
                        name="add"
                        size="5"
                        color="white"
                    />
                }
            />
        </Box>
    );
};


const styles = {
    topBarBox: Platform.select({
        ios: {
            marginLeft: 8,
            marginRight: 8,
        },
        android: {
            marginLeft: 8,
            marginRight: 8,
        },
        web: {
            marginLeft: 16,
            marginRight: 16,
        },
    }),
};




export default TopSearchBar;
