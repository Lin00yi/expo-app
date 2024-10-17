
import React, { useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button} from "native-base";
import {smsEmailApi} from "@/api";
import {ThemedText} from "@/components/ThemedText";
import LayoutView from "@/components/Layout/LayoutView";

export default function ApiTestScreen(){
    const [apiResponse, setApiResponse] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // 模拟API请求的逻辑
    const handleApiRequest = async () => {
        setLoading(true);
        try {
            const response = await smsEmailApi({
                email: '1765861423@qq.com',
                smsType: 'LOGIN',
            })
            setApiResponse(JSON.stringify(response, null, 2)); // 将响应结果以 JSON 格式显示出来
        } catch (error) {
            console.error('Error fetching data:', error);
            setApiResponse('请求失败，请稍后重试。');
        } finally {
            setLoading(false);
        }
    };

    return (
        <LayoutView>
            <Button onPress={handleApiRequest} mt={4} isLoading={loading}>
                测试接口
            </Button>

            {/* 显示 API 响应结果 */}
            {apiResponse && (
                <ThemedText>
                    API Response:
                    {apiResponse}
                </ThemedText>
            )}
        </LayoutView>
    );
};



