declare class RecursiveIterator {
    private BYPASS_MODE;
    private IGNORE_CIRCULAR;
    private MAX_DEEP;
    private CACHE;
    private QUEUE;
    private STATE;
    /**
     * @param {Object|Array} root
     * @param {Number} [bypassMode=0]
     * @param {Boolean} [ignoreCircular=false]
     * @param {Number} [maxDeep=100]
     */
    constructor(root: any, BYPASS_MODE?: number, IGNORE_CIRCULAR?: boolean, MAX_DEEP?: number);
    /**
     * @returns {Object}
     */
    next(): {
        value: any;
        done: boolean;
    };
    /**
     *
     */
    destroy(): void;
    /**
     * @param {*} any
     * @returns {Boolean}
     */
    isNode(any: any): any;
    /**
     * @param {*} any
     * @returns {Boolean}
     */
    isLeaf(any: any): boolean;
    /**
     * @param {*} any
     * @returns {Boolean}
     */
    isCircular(any: any): boolean;
    /**
     * Returns states of child nodes
     * @param {Object} node
     * @param {Array} path
     * @param {Number} deep
     * @returns {Array<Object>}
     */
    getStatesOfChildNodes(node: any, path: any, deep: any): any;
    /**
     * Returns state of node. Calls for each node
     * @param {Object} [parent]
     * @param {*} [node]
     * @param {String} [key]
     * @param {Array} [path]
     * @param {Number} [deep]
     * @returns {Object}
     */
    getState(parent: any, node: any, key: any, path?: any[], deep?: number): {
        parent: any;
        node: any;
        key: any;
        path: any[];
        deep: number;
    };
    /**
     * Callback
     * @param {Object} state
     * @returns {Boolean}
     */
    onStepInto(state: any): boolean;
    /**
     * @returns {RecursiveIterator}
     */
    [Symbol.iterator](): this;
}
export = RecursiveIterator;
