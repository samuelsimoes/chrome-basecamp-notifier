define(["underscore"], function() {
  return {
    getAll: function (storageKey) {
      return (JSON.parse(localStorage.getItem(storageKey)) || []);
    },

    update: function(storageKey, data) {
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

    lastItem: function(storageKey, item) {
      return _.last(this.getAll(storageKey));
    }
  };
});
