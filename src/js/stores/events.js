import { Fluxo } from "libs";
import Event from "stores/event";

export default Fluxo.CollectionStore.extend({
  store: Event
});
