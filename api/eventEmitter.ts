const eventNames = ['API:UN_AUTH', 'API:INVALID', 'API:FORBIDDEN', 'API:NOT_FOUND', 'API:SERVER_ERROR','API:NETWORK_ERROR','API:SYSTEM_UNKNOWN_ERROR','API:SYSTEM_UN_AUTH'] as const;
export type EventNames = typeof eventNames[number];

/**
 * @author huaqiang
 * @description 事件发射器(订阅发布模式)
 */
class EventEmitter {
    private listeners: Record<EventNames, Set<Function>> = {
        "API:UN_AUTH": new Set(),
        'API:INVALID': new Set(),
        "API:FORBIDDEN": new Set(),
        "API:NOT_FOUND": new Set(),
        "API:SERVER_ERROR": new Set(),
        "API:NETWORK_ERROR":new Set(),
        "API:SYSTEM_UNKNOWN_ERROR":new Set(), // 20001 20003
        "API:SYSTEM_UN_AUTH":new Set(), // 20002
    };

    /**
     * @param eventName 事件名称
     * @param listener  事件监听器
     * @description 订阅
     */
    public on(eventName: EventNames, listener: Function) {
        this.listeners[eventName].add(listener);
    }

    /**
     * @param eventName 事件名称
     * @param args  事件参数
     * @description 发布
     */
    public emit(eventName: EventNames, ...args: any[]) {
        this.listeners[eventName].forEach(listener => listener(...args));
    }
}

export default new EventEmitter();