import { _ } from "libs";

export default {
  all: {},

  getAll: function (storageKey) {
    if (!this.all[storageKey]) {
      this.all[storageKey] = (JSON.parse(localStorage.getItem(storageKey)) || []);
    }

    return this.all[storageKey];
  },

  update: function(storageKey, data) {
    this.all[storageKey] = data;
    localStorage.setItem(storageKey, JSON.stringify(data));
  },

  include: function (storageKey, item) {
    var currentData = this.getAll(storageKey);
    return _.include(currentData, item);
  },

  add: function(storageKey, item) {
    if (this.include(storageKey, item)) { return; }

    var currentData = this.getAll(storageKey);

    currentData.push(item);

    this.update(storageKey, currentData);
  },

  removeByID: function(storageKey, itemID) {
    var currentData = this.getAll(storageKey);
    this.remove(storageKey, _.findWhere(currentData, { id: itemID }));
  },

  remove: function(storageKey, item) {
    var currentData = this.getAll(storageKey);
    this.update(storageKey, _.without(currentData, item));
  },

  lastItem: function(storageKey) {
    return _.last(this.getAll(storageKey));
  }
};
