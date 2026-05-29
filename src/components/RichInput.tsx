import React, { useRef, useState, useEffect } from 'react';
import { Bold, Italic, Underline, Strikethrough } from 'lucide-react';

interface SelectionState {
  start: number;
  end: number;
  text: string;
}

const applyFormatting = (
  inputEl: HTMLInputElement | HTMLTextAreaElement,
  formatType: 'bold' | 'italic' | 'underline' | 'strikethrough'
) => {
  const start = inputEl.selectionStart;
  const end = inputEl.selectionEnd;
  if (start === null || end === null || start === end) return;

  const value = inputEl.value;
  const selectedText = value.substring(start, end);
  
  let prefix = '';
  let suffix = '';

  switch (formatType) {
    case 'bold':
      prefix = '**';
      suffix = '**';
      break;
    case 'italic':
      prefix = '*';
      suffix = '*';
      break;
    case 'underline':
      prefix = '__';
      suffix = '__';
      break;
    case 'strikethrough':
      prefix = '~~';
      suffix = '~~';
      break;
  }

  // Check if selection is already formatted with the exact same prefix/suffix, if so, toggle it off!
  let newText = '';
  let newStart = start;
  let newEnd = end;

  if (
    value.substring(start - prefix.length, start) === prefix &&
    value.substring(end, end + suffix.length) === suffix
  ) {
    // Toggle off by removing surrounding markers
    newText = 
      value.substring(0, start - prefix.length) + 
      selectedText + 
      value.substring(end + suffix.length);
    newStart = start - prefix.length;
    newEnd = end - prefix.length;
  } else if (
    selectedText.startsWith(prefix) && 
    selectedText.endsWith(suffix)
  ) {
    // Toggle off if selected text includes markers
    newText = 
      value.substring(0, start) + 
      selectedText.substring(prefix.length, selectedText.length - suffix.length) + 
      value.substring(end);
    newStart = start;
    newEnd = end - prefix.length - suffix.length;
  } else {
    // Apply formatting
    newText = 
      value.substring(0, start) + 
      prefix + 
      selectedText + 
      suffix + 
      value.substring(end);
    newStart = start + prefix.length;
    newEnd = end + prefix.length;
  }

  // Set the input value programmatically so React state gets updated correctly
  const nativeValueSetter = Object.getOwnPropertyDescriptor(
    inputEl instanceof HTMLTextAreaElement 
      ? window.HTMLTextAreaElement.prototype 
      : window.HTMLInputElement.prototype, 
    'value'
  )?.set;

  nativeValueSetter?.call(inputEl, newText);
  const event = new Event('input', { bubbles: true });
  inputEl.dispatchEvent(event);

  // Restore selection and focus after state update
  setTimeout(() => {
    inputEl.focus();
    inputEl.setSelectionRange(newStart, newEnd);
  }, 10);
};

export const RichInputToolbar: React.FC<{
  activeElement: HTMLInputElement | HTMLTextAreaElement | null;
  onClose: () => void;
}> = ({ activeElement, onClose }) => {
  if (!activeElement) return null;

  const handleFormat = (type: 'bold' | 'italic' | 'underline' | 'strikethrough') => {
    applyFormatting(activeElement, type);
  };

  return (
    <div 
      className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-900 border border-slate-800 text-slate-100 rounded-xl shadow-2xl flex items-center gap-1 p-1 px-1.5 z-550 backdrop-blur-md animate-in fade-in zoom-in-95 duration-150 select-none"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        title="Negrita (Bold)"
        onClick={() => handleFormat('bold')}
        className="w-7 h-7 flex items-center justify-center font-extrabold hover:bg-slate-800/80 active:bg-slate-700 rounded-lg text-xs tracking-wider transition-all cursor-pointer"
      >
        <Bold className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        title="Cursiva (Italic)"
        onClick={() => handleFormat('italic')}
        className="w-7 h-7 flex items-center justify-center italic hover:bg-slate-800/80 active:bg-slate-700 rounded-lg text-xs tracking-wider transition-all cursor-pointer"
      >
        <Italic className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        title="Subrayar (Underline)"
        onClick={() => handleFormat('underline')}
        className="w-7 h-7 flex items-center justify-center underline hover:bg-slate-800/80 active:bg-slate-700 rounded-lg text-xs tracking-wider transition-all cursor-pointer"
      >
        <Underline className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        title="Tachado (Strikethrough)"
        onClick={() => handleFormat('strikethrough')}
        className="w-7 h-7 flex items-center justify-center line-through hover:bg-slate-800/80 active:bg-slate-700 rounded-lg text-xs tracking-wider transition-all cursor-pointer"
      >
        <Strikethrough className="w-3.5 h-3.5" />
      </button>
      <div className="w-[1px] h-4 bg-slate-800 mx-1" />
      <span className="text-[9px] font-mono font-semibold px-1 text-slate-400 select-none">
        Word Style
      </span>
    </div>
  );
};

export const RichInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = '', onMouseUp, onKeyUp, onBlur, ...props }, ref) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const combinedRef = (ref || internalRef) as React.RefObject<HTMLInputElement>;
    const [showToolbar, setShowToolbar] = useState(false);

    const checkSelection = () => {
      const el = combinedRef.current;
      if (!el) return;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      if (start !== null && end !== null && start !== end) {
        setShowToolbar(true);
      } else {
        setShowToolbar(false);
      }
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
      checkSelection();
      if (onMouseUp) onMouseUp(e);
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
      checkSelection();
      if (onKeyUp) onKeyUp(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      // Small timeout to allow format button clicks to register before hiding the toolbar
      setTimeout(() => {
        if (document.activeElement !== combinedRef.current) {
          setShowToolbar(false);
        }
      }, 150);
      if (onBlur) onBlur(e);
    };

    return (
      <div className="relative w-full">
        <input
          ref={combinedRef}
          className={`${className} w-full`}
          onMouseUp={handleMouseUp}
          onKeyUp={handleKeyUp}
          onBlur={handleBlur}
          {...props}
        />
        {showToolbar && combinedRef.current && (
          <RichInputToolbar 
            activeElement={combinedRef.current} 
            onClose={() => setShowToolbar(false)} 
          />
        )}
      </div>
    );
  }
);

RichInput.displayName = 'RichInput';

export const RichTextarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className = '', onMouseUp, onKeyUp, onBlur, ...props }, ref) => {
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const combinedRef = (ref || internalRef) as React.RefObject<HTMLTextAreaElement>;
    const [showToolbar, setShowToolbar] = useState(false);

    const checkSelection = () => {
      const el = combinedRef.current;
      if (!el) return;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      if (start !== null && end !== null && start !== end) {
        setShowToolbar(true);
      } else {
        setShowToolbar(false);
      }
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLTextAreaElement>) => {
      checkSelection();
      if (onMouseUp) onMouseUp(e);
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      checkSelection();
      if (onKeyUp) onKeyUp(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      // Small timeout to allow format button clicks to register before hiding the toolbar
      setTimeout(() => {
        if (document.activeElement !== combinedRef.current) {
          setShowToolbar(false);
        }
      }, 150);
      if (onBlur) onBlur(e);
    };

    return (
      <div className="relative w-full">
        <textarea
          ref={combinedRef}
          className={`${className} w-full`}
          onMouseUp={handleMouseUp}
          onKeyUp={handleKeyUp}
          onBlur={handleBlur}
          {...props}
        />
        {showToolbar && combinedRef.current && (
          <RichInputToolbar 
            activeElement={combinedRef.current} 
            onClose={() => setShowToolbar(false)} 
          />
        )}
      </div>
    );
  }
);

RichTextarea.displayName = 'RichTextarea';

// Plain text to formatting parser component
export const FormattedText: React.FC<{ text: string | undefined }> = ({ text }) => {
  if (!text) return null;

  // Split content using markdown syntax capturing groups
  const regex = /(\*\*.*?\*\*|\*.*?\*|__.*?__|~~.*?~~)/g;
  const splitText = text.split(regex);

  return (
    <>
      {splitText.map((part, idx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={idx} className="font-bold text-slate-900 inline">
              {part.slice(2, -2)}
            </strong>
          );
        } else if (part.startsWith('*') && part.endsWith('*')) {
          return (
            <em key={idx} className="italic inline">
              {part.slice(1, -1)}
            </em>
          );
        } else if (part.startsWith('__') && part.endsWith('__')) {
          return (
            <span key={idx} className="underline decoration-slate-400 inline">
              {part.slice(2, -2)}
            </span>
          );
        } else if (part.startsWith('~~') && part.endsWith('~~')) {
          return (
            <span key={idx} className="line-through text-slate-400 dark:text-slate-500 inline">
              {part.slice(2, -2)}
            </span>
          );
        }
        return <React.Fragment key={idx}>{part}</React.Fragment>;
      })}
    </>
  );
};
