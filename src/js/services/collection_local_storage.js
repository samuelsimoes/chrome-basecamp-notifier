define(["underscore"], function() {
  if (!window.collectionStorageMemoization) {
    window.collectionStorageMemoization = {};
  }

  return {
    getAll: function (storageKey) {
      if (window.collectionStorageMemoization[storageKey]) {
        return window.collectionStorageMemoization[storageKey];
      } else {
        var storedCache = JSON.parse(localStorage.getItem(storageKey)) || [];

        window.collectionStorageMemoization[storageKey] = storedCache;

        return storedCache;
      }
    },

    update: function(storageKey, data) {
      window.collectionStorageMemoization[storageKey] = data;
      localStorage.setItem(storageKey, JSON.stringify(data));
    },

    updateItem: function(storageKey, itemID, newData) {
      var currentData = this.getAll(storageKey),
          toReplaceItem = _.findWhere(currentData, { id: itemID }),
          toReplaceItemIndex = currentData.indexOf(toReplaceItem);

      currentData[toReplaceItemIndex] = _.extend(toReplaceItem, newData);

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

      var updatedData = currentData.filter(function(item) {
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
