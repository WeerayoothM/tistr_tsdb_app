import { observer } from "mobx-react-lite";

const Select = observer((props: any) => {
  return (
    <div>
      <select
        name={props.name}
        className="max-h-[60.5px] outline-none placeholder:text-[#ADB5BD] border-none bg-white rounded-[11px] px-[1rem] py-[1.25rem] w-full text-[16px] font-srb-400"
        value={props.value}
        onChange={(e) => {
          props.onChange(e, props.name);
        }}
        disabled={props.disabled}
        style={{ color: !props.value ? "#ADB5BD" : "#666666" }}
      >
        {(props.option || []).map((e: any, index: number) => (
          <option value={e.value} key={`select_${props.name}_${index}`}>
            {e.label}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
