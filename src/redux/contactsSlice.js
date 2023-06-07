import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from 'nanoid';
import initialContacts from '../contacts.json';

const contactsSlice = createSlice({
  name: "contacts",
  initialState: initialContacts,
  reducers: {
    addContact: {
      reducer(state, action) {
        state.push(action.payload);
        // return [...state, action.payload];
      },
      prepare(name, number) {
        return {
          payload: {
            name,
            number,
            id: nanoid(3),
          },
        };
      },
    },
    deleteContact(state, action) {
      const index = state.findIndex(contact => contact.id === action.payload);
      state.splice(index, 1);
    },
  },
});
// Експортуємо генератори екшенів та редюсер
export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
