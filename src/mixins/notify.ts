import { TypeNotification } from "@/interface/INotification";
import { store } from "@/store";
import { NOTIFY } from "@/store/type-mutations";

export const notifyMixin = {
  methods: {
    notify(type: TypeNotification, title: string, text: string): void {
      store.commit(NOTIFY, {
        title,
        text,
        type,
      });
    },
  },
};
