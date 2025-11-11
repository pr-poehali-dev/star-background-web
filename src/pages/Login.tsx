import { useState, useRef, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import StarryBackground from '@/components/StarryBackground';
import { Button } from '@/components/ui/button';

export default function Login() {
  const [code, setCode] = useState(['', '', '', '']);
  const [error, setError] = useState(false);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];
  const navigate = useNavigate();

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newCode = [...code];
    newCode[index] = value.toLowerCase();
    setCode(newCode);
    setError(false);

    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleSubmit = () => {
    const enteredCode = code.join('');
    if (enteredCode === 'sam4') {
      navigate('/generator');
    } else {
      setError(true);
      setCode(['', '', '', '']);
      inputRefs[0].current?.focus();
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      <StarryBackground />
      
      <div className="relative z-10 text-center animate-fade-in">
        <h1 className="text-6xl font-heading font-bold mb-4 text-white floating">
          AI Video Generator
        </h1>
        <p className="text-xl text-accent mb-12">Введите код доступа</p>

        <div className="flex gap-4 justify-center mb-8">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`w-20 h-20 text-center text-3xl font-bold bg-card/50 backdrop-blur-sm border-2 rounded-xl transition-all cube-input
                ${error ? 'border-destructive' : 'border-primary'} 
                focus:outline-none focus:border-accent focus:scale-110`}
            />
          ))}
        </div>

        {error && (
          <p className="text-destructive mb-6 animate-scale-in">
            Неверный код. Попробуйте снова.
          </p>
        )}

        <Button
          onClick={handleSubmit}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-white px-12 py-6 text-lg font-semibold animate-scale-in"
        >
          Войти
        </Button>
      </div>
    </div>
  );
}
