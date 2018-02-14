"use strict";

import { isObject, getKeys } from "./lang";

const EMPTY_STATE = {};

class RecursiveIterator {
  private CACHE = [];
  private QUEUE = [];
  private STATE;

  /**
   * @param {Object|Array} root
   * @param {Number} [bypassMode=0]
   * @param {Boolean} [ignoreCircular=false]
   * @param {Number} [maxDeep=100]
   */
  constructor(
    root,
    private BYPASS_MODE = 0,
    private IGNORE_CIRCULAR = false,
    private MAX_DEEP = 100
  ) {
    this.STATE = this.getState(undefined, root, null);
  }
  /**
   * @returns {Object}
   */
  next() {
    const { node, path, deep } = this.STATE || EMPTY_STATE;

    if (this.MAX_DEEP > deep) {
      if (this.isNode(node)) {
        if (this.isCircular(node)) {
          if (this.IGNORE_CIRCULAR) {
            // skip
          } else {
            throw new Error("Circular reference");
          }
        } else {
          if (this.onStepInto(this.STATE)) {
            const descriptors = this.getStatesOfChildNodes(node, path, deep);
            const method = this.BYPASS_MODE ? "push" : "unshift";
            this.QUEUE[method](...descriptors);
            this.CACHE.push(node);
          }
        }
      }
    }

    const value = this.QUEUE.shift();
    const done = !value;

    this.STATE = value;

    if (done) {
      this.destroy();
    }

    return { value, done };
  }
  /**
   *
   */
  destroy() {
    this.QUEUE.length = 0;
    this.CACHE.length = 0;
    this.STATE = null;
  }
  /**
   * @param {*} any
   * @returns {Boolean}
   */
  isNode(any) {
    return isObject(any);
  }
  /**
   * @param {*} any
   * @returns {Boolean}
   */
  isLeaf(any) {
    return !this.isNode(any);
  }
  /**
   * @param {*} any
   * @returns {Boolean}
   */
  isCircular(any) {
    return this.CACHE.indexOf(any) !== -1;
  }
  /**
   * Returns states of child nodes
   * @param {Object} node
   * @param {Array} path
   * @param {Number} deep
   * @returns {Array<Object>}
   */
  getStatesOfChildNodes(node, path, deep) {
    return getKeys(node).map(key =>
      this.getState(node, node[key], key, path.concat(key), deep + 1)
    );
  }
  /**
   * Returns state of node. Calls for each node
   * @param {Object} [parent]
   * @param {*} [node]
   * @param {String} [key]
   * @param {Array} [path]
   * @param {Number} [deep]
   * @returns {Object}
   */
  getState(parent, node, key, path = [], deep = 0) {
    return { parent, node, key, path, deep };
  }
  /**
   * Callback
   * @param {Object} state
   * @returns {Boolean}
   */
  onStepInto(state) {
    return true;
  }
  /**
   * @returns {RecursiveIterator}
   */
  [Symbol.iterator]() {
    return this;
  }
}
export = RecursiveIterator;
