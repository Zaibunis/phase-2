'use client';

import { useContext } from 'react';
import { AuthContext } from './providers/auth-provider';

// Note: This hook is now redundant as we're exporting useAuth from auth-provider.tsx
// Keeping this file for consistency with the planned structure
// The actual useAuth hook is exported from auth-provider.tsx

export { useAuth } from './providers/auth-provider';