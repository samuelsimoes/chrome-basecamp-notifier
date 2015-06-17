export default {
  get: function(storageKey) {
    return (JSON.parse(localStorage.getItem(storageKey)) || {});
  },

  getItem: function(storageKey, key) {
    var cache = this.get(storageKey);
    return cache[key];
  },

  setItem: function(storageKey, key, value) {
    var cache = this.get(storageKey);
    cache[key] = value;
    localStorage.setItem(storageKey, JSON.stringify(cache));
  }
};
