const USERS_STORAGE_KEY = 'stitchbee_users';
const ACTIVE_USER_KEY = 'stitchbee_user';

export function normalizePhoneDigits(rawPhone = '') {
  const digits = String(rawPhone).replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.slice(1);
  }
  return digits;
}

export function isValidPhone(rawPhone = '') {
  const digits = normalizePhoneDigits(rawPhone);
  return digits.length >= 10 && digits.length <= 15;
}

export function formatPhoneDisplay(rawPhone = '') {
  const digits = normalizePhoneDigits(rawPhone);
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  return digits ? `+${digits}` : '';
}

export function isValidOptionalEmail(rawEmail = '') {
  const trimmed = String(rawEmail).trim();
  if (!trimmed) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

export function generateOtpCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function readRegisteredUsers() {
  try {
    const parsed = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function findRegisteredUserByPhone(rawPhone = '') {
  const target = normalizePhoneDigits(rawPhone);
  if (!target) return null;
  return (
    readRegisteredUsers().find(
      (u) => u && u.phone && normalizePhoneDigits(u.phone) === target
    ) || null
  );
}

export function findRegisteredUserByEmail(rawEmail = '') {
  const target = String(rawEmail).trim().toLowerCase();
  if (!target) return null;
  return (
    readRegisteredUsers().find(
      (u) => u && u.email && String(u.email).toLowerCase() === target
    ) || null
  );
}

export function persistAuthenticatedUser(userData, shouldRegister = false) {
  localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(userData));

  if (!shouldRegister) return;
  try {
    const users = readRegisteredUsers();
    const normPhone = normalizePhoneDigits(userData.phone || '');
    const normEmail = String(userData.email || '').trim().toLowerCase();

    const existingIdx = users.findIndex(
      (u) =>
        (normPhone && u.phone && normalizePhoneDigits(u.phone) === normPhone) ||
        (normEmail && u.email && String(u.email).toLowerCase() === normEmail)
    );

    const record = {
      name: userData.name,
      phone: userData.phone || '',
      email: normEmail,
      role: userData.role,
      address: userData.address || '',
    };

    if (existingIdx >= 0) {
      users[existingIdx] = { ...users[existingIdx], ...record };
    } else {
      users.push(record);
    }

    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Error saving registered user:', err);
  }
}

export function resolveKnownEmailRole(email = '', fallbackRole = 'customer') {
  const lower = String(email).trim().toLowerCase();
  if (lower === 'admin@stitchbee.com') return 'admin';
  if (lower === 'tailor@stitchbee.com') return 'tailor';
  if (lower === 'student@stitchbee.com') return 'student';
  if (lower === 'delivery@stitchbee.com') return 'delivery';
  if (lower === 'customer@stitchbee.com') return 'customer';
  const existing = findRegisteredUserByEmail(lower);
  return existing?.role || fallbackRole;
}
