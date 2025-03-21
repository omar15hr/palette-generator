function ColorPicker() {
  return (
    <div className="flex flex-col items-center gap-2 md:flex-row">
      <label htmlFor="current-colors" className="relative">
        <input
          aria-label="select a color"
          className="absolute left-2 top-[6px]"
          type="color"
        ></input>
        <input
          aria-label="type a color or observe the color selected"
          className="py-[6px] pl-16 font-mono border-[1px] border-slate-700 rounded-[4px]"
          placeholder="#FDA12D"
          type="text"
        />
      </label>
    </div>
  );
}

export default ColorPicker;
