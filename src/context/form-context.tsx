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
