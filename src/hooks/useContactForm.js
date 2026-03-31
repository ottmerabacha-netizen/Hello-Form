import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { validateAll } from '../utils/validators';

const INITIAL_FIELDS = { name: '', email: '', phone: '' };
const INITIAL_TOUCHED = { name: false, email: false, phone: false };

export function useContactForm() {
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [touched, setTouched] = useState(INITIAL_TOUCHED);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'

  useEffect(() => {
    const allErrors = validateAll(fields);
    const visibleErrors = {};
    Object.keys(allErrors).forEach((key) => {
      if (touched[key]) visibleErrors[key] = allErrors[key];
    });
    setErrors(visibleErrors);
  }, [fields, touched]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allTouched = { name: true, email: true, phone: true };
    setTouched(allTouched);

    const allErrors = validateAll(fields);
    if (Object.values(allErrors).some(Boolean)) {
      setErrors(allErrors);
      return;
    }

    setStatus('sending');

    const templateParams = {
      customer_name: fields.name,
      customer_email: fields.email,
      customer_phone: fields.phone,
      to_email: fields.email,
    };

    try {
      await Promise.all([
        emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_CONFIRMATION,
          templateParams
        ),
        emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_NOTIFICATION,
          templateParams
        ),
      ]);
      setStatus('success');
      setFields(INITIAL_FIELDS);
      setTouched(INITIAL_TOUCHED);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }
  };

  const resetStatus = () => setStatus('idle');

  return { fields, errors, status, handleChange, handleBlur, handleSubmit, resetStatus };
}
