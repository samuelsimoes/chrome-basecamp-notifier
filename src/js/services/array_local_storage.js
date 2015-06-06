define(["underscore"], function() {
  return {
    getAll: function (storageKey) {
      var storedCache = localStorage.getItem(storageKey);
      return storedCache ? JSON.parse(storedCache) : [];
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

    remove: function(storageKey, item) {
      var currentData = this.getAll(storageKey);

      var updatedData = _.filter(currentData, function(i) {
        return i !== item;
      });

      this.update(storageKey, updatedData);
    }
  };
});
