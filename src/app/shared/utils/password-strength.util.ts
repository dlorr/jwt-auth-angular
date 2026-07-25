export interface PasswordStrength {
  score: number;
  label: string;
  requirements: {
    minLength: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    special: boolean;
  };
}

export function getPasswordStrength(password: string): PasswordStrength {
  console.log(password);
  const requirements = {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const score = Object.values(requirements).filter(Boolean).length;

  let label = 'Very Weak';
  console.log(score);
  if (score >= 5) {
    label = 'Strong';
  } else if (score >= 4) {
    label = 'Good';
  } else if (score >= 3) {
    label = 'Fair';
  } else if (score >= 2) {
    label = 'Weak';
  }

  return {
    score,
    label,
    requirements,
  };
}
