define(["underscore"], function() {
  return {
    getAll: function (storageKey) {
      var storedCache = localStorage.getItem(storageKey);
      return storedCache ? JSON.parse(storedCache) : [];
    },

    update: function(storageKey, data) {
      localStorage.setItem(storageKey, JSON.stringify(data));
    },

    updateItem: function(storageKey, itemID, newData) {
      var currentData = this.getAll(storageKey),
          toReplaceItem = _.findWhere(currentData, { id: itemID }),
          toReplaceItemIndex = currentData.indexOf(toReplaceItem);

      currentData[toReplaceItemIndex] = _.extend(currentData, newData);

      this.update(storageKey, currentData);
    },

    addItem: function(storageKey, data) {
      var currentData = this.getAll(storageKey);

      currentData.push(data);

      this.update(storageKey, currentData);
    },

    getItem: function(storageKey, id) {
      var currentData = this.getAll(storageKey);
      return _.findWhere(currentData, { id: id });
    },

    removeItem: function(storageKey, itemID) {
      var currentData = this.getAll(storageKey);

      var updatedData = _.filter(currentData, function(item) {
        return item.id !== itemID;
      });

      this.update(storageKey, updatedData);
    },

    lastItem: function(storageKey) {
      var currentData = this.getAll(storageKey);
      return currentData[currentData.length-1];
    }
  };
});
