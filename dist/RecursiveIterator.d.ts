declare const _default: {
    new (root: any, private BYPASS_MODE?: number, private IGNORE_CIRCULAR?: boolean, private MAX_DEEP?: number): {
        CACHE: any[];
        QUEUE: any[];
        STATE: any;
        BYPASS_MODE: number;
        IGNORE_CIRCULAR: boolean;
        MAX_DEEP: number;
        next(): {
            value: any;
            done: boolean;
        };
        destroy(): void;
        isNode(any: any): boolean;
        isLeaf(any: any): boolean;
        isCircular(any: any): boolean;
        getStatesOfChildNodes(node: any, path: any, deep: any): {
            parent: any;
            node: any;
            key: any;
            path: any[];
            deep: number;
        }[];
        getState(parent: any, node: any, key: any, path?: any[], deep?: number): {
            parent: any;
            node: any;
            key: any;
            path: any[];
            deep: number;
        };
        onStepInto(state: any): boolean;
        [Symbol.iterator](): any;
    };
};
export = _default;
