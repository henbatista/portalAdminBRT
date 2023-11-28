
import { defineStore } from 'pinia';

interface AddressData {
  city_name: string;
  street: string;
  street_add: string;
  district: string;
  zipcode: string;
  state_name: string;
  number: string;
  street_number: string;
}

export const useCEPStore = defineStore('cep', {
  state: () => ({
    form: {
      address: {
        city_name: '',
        street: '',
        street_add: '',
        district: '',
        zipcode: '',
        state_name: '',
        number: '',
        street_number: '',
      },
    },
  }),

  actions: {
    updateFormAddress(data: Partial<AddressData>): void {
      this.form.address = { ...this.form.address, ...data };
    },
  },
});
