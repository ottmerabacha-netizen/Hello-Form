export const validateName = (value) => {
  if (!value.trim()) return 'Name is required.';
  if (value.trim().length < 2) return 'Name must be at least 2 characters.';
  return null;
};

export const validateEmail = (value) => {
  if (!value.trim()) return 'Email is required.';
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(value)) return 'Please enter a valid email address.';
  return null;
};

export const validatePhone = (value) => {
  if (!value.trim()) return 'Phone number is required.';
  const phoneRe = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  if (!phoneRe.test(value.replace(/\s/g, ''))) return 'Please enter a valid phone number.';
  return null;
};

export const validateAll = (fields) => ({
  name: validateName(fields.name),
  email: validateEmail(fields.email),
  phone: validatePhone(fields.phone),
});
