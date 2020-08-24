<template>
<div>
  <div
    ref="table"
    class="tabulator"
  />
  <button class="deleteLast" @click="deleteLast">Delete last</button>
  <button class="addRow" @click="addRow">Add row</button>
</div>
</template>

<script>
import mergeWith from 'lodash.mergewith';
import merge from './utilities/merge';
import eventFactory from './feature/event-factory';
import cellEvents from './feature/events/cell-events';
import rowEvents from './feature/events/row-events';

import '../node_modules/tabulator-tables/dist/css/tabulator.css';

var Tabulator = require("tabulator-tables");

export default {
  name: "TabulatorComponent",
  data () {
    return {
      tabulator: null,
    }
  },
  props: {
    options: {
      type: Tabulator.options,
      default: {},
      required: true
    },
    dataMas: {
      type: Array,
      required: true
    }
  },
  methods: {
    deleteLast() {
      this.dataMas.pop();
    },
    addRow() {
      this.dataMas.push( { name: '', age: null} );
    },
    createTable() {
      this.tabulator = new Tabulator(
        this.$refs.table,
        this.calcResolvedOptions,
      );
    }
  },
  computed: {
    eventOptions() {
      const events = eventFactory.bind(this);
      return { ...events(rowEvents), ...events(cellEvents) };
    },
    calcResolvedOptions() {
      return {
        ...mergeWith({}, this.eventOptions, this.options, merge),
        reactiveData: true,
        data: this.dataMas,
      }
    },
  },
  mounted() {
    this.createTable();
  }
};
</script>

<style scoped>
button {
  display: block;
  margin-top: 15px;
  width: 80px;
  text-align: center;
}
</style>
