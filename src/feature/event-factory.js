import Vue from 'vue';
import dashify from 'dashify';

export default function (events) {
  const vm = this;
  const obj = {};
  events.forEach((event) => {
    obj[event] = (...args) => {
      vm.$emit(dashify(event), ...args);
    };
  });
  return obj;
}
