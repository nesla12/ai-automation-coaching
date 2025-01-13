import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white shadow-lg hover:shadow-xl focus:ring-primary hover:shadow-glow transition-all duration-300',
    secondary: 'bg-gradient-to-r from-secondary to-primary hover:from-secondary-dark hover:to-primary-dark text-white shadow-lg hover:shadow-xl focus:ring-secondary hover:shadow-glow transition-all duration-300',
    outline: 'border-2 border-primary hover:bg-primary/10 text-primary focus:ring-primary hover:shadow-neon transition-all duration-300',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${
        loading ? 'opacity-75 cursor-not-allowed' : ''
      }`}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <>
          <div className="animate-spin -ml-1 mr-3 h-5 w-5 text-white">
            <div className="h-full w-full border-4 border-t-white border-b-white/20 border-l-white/20 border-r-white/20 rounded-full" />
          </div>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};