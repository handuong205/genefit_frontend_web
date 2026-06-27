

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const Toggle  = ({
  checked,
  onChange,
  label,
  size = 'md',
  disabled = false,
}: ToggleProps) => {

  const sizeClasses = {
    sm: { track: 'w-8 h-4', thumb: 'w-3 h-3', translate: 'translate-x-4' },
    md: { track: 'w-11 h-6', thumb: 'w-5 h-5', translate: 'translate-x-5' },
    lg: { track: 'w-14 h-8', thumb: 'w-7 h-7', translate: 'translate-x-6' },
  };

  const currentSize = sizeClasses[size];

  return (
    <label 
      className={`inline-flex items-center ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {/* Hiển thị label nếu có */}
      {label && (
        <span className="mr-3 text-sm font-medium text-gray-700 select-none">
          {label}
        </span>
      )}
      
      {/* Nút Toggle chính */}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`
          cursor-pointer 
          relative inline-flex shrink-0 items-center rounded-full
          transition-colors duration-200 ease-in-out 
          focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
          ${currentSize.track}
          ${checked ? 'bg-primary' : 'bg-gray-300'}
        `}
      >
        <span className="sr-only">Toggle switch</span>
        
        {/* Hình tròn di chuyển bên trong (Thumb) */}
        <span
          className={`
            inline-block rounded-full bg-white shadow transform ring-0 
            transition duration-200 ease-in-out ml-0.5
            ${currentSize.thumb}
            ${checked ? currentSize.translate : 'translate-x-0'}
          `}
        />
      </button>
    </label>
  );
};

export default Toggle;