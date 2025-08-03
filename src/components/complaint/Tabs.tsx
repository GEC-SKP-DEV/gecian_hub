type TabsProps = {
  selected: 'solved' | 'unsolved';
  onChange: (value: 'solved' | 'unsolved') => void;
};

export default function Tabs({ selected, onChange }: TabsProps) {
  return (
    <div className="flex justify-center my-4">
      <button
        className={`px-4 py-1 rounded-l-full ${
          selected === 'solved'
            ? 'bg-blue-400 text-white'
            : 'border border-blue-400'
        }`}
        onClick={() => onChange('solved')}
      >
        Solved
      </button>
      <button
        className={`px-4 py-1 rounded-r-full ${
          selected === 'unsolved'
            ? 'bg-blue-400 text-white'
            : 'border border-blue-400'
        }`}
        onClick={() => onChange('unsolved')}
      >
        Unsolved
      </button>
    </div>
  );
}
