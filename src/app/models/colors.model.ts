export type Colors = 'sky' | 'yellow' | 'green' | 'red' | 'violet' | 'gray' | 'success' | 'primary' | 'danger' | 'light'

export type objColors = Record<string, Record<string, boolean>>

export const COLORS: objColors = {
  success: {
    'bg-success-700': true,
    'hover:bg-success-800': true,
    'focus:ring-success-300': true,
    'text-white': true
  },
  primary: {
    'bg-primary-700': true,
    'hover:bg-primary-800': true,
    'focus:ring-primary-300': true,
    'text-white': true
  },
  danger: {
    'bg-danger-700': true,
    'hover:bg-danger-800': true,
    'focus:ring-danger-300': true,
    'text-white': true
  },
  light: {
    'bg-gray-200': true,
    'hover:bg-gray-500': true,
    'focus:ring-gray-50': true,
    'text-gray-700': true
  },
  sky: {
    'bg-sky-700': true,
    'hover:bg-sky-800': true,
    'focus:ring-sky-300': true,
    'text-white': true
  },
  yellow: {
    'bg-yellow-700': true,
    'hover:bg-yellow-800': true,
    'text-white': true
  },
  green: {
    'bg-green-700': true,
    'hover:bg-green-800': true,
    'text-white': true
  },
  red: {
    'bg-red-700': true,
    'hover:bg-red-800': true,
    'text-white': true
  },
  violet: {
    'bg-violet-700': true,
    'hover:bg-violet-800': true,
    'text-white': true
  },
  gray: {
    'bg-gray-700': true,
    'hover:bg-gray-800': true,
    'text-white': true
  }
}

export const BACKGROUNDS: objColors = {
  success: {
    'bg-success-600': true
  },
  primary: {
    'bg-primary-600': true
  },
  danger: {
    'bg-danger-600': true
  },
  light: {
    'bg-gray-200': true
  },
  sky: {
    'bg-sky-600': true
  },
  yellow: {
    'bg-yellow-600': true
  },
  green: {
    'bg-green-600': true
  },
  red: {
    'bg-red-600': true
  },
  violet: {
    'bg-violet-600': true
  },
  gray: {
    'bg-gray-600': true
  }
}
