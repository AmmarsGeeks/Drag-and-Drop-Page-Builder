"use client"

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import type { FormElementInstance, FormStatus } from '@/types/form-builder';

type Form = {
  id: number;
  name: string;
  description: string;
  content: FormElementInstance[];
  status: FormStatus;
  shareId: string;
  visits: number;
  submissions: number;
  updatedAt: string | Date;
};

type FormSubmission = {
  id: number;
  formId: number;
  content: Record<string, any>;
};

type FormState = {
  forms: Form[];
  submissions: Record<number, FormSubmission[]>;
  pendingForms: Record<number, Form>; // Track forms being created
};

type Action =
  | { type: 'INIT_STATE'; payload: FormState }
  | { type: 'CREATE_FORM'; payload: Omit<Form, 'id' | 'status' | 'shareId' | 'visits' | 'submissions' | 'updatedAt'> }
  | { type: 'ADD_PENDING_FORM'; payload: Form } // Add form to pending state
  | { type: 'CONFIRM_FORM_CREATION'; payload: { id: number } } // Move pending form to forms
  | { type: 'UPDATE_FORM_CONTENT'; payload: { id: number; content: FormElementInstance[] } }
  | { type: 'UPDATE_FORM_DETAILS'; payload: { id: number; name: string; description: string } }
  | { type: 'UPDATE_FORM_STATUS'; payload: { id: number; status: FormStatus } }
  | { type: 'DELETE_FORM'; payload: { id: number } }
  | { type: 'INCREMENT_VISITS'; payload: { formId: number } }
  | { type: 'ADD_SUBMISSION'; payload: { formId: number; content: Record<string, any> } }
  | { type: 'DELETE_SUBMISSION'; payload: { formId: number; submissionId: number } };


const FormContext = createContext<{
    state: FormState;
    dispatch: React.Dispatch<Action>;
    exportFullState: () => string;
  } | undefined>(undefined);

  function formReducer(state: FormState, action: Action): FormState {
    switch (action.type) {
      case 'INIT_STATE': {
        return action.payload;
      }
  
      case 'ADD_PENDING_FORM': {
        return {
          ...state,
          pendingForms: {
            ...state.pendingForms,
            [action.payload.id]: action.payload
          }
        };
      }
  
      case 'CONFIRM_FORM_CREATION': {
        const pendingForm = state.pendingForms[action.payload.id];
        if (!pendingForm) return state;
        
        return {
          forms: [...state.forms, pendingForm],
          submissions: state.submissions,
          pendingForms: Object.fromEntries(
            Object.entries(state.pendingForms)
              .filter(([id]) => parseInt(id) !== action.payload.id)
          )
        };
      }
  
      case 'CREATE_FORM': {
        const newForm: Form = {
          ...action.payload,
          id: Date.now(),
          status: 'DRAFT',
          shareId: Math.random().toString(36).substring(2, 10),
          visits: 0,
          submissions: 0,
          updatedAt: new Date().toISOString()
        };
        return {
          ...state,
          forms: [...state.forms, newForm],
        };
      }
      
      case 'UPDATE_FORM_CONTENT': {
        return {
          ...state,
          forms: state.forms.map(form => 
            form.id === action.payload.id 
              ? { 
                  ...form, 
                  content: action.payload.content,
                  updatedAt: new Date().toISOString()
                } 
              : form
          ),
        };
      }
      
      case 'UPDATE_FORM_DETAILS': {
        return {
          ...state,
          forms: state.forms.map(form => 
            form.id === action.payload.id 
              ? { 
                  ...form, 
                  name: action.payload.name, 
                  description: action.payload.description,
                  updatedAt: new Date().toISOString()
                } 
              : form
          ),
        };
      }
      
      case 'UPDATE_FORM_STATUS': {
        return {
          ...state,
          forms: state.forms.map(form => 
            form.id === action.payload.id 
              ? { 
                  ...form, 
                  status: action.payload.status,
                  updatedAt: new Date().toISOString()
                } 
              : form
          ),
        };
      }
      
      case 'DELETE_FORM': {
        const newSubmissions = { ...state.submissions };
        delete newSubmissions[action.payload.id];
        
        return {
          ...state,
          forms: state.forms.filter(form => form.id !== action.payload.id),
          submissions: newSubmissions,
        };
      }
      
      case 'INCREMENT_VISITS': {
        return {
          ...state,
          forms: state.forms.map(form => 
            form.id === action.payload.formId 
              ? { ...form, visits: form.visits + 1 } 
              : form
          ),
        };
      }
      
      case 'ADD_SUBMISSION': {
        const newSubmission: FormSubmission = {
          id: Date.now(),
          formId: action.payload.formId,
          content: action.payload.content,
        };
        
        return {
          ...state,
          forms: state.forms.map(form => 
            form.id === action.payload.formId 
              ? { ...form, submissions: form.submissions + 1 } 
              : form
          ),
          submissions: {
            ...state.submissions,
            [action.payload.formId]: [
              ...(state.submissions[action.payload.formId] || []),
              newSubmission
            ],
          },
        };
      }
      
      case 'DELETE_SUBMISSION': {
        const formSubmissions = state.submissions[action.payload.formId]?.filter(
          s => s.id !== action.payload.submissionId
        ) || [];
        
        return {
          ...state,
          forms: state.forms.map(form => 
            form.id === action.payload.formId 
              ? { ...form, submissions: form.submissions - 1 } 
              : form
          ),
          submissions: {
            ...state.submissions,
            [action.payload.formId]: formSubmissions,
          },
        };
      }
      
      default:
        return state;
    }
  }